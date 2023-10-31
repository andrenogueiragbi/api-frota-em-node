import Drivers from "../models/driversModel.js";
import { print } from "../lib/print.js"
import processNewBodyDrivers from "./processNewBodyDrivers.js"
import processEditBodyDrivers from "./processEditBodyDrivers.js"
import { Op } from 'sequelize'




export default {
    async get(req, res) {

        const { page = 1, limit = 10, search = null } = req.query


        var lastPage = 1;
        var countDriver = 0

        if (search)
            countDriver = await Drivers.count({
                where: { like_data: { [Op.iLike]: `%${search.replace(/ /g, '%')}%` } }
            })
        else {
            countDriver = await Drivers.count()

        }


        lastPage = Math.ceil((countDriver / limit))

        const queryOptions = {
            offset: Number((page * limit) - limit),
            limit: limit,
            order: [['id', 'ASC']],
        };

        if (search) {
            queryOptions.where = {
                like_data: { [Op.iLike]: `%${search.replace(/ /g, '%')}%` }
            };
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



    /*     async delete(req, res) {
    
            const { id } = req.params
    
            //valida se existe parametro e se é número
            if (!id || isNaN(id)) {
                return res.status(403).send({
                    ok: false,
                    message: `missing parameter or ${id} not number`
                });
            }
    
    
    
            Country.destroy({
                where: { id }
            }).then(result => {
    
                if (result) {
                    return res.status(200).send({
                        ok: true,
                        message: `successful deletion id ${id}`,
                        result
    
                    });
    
                } else {
                    return res.status(403).send({
                        ok: false,
                        message: `failed deletion, not found id ${id}`,
                        result
    
                    });
    
                }
    
    
            }).catch(err => {
    
                return res.status(500).send({
                    ok: false,
                    message: err
                });
    
            })
    
    
        },
        */
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
        if (!id || isNaN(id)) {
            return res.status(403).send({
                ok: false,
                message: `missing parameter or ${id} not number`
            });
        }


        await Drivers.update(resultDriver, { where: { id } })
            .then(async result => {

                if (result[0]) {


                    let like_data = '' //SALVADO DADOS PARA LIKE
                    const drivers = await Drivers.findByPk(id);

                    for (let key in drivers.dataValues) {
                        if (key !== 'id' && key !== 'image' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'like_data' && key !== 'cnh_expiration' && drivers[key]) {
                            like_data += drivers[key] + ' '
                        }
                    }

                    await Drivers.update({ like_data: like_data.trim() }, { where: { id } }) //ATUALIZA CAMPOS DO LIVE


                    return res.status(200).send({
                        ok: true,
                        message_en: `success updation id ${id}`,
                        message_pt: `sucesso na atualização do id ${id}`,


                    });

                } else {
                    return res.status(403).send({
                        ok: false,
                        message_en: `fail updation id ${id}`,
                        message_pt: `falha na atualização do id ${id}`,


                    });

                }


            }).catch(err => {

                return res.status(500).send({
                    ok: false,
                    message_en: 'server error',
                    message_pt: 'erro no servidor',
                    err
                });

            })

    },
}
