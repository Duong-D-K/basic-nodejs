import { createClinicService, deleteClinicService, getAllClinicsService, getClinicByIdService, updateClinicService } from "../services/clinics.service";

export const createClinicController = async (req, res) => {
    try {
        return res.status(200).json(await createClinicService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllClinicsController = async (req, res) => {
    try {
        return res.status(200).json(await getAllClinicsService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getClinicByIdController = async (req, res) => {
    try {
        return res.status(200).json(await getClinicByIdService(req.params.id));
    } catch (error) {
        console.log(error);
        return res.status(400).json('Error code from server.');
    }
};

export const updateClinicController = async (req, res) => {
    try {
        return res.status(200).json(await updateClinicService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
}

export const deleteClinicController = async (req, res) => {
    try {
        return res.status(200).json(await deleteClinicService(req.params.id));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
}; 