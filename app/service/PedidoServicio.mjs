import Pedido from '../model/Pedido.mjs';

//Crear -- string
export const createPedido = async (pedidoData) => {
    try {
        return await Pedido.create(pedidoData);
    } catch (err) {
        throw new Error(`Error al crear: ${err.message}`);
    }
};

//obtenerListaPedidosPendientes -- string
export const obtenerListaPedidosPendientes = async () => {
    try {
        return await Pedido.find({estado: 'pendiente'});
    } catch (err) {
        throw new Error(`Error al buscar: ${err.message}`);
    }
};

//obtenerListaPedidosAbastecidos -- string
export const obtenerListaPedidosAbastecidos = async () => {
    try {
        return await Pedido.find({estado: 'abastecido'});
    } catch (err) {
        throw new Error(`Error al buscar: ${err.message}`);
    }
};


//agregarPaquetesSolicitud -- string
export const agregarPaquetes = async (pedidoId, nuevosPaquetes) => {
    try {
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
            throw new Error('Pedido no encontrado');
        }
        nuevosPaquetes.forEach(({ id_lote, cantidad }) => {
            pedido.paquetes.push({ id_lote, cantidad });
        });
        return await pedido.save();
    } catch (err) {
        throw new Error(`Error al buscar: ${err.message}`);
    }
};

//evaluarEstadoPedido  -- bolean
export const evaluarYactualizarEstadoPedido = async (pedidoId) => {
    try {
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
            throw new Error('Pedido no encontrado');
        }
        const sumaCantidadesPaquetes = pedido.paquetes.reduce((total, paquete) => total + paquete.cantidad, 0);
        if (sumaCantidadesPaquetes === pedido.cantidad_solicitada) {
            pedido.estado = 'abastecido';
          } else {
            pedido.estado = 'pendiente';
          }
          const pedidoActualizado = await pedido.save();

        return pedidoActualizado;
    } catch (err) {
        throw new Error(`Error al eliminar: ${err.message}`);
    }
};

//Eliminar -- string
export const deletePedido = async (pedidoId) => {
    try {
        const pedidoEliminado = await Pedido.findByIdAndDelete(pedidoId);
        if (!pedidoEliminado) {
            throw new Error('Pedido no encontrado');
        }
        return pedidoEliminado;
    } catch (err) {
        throw new Error(`Error al eliminar: ${err.message}`);
    }
};

// cantidad de registros en coleccion
export const cantidadPedidos = async () => {
    try {
        return await Pedido.countDocuments();;
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }
};

//buscar por id y mostrar solo: id, campo_nombre -- string
export const obtenerPorId = async (idPedido) => {
    try {
        const pedido = await Pedido.findOne({ _id: idPedido }, { _id: 1, detalles_pedido: 1 });
        if (!pedido) {
          throw new Error('Pedido no encontrado');
        }
        return pedido;
    } catch (err) {
        throw new Error(`Error al buscar: ${err.message}`);
    }
};

//cambiar estado a "entregado"
export const estadoEntregado = async (pedidoId) => {
    try {
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
            throw new Error('Pedido no encontrado');
        }
        pedido.estado = 'entregado';
        const to_day = new Date();
        pedido.fecha_entrega = to_day.getDate();
        const pedidoActualizado = await pedido.save();

        return pedidoActualizado;
    } catch (err) {
        throw new Error(`Error al eliminar: ${err.message}`);
    }
};