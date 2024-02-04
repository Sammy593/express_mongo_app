import * as clienteServiceModule from '../service/ClienteServicio.mjs';

export const createCliente = async (req, res) => {
    try {
        const nuevoCliente = await clienteServiceModule.createCliente(req.body.cedula, req.body);
        res.status(201).json(nuevoCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllClientes = async (req, res) => {
    try {
        const clientes = await clienteServiceModule.getAllClientes();
        res.status(200).json(clientes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getClienteById = async (req, res) => {
    try {
        const cliente = await clienteServiceModule.getClienteById(req.params.id);
        res.status(200).json(cliente);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getClienteByCedula = async (req, res) => {
    try {
        const cliente = await clienteServiceModule.getClienteByCedula(req.params.cedula);
        res.status(200).json(cliente);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const clienteActualizado = await clienteServiceModule.updateCliente(req.params.id, req.body);
        res.status(200).json(clienteActualizado);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const clienteEliminado = await clienteServiceModule.deleteCliente(req.params.id);
        res.status(200).json(clienteEliminado);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

//Este es para saber cuantos docuemntos hay en Clientes
export const getClienteCount = async (req, res) => {
    try {
        const count = await clienteServiceModule.getClienteCount();
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};