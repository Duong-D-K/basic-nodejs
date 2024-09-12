import { createDoctorService, createScheduleService, deleteDoctorService, getAllDoctorsService, getAllSchedulesByDateAndDoctorIdService, getAllSchedulesService, getDoctorByIdService, updateDoctorService } from "../services/doctors.service";

export const createDoctorController = async (req, res) => {
    try {
        return res.status(200).json(await createDoctorService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllDoctorsController = async (req, res) => {
    try {
        return res.status(200).json(await getAllDoctorsService());
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getDoctorById = async (req, res) => {
    try {
        return res.status(200).json(await getDoctorByIdService(req.params.id));
    } catch (error) {
        console.log(error);
        return res.status(400).json('Error code from server.');
    }
};

export const updateDoctorController = async (req, res) => {
    try {
        return res.status(200).json(await updateDoctorService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
}

export const deleteDoctorController = async (req, res) => {
    try {
        return res.status(200).json(await deleteDoctorService(req.params.id));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};


export const createScheduleController = async (req, res) => {
    try {
        return res.status(200).json(await createScheduleService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllSchedulesByDateAndDoctorIdController = async (req, res) => {
    try {
        return res.status(200).json(await getAllSchedulesByDateAndDoctorIdService(req.query.doctorId, req.query.date));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};
