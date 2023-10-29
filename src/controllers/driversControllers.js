import { v4 as id } from "uuid"

import Drivers from "../models/driversModel.js";
import { print } from "../lib/print.js"
import dataDriver from "./processBodyDrivers.js"


export default {
    async get(req, res) {

        const { page = 1, limit=10 } = req.query

        var lastPage = 1;

        const countDriver = await Drivers.count()


        lastPage = Math.ceil((countDriver / limit))



        await Drivers.findAll({ offset: Number((page * limit) - limit), limit: limit })
            .then(drivers => {

                print(`BUSCA TODOS OS MOTORISTA - 200 - ${req.method} ${req.originalUrl}`, 'OK')
                return res.status(200).send({
                    ok: true,
                    pagination:{
                        path: '/driver',
                        page:Number(page),
                        prev_page_url: page -1 >=1 ? page - 1: false,
                        next_page_url : Number(page) >= lastPage ? false : Number(page) + 1,
                        total: countDriver,
                        lastPage:lastPage


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

        const resultDriver = dataDriver(req, res)


        if (resultDriver.name) await Drivers.create(resultDriver)
            .then(drivers => {
                print(`SUCESSO EM CRIAR MOTORISTA - 200 - ${req.method} ${req.originalUrl}`, 'OK')

                return res.status(200).send({
                    ok: true,
                    message: 'successfully created',
                    message_en: `success in creating the driver ${resultDriver.name}`,
                    message_pt: `sucesso em criar o motorista ${resultDriver.name}`,
                    drivers
                });


            }).catch(err => {

                console.log(err);

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
