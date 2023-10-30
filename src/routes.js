import express from 'express';
import driver from './controllers/driversControllers.js';
import multer from 'multer'
import configMulter from './config/multerConfig.js';



const routes = express.Router();


const upload = multer({ configMulter });


routes.get('/', (req, res) => res.status(200).send('API FROTA MICKS'))

/*ROTA DE MOTORISTA*/
routes.get('/driver', driver.get) //BUSCA TODOS OS MOTORISTA

routes.post('/driver',upload.single('avatar'), driver.post) //CRIA MOTORISTA



export { routes as default };