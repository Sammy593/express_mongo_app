import express from 'express';
import * as pedidoController from '../../app/controllers/PedidoController.mjs';

const router = express.Router();

// Rutas para CRUD de pedidos
router.get('/pendientes', pedidoController.obtenerListaPedidosPendientes);
router.get('/abastecidos', pedidoController.obtenerListaPedidosAbastecidos);
router.get('/cantidadPedidos', pedidoController.cantidadPedidos);
router.get('/obtenerPorId/:id', pedidoController.obtenerPorId);
router.get('/lista', pedidoController.obtenerListaConCliente);
router.get('/detallePedido/:id', pedidoController.verDetallesPedido);

// LISTENERS
/*
router.post('/abastecerPedido', pedidoController.abastecerPedido);

router.post('/', pedidoController.createPedido);
*/
router.post('/entregar', pedidoController.estadoEntregado);
router.delete('/:id', pedidoController.deletePedido);
/* **************************************** */
// Ruta para obtener el conteo de clientes
router.get('/count', pedidoController.getPedidoCount);

export default router;