import * as pedidoServiceModule from '../service/PedidoServicio.mjs';

export const createPedido = async (req, res) => {
    try {
        const nuevoPedido = await pedidoServiceModule.createPedido(req.body);
        res.status(201).json(nuevoPedido);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const obtenerListaPedidosPendientes = async (req, res) => {
    try {
        const pedidos = await pedidoServiceModule.obtenerListaPedidosPendientes();
        if(pedidos.error){
            res.status(400).json({ message: pedidos.mensaje });
        }else{
            res.status(200).json(pedidos);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const obtenerListaPedidosAbastecidos = async (req, res) => {
    try {
        const pedidos = await pedidoServiceModule.obtenerListaPedidosAbastecidos();
        res.status(200).json(pedidos);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/*
export const agregarPaquetes = async (req, res) => {
    try {
        const respuesta = await pedidoServiceModule.agregarPaquetes(req.params.id, req.body);
        res.status(201).json(respuesta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const evaluarYactualizarEstadoPedido = async (req, res) => {
    try {
        const respuesta = await pedidoServiceModule.evaluarYactualizarEstadoPedido(req.params.id);
        res.status(200).json(respuesta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};*/





export const deletePedido = async (req, res) => {
    try {
        const respuesta = await pedidoServiceModule.deletePedido(req.params.id);
        res.status(200).json(respuesta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const estadoEntregado = async (req, res) => {
    try {
        const respuesta = await pedidoServiceModule.estadoEntregado(req.params.id);
        res.status(200).json(respuesta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const cantidadPedidos = async (req, res) => {
    try {
        const respuesta = await pedidoServiceModule.cantidadPedidos();
        res.status(200).json(respuesta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const obtenerPorId = async (req, res) => {
    try {
        const respuesta = await pedidoServiceModule.obtenerPorId(req.params.id);
        res.status(200).json(respuesta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const obtenerListaConCliente = async (req, res) => {
    try {
        const respuesta = await pedidoServiceModule.obtenerListaConCliente();
        res.status(200).json(respuesta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};