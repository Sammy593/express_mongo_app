import express from 'express';
import * as pedidoController from '../../app/controllers/PedidoController.mjs';

const router = express.Router();

// Rutas para CRUD de clientes
router.post('/', pedidoController.createPedido);
router.get('/pendientes', pedidoController.obtenerListaPedidosPendientes);
router.get('/abastecidos', pedidoController.obtenerListaPedidosAbastecidos);
//router.post('/addPaquete/:id', pedidoController.agregarPaquetes);
//router.get('/estado/:id', pedidoController.evaluarYactualizarEstadoPedido);
router.delete('/:id', pedidoController.deletePedido);
router.get('/cantidadPedidos', pedidoController.cantidadPedidos);
router.get('/obtenerPorId/:id', pedidoController.obtenerPorId);
router.post('/entregado/:id', pedidoController.estadoEntregado);
router.get('/lista', pedidoController.obtenerListaConCliente);

export default router;