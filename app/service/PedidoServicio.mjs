import Pedido from '../model/Pedido.mjs';
import Cliente from '../model/Cliente.mjs';

//Crear -- string
export const createPedido = async (pedidoData) => {
    try {
        const cliente = await Cliente.findById(pedidoData._cliente);
        if (!cliente) {
            throw new Error("Cliente no encontrado");
        }
        var pedidoGuardado = await Pedido.create(pedidoData);        
        cliente.pedidos.push(pedidoGuardado._id.toString());
        await cliente.save();
        return { pedido_guardado: pedidoGuardado };
    } catch (error) {
        throw new Error(`Error al crear pedido: ${error.message}`);
    }
};

//funcion con session (solo para atlas) servicio con replicas
/*
export const createPedido = async (pedidoData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        var pedido = new Pedido(pedidoData);
        const pedidoGuardado = await pedido.save({session});
        
        const cliente = await Cliente.findById(pedidoGuardado._id);
        if (!cliente) {
            throw new Error("Cliente no encontrado");
        }

        cliente.pedidos.push(pedidoGuardado._id.toString());
        await cliente.save({ session });
        await session.commitTransaction();
        session.endSession();
        return { pedido_guardado: pedidoGuardado };

    } catch (error) {
        await session.abortTransaction();
        throw new Error(`Error al crear pedido: ${error.message}`);
    } finally {
        session.endSession();
    }
};
*/

//Obtener pedidos con nombre de cliente
export const obtenerListaConCliente = async () => {
    try {
        const lista = await Pedido.aggregate([
            {
                $lookup: {
                  from: 'clientes',
                  localField: '_cliente',
                  foreignField: '_id',
                  as: 'cliente'
                }
              },
              {
                $project: {
                  _id: 1,
                  detalles_pedido: 1,
                  cantidad_solicitada: 1,
                  estado: 1,
                  fecha_entrega: 1,
                  nombre_cliente: { $arrayElemAt: ["$cliente.nombres", 0] },
                  apellido_cliente: { $arrayElemAt: ["$cliente.apellidos", 0] },
                  suma_cantidad_paquetes: {
                    $reduce: {
                      input: "$paquetes",
                      initialValue: 0,
                      in: { $add: ["$$value", "$$this.cantidad"] }
                    }
                  }
                }
              }
            ]);
      
          return lista;
    } catch (err) {
        throw new Error(`Error al buscar: ${err.message}`);
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

// =======================================================================
//agregarPaquetesSolicitud -- true
export const agregarPaquetes = async (data) => {
    try {
        const pedido = await Pedido.findById(data.idPedido);
        if (!pedido) {
            throw new Error('Pedido no encontrado');
        }
        const sumaCantidadesPaquetes = pedido.paquetes.reduce((total, paquete) => total + paquete.cantidad, 0);
        var validacion = pedido.cantidad_solicitada - sumaCantidadesPaquetes;

        if(validacion < data.cantidad_paquetes){
            throw new Error("Excede la cantidad de paquetes solicitados");
        }
        pedido.paquetes.push({ codLote: data.codLote, cantidad: data.cantidad_paquetes });
        
        await pedido.save();

        return true;

    } catch (err) {
        throw new Error(`Error: ${err.message}`);
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

        pedido.save();

        return true;
    } catch (err) {
        throw new Error(`Error al eliminar: ${err.message}`);
    }
};

// =======================================================================

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
        const pedido = await Pedido.findOne({ _id: idPedido });
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
        pedido.fecha_entrega = to_day.toISOString();
        const pedidoActualizado = await pedido.save();

        return pedidoActualizado;
    } catch (err) {
        throw new Error(`Error al eliminar: ${err.message}`);
    }
};

//contar cuantos pedidos hay en Pedidos
export const getPedidoCount = async () => {
    try {
        const count = await Pedido.countDocuments();
        return count;
    } catch (err) {
        throw new Error(`Error al obtener el conteo de Pedidos: ${err.message}`);
    }
};
