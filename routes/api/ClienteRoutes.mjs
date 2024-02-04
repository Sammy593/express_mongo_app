import express from 'express';
import * as clienteController from '../../app/controllers/ClienteController.mjs';

const router = express.Router();

// Rutas para CRUD de clientes
router.post('/', clienteController.createCliente);
router.get('/', clienteController.getAllClientes);
router.get('/byId/:id', clienteController.getClienteById);
router.get('/byCedula/:cedula', clienteController.getClienteByCedula);
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);
router.get('/count', clienteController.getClienteCount);

export default router;