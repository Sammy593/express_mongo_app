import express from 'express';
import * as pedidoController from '../../app/controllers/PedidoController.mjs';

const router = express.Router();

// Rutas para CRUD de clientes
router.post('/', pedidoController.createPedido);
router.get('/pendientes', pedidoController.obtenerListaPedidosPendientes);
router.get('/abastecidos', pedidoController.obtenerListaPedidosAbastecidos);
//router.post('/addPaquete/:id', pedidoController.agregarPaquetes);
//router.get('/estado/:id', pedidoController.evaluarYactualizarEstadoPedido);
router.post('/abastecerPedido', pedidoController.abastecerPedido);
router.delete('/:id', pedidoController.deletePedido);
router.get('/cantidadPedidos', pedidoController.cantidadPedidos);
router.get('/obtenerPorId/:id', pedidoController.obtenerPorId);
router.post('/entregar', pedidoController.estadoEntregado);
router.get('/lista', pedidoController.obtenerListaConCliente);
router.get('/detallePedido/:id', pedidoController.verDetallesPedido);

// Ruta para obtener el conteo de clientes
router.get('/count', pedidoController.getPedidoCount);

export default router;