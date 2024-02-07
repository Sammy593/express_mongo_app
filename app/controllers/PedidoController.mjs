import * as pedidoServiceModule from '../service/PedidoServicio.mjs';
import axios from "axios";

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

export const verDetallesPedido = async (req, res) => {
    try {
        const pedido = await pedidoServiceModule.obtenerPorId(req.params.id);
        let diccionarioLotes = {};
        pedido.paquetes.forEach(paquete => {
            let {codLote, cantidad} = paquete;
            diccionarioLotes[codLote] = (diccionarioLotes[codLote] || 0) + cantidad;
        });
        let paquetesFiltrados = Object.keys(diccionarioLotes).map(codLote => {
            return {"id_lote": codLote, "cantidadPaquetesDisponibles": diccionarioLotes[codLote]};
        });
        //Consumir microservicio 1 obtener nombres de lotes
        const response = await axios.post(process.env.URL_MICROSERVICIO1 + "/loteProductos/enviarProductos", paquetesFiltrados);

        const campo = {
            paquetesNombre: response.data
        };
        
        // Convertir el objeto pedido a un objeto plano
        const pedidoPlano = pedido.toObject();
        
        // Fusionar los campos adicionales
        const pedidoDetalles = Object.assign(pedidoPlano, campo);

        res.status(200).json(pedidoDetalles);
    } catch (err) {
        res.status(400).json({ message: err});
    }
}

export const abastecerPedido = async (req, res) => {
    try {
        //Consumir microservicio 1 actualizarCantidadPaquetesLote(cod_lote, cantidad_paquetes)
        const response = await axios.put(process.env.URL_MICROSERVICIO1 + "/loteProductos/updateCantidadPaquetesDisponibles/"+req.body.codLote+"/"+req.body.cantidad_paquetes);
        if(response.status == 200){
            const agregarPaquetes = await pedidoServiceModule.agregarPaquetes(req.body);
            const evaluar = await pedidoServiceModule.evaluarYactualizarEstadoPedido(req.body.idPedido);
            if(agregarPaquetes && evaluar){
                res.status(201).json({message: "Abastecido correctamente"});
            }else{
                res.status(500).json({messaje: "Fallo al agregar"});
            }
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

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
        const respuesta = await pedidoServiceModule.estadoEntregado(req.body.idPedido);
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



export const getPedidoCount = async (req, res) => {
    try {
        const count = await pedidoServiceModule.getPedidoCount();
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

