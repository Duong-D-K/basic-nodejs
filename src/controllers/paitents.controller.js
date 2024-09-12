import { confirmBookingService, createBookingService, getAllPatientsByDateAndDoctorIdService, sendPrescriptionService } from "../services/patients.service";

export const createBookingController = async (req, res) => {
    try {
        return res.status(200).json(await createBookingService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const confirmBookingController = async (req, res) => {
    try {
        return res.status(200).json(await confirmBookingService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const getAllPatientsByDateAndDoctorIdController = async (req, res) => {
    try {
        return res.status(200).json(await getAllPatientsByDateAndDoctorIdService(req.query.date, req.query.doctorId));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};

export const sendPrescriptionController = async (req, res) => {
    try {
        return res.status(200).json(await sendPrescriptionService(req.body));
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error code from server.' });
    }
};