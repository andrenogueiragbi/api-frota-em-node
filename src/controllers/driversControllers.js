import Drivers from "../models/driversModel.js";
import { print } from "../lib/print.js"
import dataDriver from "./processBodyDrivers.js"
import { Op } from 'sequelize'




export default {
    async get(req, res) {

        const { page = 1, limit = 10, search = null } = req.query

        var lastPage = 1;
        var countDriver = 0

        if (search)
            countDriver = await Drivers.count({
                where: { like_data: { [Op.substring]: search } }
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
                like_data: { [Op.substring]: search }
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


        const resultDriver = dataDriver(req.body, req.method, req.originalUrl)


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
    /*     async update(req, res) {
    
            const { id } = req.params
            const { name } = req.body;
    
            //valida se existe parametro e se é número
            if (!id || isNaN(id)) {
                return res.status(403).send({
                    ok: false,
                    message: `missing parameter or ${id} not number`
                });
            }
    
    
            Country.update({ name:name.toUpperCase() }, { where: { id } })
                .then(result => {
    
                    if (result[0]) {
                        return res.status(200).send({
                            ok: true,
                            message: `successful updation id ${id}`,
                        });
    
                    } else {
                        return res.status(403).send({
                            ok: false,
                            message: `failed updation, not found id ${id}`,
                            
    
                        });
    
                    }
    
    
                }).catch(err => {
    
                    return res.status(500).send({
                        ok: false,
                        message: err
                    });
    
                })
    
        },  */
}
