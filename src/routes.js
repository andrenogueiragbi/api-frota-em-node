import express from 'express';
import driver from './controllers/driversControllers.js';
import fleet from './controllers/fleetControllers.js';
import multer from 'multer'
import configMulter from './config/multerConfig.js';

const routes = express.Router();

const upload = multer({ configMulter });

routes.get('/', (req, res) => res.status(200).send('API FROTA MICKS'))

/*ROTA DE MOTORISTA*/
routes.get('/driver', driver.get) //BUSCA TODOS OS MOTORISTA
routes.post('/driver',upload.single('avatar'), driver.post) //CRIA MOTORISTA
routes.put('/driver/:id',upload.single('avatar'), driver.update) //ATUALIZA MOTORISTA
routes.delete('/driver/:id', driver.delete) //DELETA MOTORISTA


/*ROTA DE MOTORISTA*/
routes.get('/fleet', fleet.get) //BUSCA TADAS AS FROTAS
routes.post('/fleet',upload.single('image'), fleet.post) //CRIA FROTA
routes.put('/fleet/:id',upload.single('image'), fleet.update) //ATUALIZA FROTA
routes.delete('/fleet/:id', fleet.delete) //DELETA FROTA

export { routes as default };