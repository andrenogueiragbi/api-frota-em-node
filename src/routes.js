import express from 'express';
import driver from './controllers/driversControllers.js';
import multer from 'multer'
import configMulter from './config/multerConfig.js';



const upload = multer(configMulter);


const routes = express.Router();


routes.get('/', (req, res) => res.status(200).send('API FROTA MICKS'))

/*ROTA DE MOTORISTA*/
routes.get('/driver', driver.get) //BUSCA TODOS OS MOTORISTA

routes.post('/driver',upload.single('photo'), driver.post) //CRIA MOTORISTA

/* routes.post('/teste',upload.single('photo'), (req, res) => {

    //console.log(req.file?.buffer)
    console.log(JSON.parse(req.body.driver))


    return res.status(200).send('OK')

}) //CRIA MOTORISTA

 */

export { routes as default };