import Cliente from '../model/Cliente.mjs';

export const createCliente = async (cedula, clienteData) => {
    try {
        const cliente = await Cliente.findOne({ cedula_cliente: cedula });
        console.log(cliente);
        if (cliente == null) {
            const nuevoCliente = await Cliente.create(clienteData);
            return nuevoCliente;
        }else{
            throw new Error('Ya existe un cliente registrado con esta cedula');
        }
    } catch (err) {
        throw new Error(`Error al crear cliente: ${err.message}`);
    }
};

export const getAllClientes = async () => {
    try {
        const clientes = await Cliente.find();
        return clientes;
    } catch (err) {
        throw new Error(`Error al obtener clientes: ${err.message}`);
    }
};

export const getClienteById = async (clienteId) => {
    try {
        const cliente = await Cliente.findById(clienteId);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
        return cliente;
    } catch (err) {
        throw new Error(`Error al obtener cliente por ID: ${err.message}`);
    }
};

export const getClienteByCedula = async (cedula) => {
    try {
        const cliente = await Cliente.findOne({ cedula_cliente: cedula });
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
        return cliente;
    } catch (err) {
        throw new Error(`Error al obtener cliente por ID: ${err.message}`);
    }
};

export const updateCliente = async (clienteId, clienteData) => {
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(clienteId, clienteData, { new: true });
        if (!clienteActualizado) {
            throw new Error('Cliente no encontrado');
        }
        return clienteActualizado;
    } catch (err) {
        throw new Error(`Error al actualizar cliente: ${err.message}`);
    }
};

export const deleteCliente = async (clienteId) => {
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(clienteId);
        if (!clienteEliminado) {
            throw new Error('Cliente no encontrado');
        }
        return clienteEliminado;
    } catch (err) {
        throw new Error(`Error al eliminar cliente: ${err.message}`);
    }
};

export const getClienteCount = async () => {
    try {
        const count = await Cliente.countDocuments();
        return count;
    } catch (err) {
        throw new Error(`Error al obtener el conteo de clientes: ${err.message}`);
    }
};

