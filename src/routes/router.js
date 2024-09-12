import express from "express";
import { getAllGendersController, getAllPaymentsController, getAllPositionsController, getAllPricesController, getAllRolesController, getAllStatusesController, getAllTimesController } from "../controllers/allcodes.controller";
import { createDoctorController, createScheduleController, deleteDoctorController, getAllDoctorsController, getAllSchedulesByDateAndDoctorIdController, getAllSchedulesController, getDoctorById, updateDoctorController } from "../controllers/doctors.controller";
import { createSpecialtyController, deleteSpecialtyController, getAllSpecialtiesController, getSpecialtyByIdController, updateSpecialtyController } from "../controllers/specialties.controller";
import { createClinicController, deleteClinicController, getAllClinicsController, getClinicByIdController, updateClinicController } from "../controllers/clinics.controller";
import { confirmBookingController, createBookingController, getAllPatientsByDateAndDoctorIdController, sendPrescriptionController } from "../controllers/paitents.controller";
import { loginController } from "../controllers/systems.controller";

let router = express.Router();

let initWebRouters = (app) => {
  router.post("/api/login", loginController);

  router.get('/api/getAllRoles', getAllRolesController)
  router.get('/api/getAllStatuses', getAllStatusesController)
  router.get('/api/getAllTimes', getAllTimesController)
  router.get('/api/getAllPositions', getAllPositionsController)
  router.get('/api/getAllGenders', getAllGendersController)
  router.get('/api/getAllPrices', getAllPricesController)
  router.get('/api/getAllPayments', getAllPaymentsController)

  router.post('/api/createDoctor', createDoctorController)
  router.get('/api/getAllDoctors', getAllDoctorsController)
  router.get("/api/getDoctorById/:id", getDoctorById);
  router.put('/api/updateDoctor', updateDoctorController)
  router.delete('/api/deleteDoctor/:id', deleteDoctorController)

  router.post('/api/createSpecialty', createSpecialtyController)
  router.get('/api/getAllSpecialties', getAllSpecialtiesController)
  router.get("/api/getSpecialtyById/:id", getSpecialtyByIdController)
  router.put('/api/updateSpecialty', updateSpecialtyController)
  router.delete('/api/deleteSpecialty/:id', deleteSpecialtyController)

  router.post('/api/createClinic', createClinicController)
  router.get('/api/getAllClinics', getAllClinicsController)
  router.get("/api/getClinicById/:id", getClinicByIdController)
  router.put('/api/updateClinic', updateClinicController)
  router.delete('/api/deleteClinic/:id', deleteClinicController)

  router.post("/api/createSchedule", createScheduleController)
  router.get("/api/getAllSchedulesByDateAndDoctorId", getAllSchedulesByDateAndDoctorIdController)

  router.post('/api/createBooking', createBookingController)
  router.post('/api/confirmBooking', confirmBookingController)
  router.get('/api/getAllPatientsByDateAndDoctorId', getAllPatientsByDateAndDoctorIdController)
  router.post("/api/sendPrescription", sendPrescriptionController)

  return app.use("/", router);
};

module.exports = initWebRouters;
