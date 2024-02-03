import mongoose, { Schema } from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    cantidad_solicitada: {
        type: Number,
        required: true,
        unique: false
    },
    detalles_pedido: {
        type: String,
        required: true
    },
    observaciones: {
        type: String,
        required: false,
        default: 'N/A'
    },
    estado: {
        type: String,
        required: false,
        default: 'N/A'
    },
    cod_cliente: {
        type: Schema.Types.ObjectId,
        required: true
    },
    paquetes: {
        type: Array,
        required: false
    }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;
