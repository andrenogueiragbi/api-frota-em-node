import Fleets from '../models/fleetModel.js'
import { print } from "../lib/print.js"
import { Op } from 'sequelize'
import processNewBodyFeet from "./processNewBodyFeet.js"


export default {
    async get(req, res) {
        const { page = 1, limit = 10, search = null } = req.query

        var lastPage = 1;
        var countFleet = 0

        if (search)
            countFleet = await Fleets.count({
                where: { like_data: { [Op.iLike]: `%${search.replace(/ /g, '%')}%` } }
            })
        else {
            countFleet = await Fleets.count()

        }


        lastPage = Math.ceil((countFleet / limit))

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



        await Fleets.findAll(queryOptions).then(fleets => {

            print(`BUSCA TODA AS FROTAS - 200 - ${req.method} ${req.originalUrl}`, 'OK')
            return res.status(200).send({
                ok: true,
                pagination: {
                    path: '/driver',
                    page: Number(page),
                    prev_page_url: page - 1 >= 1 ? page - 1 : false,
                    next_page_url: Number(page) >= lastPage ? false : Number(page) + 1,
                    total: countFleet,
                    lastPage: lastPage


                },
                message_en: 'search success',
                message_pt: 'sucesso na pesquisa',
                fleets
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
        if (!id || isNaN(id)) {
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



        Fleets.destroy({
            where: { id }
        }).then(result => {

            if (result) {
                print(`DELETADO MOTORISTA ${id} - 200 - ${req.method} ${req.originalUrl}`, 'OK')

                return res.status(200).send({
                    ok: true,
                    message: `successful deletion id ${id}`,
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
        const resultFleet = processNewBodyFeet(req.body, req.method, req.originalUrl)


        if (!resultFleet.ok) {
            return res.status(403).send(resultFleet)

        }

        if (req.file?.buffer) {

            const fileData = req.file.buffer.toString('base64');

            // Cria a URL de dados (data URL) com o tipo de arquivo
            const fileType = req.file.mimetype;

            resultFleet.image = `data:${fileType};base64,${fileData}`;
        }




        await Fleets.create(resultFleet)
            .then(fleets => {
                print(`SUCESSO EM CRIAR FROTA - 200 - ${req.method} ${req.originalUrl}`, 'OK')

                fleets.image = undefined

                return res.status(200).send({
                    ok: true,
                    message: 'successfully created',
                    message_en: `success in creating the fleet ${resultFleet.model}`,
                    message_pt: `sucesso em criar a frota ${resultFleet.model}`,
                    fleets
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
    async update(req, res) { },
}