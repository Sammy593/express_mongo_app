import express from 'express';
import * as clienteController from '../../app/controllers/ClienteController.mjs';

const router = express.Router();

// Rutas para CRUD de clientes
router.post('/', clienteController.createCliente);
router.get('/', clienteController.getAllClientes);
router.get('/:id', clienteController.getClienteById);
router.get('/:cedula', clienteController.getClienteByCedula);
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);

export default router;