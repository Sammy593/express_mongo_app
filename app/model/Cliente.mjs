import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    cantidad_entrega: {
        type: Number,
        required: true,
        unique: true
    },
    cedula_cliente: {
        type: String,
        required: true,
        unique: true
    },
    contacto: {
        type: String,
        required: true
    },
    detalle_entrega: {
        type: String,
        required: true
    },
    direccion_entrega: {
        type: String,
        required: true
    },
    fecha_entrega: {
        type: Date,
        required: true
    },
    nombre_cliente: {
        type: String,
        required: true
    }
});

const Cliente = mongoose.model('Cliente', clientSchema);

export default Cliente;
