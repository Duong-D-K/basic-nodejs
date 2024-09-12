import { getAllGendersService, getAllPaymentsService, getAllPositionService, getAllPricesService, getAllRolesService, getAllStatusesService, getAllTimesService } from "../services/allcodes.service";

export const getAllRolesController = async (req, res) => {
    try {
        return res.status(200).json(await getAllRolesService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllStatusesController = async (req, res) => {
    try {
        return res.status(200).json(await getAllStatusesService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllTimesController = async (req, res) => {
    try {
        return res.status(200).json(await getAllTimesService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllPositionsController = async (req, res) => {
    try {
        return res.status(200).json(await getAllPositionService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllGendersController = async (req, res) => {
    try {
        return res.status(200).json(await getAllGendersService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllPricesController = async (req, res) => {
    try {
        return res.status(200).json(await getAllPricesService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllPaymentsController = async (req, res) => {
    try {
        return res.status(200).json(await getAllPaymentsService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};
