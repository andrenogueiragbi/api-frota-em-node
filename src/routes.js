import express from 'express';
import driver from './controllers/driversControllers.js';


const routes = express.Router();


routes.get('/', (req, res) => res.status(200).send('API FROTA MICKS'))

/*ROTA DE MOTORISTA*/
routes.get('/driver', driver.get) //BUSCA TODOS OS MOTORISTA

routes.post('/driver', driver.post) //CRIA MOTORISTA

export { routes as default };