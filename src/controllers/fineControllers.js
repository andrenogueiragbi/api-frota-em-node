import Fines from '../models/fineModel.js'
import Drivers from '../models/driversModel.js'
import Fleets from '../models/fleetModel.js'
import { print } from "../lib/print.js"
import { Op } from 'sequelize'
import processNewBodyFines from "./processNewBodyFines.js"





export default {
    async get(req, res) {
        const { page = 1, limit = 10, search = null } = req.query


        var lastPage = 1;
        var countFine = 0

        if (search)
            countFine = await Fines.count({
                where: { like_data: { [Op.iLike]: `%${search.replace(/ /g, '%')}%` } }
            })
        else {
            countFine = await Fines.count()

        }


        lastPage = Math.ceil((countFine / limit))

        const queryOptions = {
            offset: Number((page * limit) - limit),
            limit: limit,
            order: [['id', 'ASC']],
            include: [
                {model: Drivers},
                {model: Fleets},
            ]
            

        };

        if (search) {
            queryOptions.where = { like_data: { [Op.iLike]: `%${search.replace(/ /g, '%')}%` } }
        }

        await Fines.findAll(queryOptions).then(fines => {

            print(`BUSCA TODA AS MULTAS - 200 - ${req.method} ${req.originalUrl}`, 'OK')
            return res.status(200).send({
                ok: true,
                pagination: {
                    path: '/fine',
                    page: Number(page),
                    prev_page_url: page - 1 >= 1 ? page - 1 : false,
                    next_page_url: Number(page) >= lastPage ? false : Number(page) + 1,
                    total: countFine,
                    lastPage: lastPage


                },
                message_en: 'search success',
                message_pt: 'sucesso na pesquisa',
                fines
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



        Fines.destroy({
            where: { id }
        }).then(result => {

            if (result) {
                print(`DELETADO MULTA ${id} - 200 - ${req.method} ${req.originalUrl}`, 'OK')

                return res.status(200).send({
                    ok: true,
                    message_en: `successful deletion id ${id}`,
                    message_pt: `sucesso em apagar o id de número ${id}`,
                    result

                });

            } else {
                print(`${id} INVÁLIDO - 200 - ${req.method} ${req.originalUrl}`, 'OK')
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
        const resultFine = processNewBodyFines(req.body, req.method, req.originalUrl)


        if (!resultFine.ok) {
            return res.status(403).send(resultFine)

        }

        if (req.file?.buffer) {

            const fileData = req.file.buffer.toString('base64');

            // Cria a URL de dados (data URL) com o tipo de arquivo
            const fileType = req.file.mimetype;

            resultFine.image = `data:${fileType};base64,${fileData}`;
        }




        await Fines.create(resultFine)
            .then(fines => {
                print(`SUCESSO EM CRIAR MULTA - 200 - ${req.method} ${req.originalUrl}`, 'OK')

                fines.image = undefined

                return res.status(200).send({
                    ok: true,
                    message: 'successfully created',
                    message_en: `success in creating the fine ${resultFine.description_type}`,
                    message_pt: `sucesso em criar a multa ${resultFine.description_type}`,
                    fines
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


    },/*
        async update(req, res) {
            const { id } = req.params
    
            const resultFleet = processEditBodyFeet(req.body, req.method, req.originalUrl)
    
            if (!resultFleet.ok) {
                return res.status(403).send(resultFleet)
    
            }
    
            if (req.file?.buffer) {
    
                const fileData = req.file.buffer.toString('base64');
    
                // Cria a URL de dados (data URL) com o tipo de arquivo
                const fileType = req.file.mimetype;
    
                resultFleet.image = `data:${fileType};base64,${fileData}`;
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
    
            await Fleets.update(resultFleet, { where: { id } })
                .then(async result => {
    
                    if (result[0]) {
    
                        let like_data = '' //SALVADO DADOS PARA LIKE
                        const fleets = await Fleets.findByPk(id);
    
                        for (let key in fleets.dataValues) {
                            if (key !== 'id' && key !== 'image' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'km') {
                                like_data += fleets[key] + ' '
                            }
                        }
    
                        await Fleets.update({ like_data: like_data.trim() }, { where: { id } }) //ATUALIZA CAMPOS DO LIVE
    
                        print(`FROTA ATUALIZADO ${id} - 200 - ${req.method} ${req.originalUrl}`, 'OK')
    
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
    
    
        }, */
}