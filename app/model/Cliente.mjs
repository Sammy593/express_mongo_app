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
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }
});

const Cliente = mongoose.model('Cliente', clientSchema);

export default Cliente;
