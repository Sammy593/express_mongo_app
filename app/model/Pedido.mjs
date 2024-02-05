import mongoose, { Schema } from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    cantidad_solicitada: {
        type: Number,
        required: true,
        unique: false
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
    _cliente: { 
        type: Schema.Types.ObjectId, 
        ref: "clientes"
    },
    fecha_entrega: {
        type: String,
        required: true
    },
    paquetes: {
        type: Array,
        default: [],
        required: false
    }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;
