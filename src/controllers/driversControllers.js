import Drivers from "../models/driversModel.js";
import { print } from "../lib/print.js"
import processNewBodyDrivers from "./processNewBodyDrivers.js"
import processEditBodyDrivers from "./processEditBodyDrivers.js"
import { Op } from 'sequelize'

function isBooleanString(str) {
    return str.toLowerCase() === 'true' || str.toLowerCase() === 'false';
}



export default {
    async get(req, res) {

        const { page = 1, limit = 10, search = null, status = 'true' } = req.query

        if (!isBooleanString(status)) {
            print(`ACTIVE NÃO É BOLEANO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT');
            return res.status(200).send({
                ok: false,
                message_en: 'the active is not boolean',
                message_pt: 'o active não e boleano',

            })

        }

        var lastPage = 1;
        var countDriver = 0



        if (search)
            countDriver = await Drivers.count({
                where: { like_data: { [Op.iLike]: `%${search.replace(/ /g, '%')}%` }, active: status === "true" ? true : false }
            })
        else {
            countDriver = await Drivers.count({ where: { active: status === "true" ? true : false } })

        }


        lastPage = Math.ceil((countDriver / limit))

        const queryOptions = {
            offset: Number((page * limit) - limit),
            limit: limit,
            order: [['id', 'ASC']],
            where: {
                active: status === "true" ? true : false
            },
        };


        if (search) {
            queryOptions.where.like_data = { [Op.iLike]: `%${search.replace(/ /g, '%')}%` }
        }


        await Drivers.findAll(queryOptions).then(drivers => {

            print(`BUSCA TODOS OS MOTORISTA - 200 - ${req.method} ${req.originalUrl}`, 'OK')
            return res.status(200).send({
                ok: true,
                pagination: {
                    path: '/driver',
                    page: Number(page),
                    prev_page_url: page - 1 >= 1 ? page - 1 : false,
                    next_page_url: Number(page) >= lastPage ? false : Number(page) + 1,
                    total: countDriver,
                    lastPage: lastPage
                },
                message_en: 'search success',
                message_pt: 'sucesso na pesquisa',
                drivers
            });

        }).catch(err => {

            print(`ERRO NO SERVIDOR - 500 - ${req.method} ${req.originalUrl}`, 'ERROR')
            return res.status(500).send({
                ok: false,
                message_en: 'server error',
                message_pt: 'erro no servidor',
                err
            });

        })

    },
    async delete(req, res) {

        req.user = 'master';

        const { id } = req.params

        //valida se existe parametro e se é número
        if (!id) {
            print(`ID INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT')
            return res.status(403).send({
                ok: false,
                message_en: `missing parameter or ${id} not number`,
                message_pt: `falta parametros ou o ${id} não é numero`,
            });
        }

        if (req.user != 'master') {
            print(`USUÁRIO SEM PERMISSÃO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT')
            return res.status(403).send({
                ok: false,
                message_en: `your user does not have this permission`,
                message_pt: `seu usuário não tem essa permissão`,
            });
        }



        Drivers.destroy({
            where: { id }
        }).then(result => {

            if (result) {
                print(`DELETADO MOTORISTA ${id} - 200 - ${req.method} ${req.originalUrl}`, 'OK')
                return res.status(200).send({
                    ok: true,
                    message_en: `successful deletion id ${id}`,
                    message_pt: `sucesso em apagar o id de número ${id}`,
                    result

                });

            } else {
                print(`${id} INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT')
                return res.status(403).send({
                    ok: false,
                    message: `failed deletion, not found id ${id}`,
                    result

                });

            }


        }).catch(err => {
            print(`ERRO NO SERVIDOR - 500 - ${req.method} ${req.originalUrl}`, 'ERROR')
            return res.status(500).send({
                ok: false,
                message: err
            });

        })


    },
    async post(req, res) {


        const resultDriver = processNewBodyDrivers(req.body, req.method, req.originalUrl)


        if (!resultDriver.ok) {
            return res.status(403).send(resultDriver)

        }

        if (req.file?.buffer) {

            const fileData = req.file.buffer.toString('base64');

            // Cria a URL de dados (data URL) com o tipo de arquivo
            const fileType = req.file.mimetype;

            resultDriver.image = `data:${fileType};base64,${fileData}`;
        }




        await Drivers.create(resultDriver)
            .then(drivers => {
                print(`SUCESSO EM CRIAR MOTORISTA - 200 - ${req.method} ${req.originalUrl}`, 'OK')

                drivers.image = undefined

                return res.status(200).send({
                    ok: true,
                    message: 'successfully created',
                    message_en: `success in creating the driver ${resultDriver.name}`,
                    message_pt: `sucesso em criar o motorista ${resultDriver.name}`,
                    drivers
                });


            }).catch(err => {


                print(`ERRO NO SERVIDOR - 500 - ${req.method} ${req.originalUrl}`, 'ERROR')
                return res.status(500).send({
                    ok: false,
                    message_en: 'server error',
                    message_pt: 'erro no servidor',
                    err
                });
            })

    },
    async update(req, res) {

        const { id } = req.params

        const resultDriver = processEditBodyDrivers(req.body, req.method, req.originalUrl)

        if (!resultDriver.ok) {
            return res.status(403).send(resultDriver)

        }

        if (req.file?.buffer) {

            const fileData = req.file.buffer.toString('base64');

            // Cria a URL de dados (data URL) com o tipo de arquivo
            const fileType = req.file.mimetype;

            resultDriver.image = `data:${fileType};base64,${fileData}`;
        }



        //valida se existe parametro e se é número
        if (!id) {
            print(`ID INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT')
            return res.status(403).send({
                ok: false,
                message_en: `missing parameter or ${id} not number`,
                message_pt: `falta parametros or o ${id} não é numero`
            });
        }


        await Drivers.update(resultDriver, { where: { id } })
            .then(async result => {

                if (result[0]) {


                    let like_data = '' //SALVADO DADOS PARA LIKE
                    const drivers = await Drivers.findByPk(id);

                    for (let key in drivers.dataValues) {
                        if (key !== 'id' && key !== 'active' && key !== 'image' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'like_data' && key !== 'cnh_expiration' && drivers[key]) {
                            like_data += drivers[key] + ' '
                        }
                    }

                    await Drivers.update({ like_data: like_data.trim() }, { where: { id } }) //ATUALIZA CAMPOS DO LIVE

                    print(`MOTORISTA ATUALIZADO ${id} - 200 - ${req.method} ${req.originalUrl}`, 'OK')
                    return res.status(200).send({
                        ok: true,
                        message_en: `success updation id ${id}`,
                        message_pt: `sucesso na atualização do id ${id}`,


                    });

                } else {
                    print(`ID ${id} INVÁLIDO - 403 - ${req.method} ${req.originalUrl}`, 'ALERT')
                    return res.status(403).send({
                        ok: false,
                        message_en: `fail updation id ${id}`,
                        message_pt: `falha na atualização do id ${id}`,


                    });

                }


            }).catch(err => {
                print(`ERRO NO SERVIDOR - 500 - ${req.method} ${req.originalUrl}`, 'ERROR')
                return res.status(500).send({
                    ok: false,
                    message_en: 'server error',
                    message_pt: 'erro no servidor',
                    err
                });

            })

    },
}
