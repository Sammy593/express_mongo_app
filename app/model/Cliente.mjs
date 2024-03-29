import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    cedula_cliente: {
        type: String,
        required: true,
        unique: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    pedidos: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
});

const Cliente = mongoose.model('Cliente', clientSchema);


export default Cliente;
