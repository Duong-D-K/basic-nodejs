import { createSpecialtyService, deleteSpecialtyService, getAllSpecialtiesService, getSpecialtyByIdService, updateSpecialtyService } from "../services/specialties.service";

export const createSpecialtyController = async (req, res) => {
    try {
        return res.status(200).json(await createSpecialtyService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllSpecialtiesController = async (req, res) => {
    try {
        return res.status(200).json(await getAllSpecialtiesService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getSpecialtyByIdController = async (req, res) => {
    try {
        return res.status(200).json(await getSpecialtyByIdService(req.params.id));
    } catch (error) {
        console.log(error);
        return res.status(400).json('Error code from server.');
    }
};

export const updateSpecialtyController = async (req, res) => {
    try {
        return res.status(200).json(await updateSpecialtyService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
}

export const deleteSpecialtyController = async (req, res) => {
    try {
        return res.status(200).json(await deleteSpecialtyService(req.params.id));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
}; 