import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { sendBookingEmail, sendPrescription } from './emails.service';

const prisma = new PrismaClient();

export const createBookingService = async (data) => {
    try {
        const formatFieldName = (fieldName) => {
            return fieldName
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
        };

        for (const key in data) {
            if (!data[key]) {
                return (`Missing Parameter: ${formatFieldName(key)} !`);
            }
        }

        let token = uuidv4();

        // Kiểm tra có patient hay chưa
        const currentPatient = await prisma.patient.findFirst({
            where: { email: data.email },
            select: { id: true }
        })
        // nếu chưa thì tạo mới patient
        if (!currentPatient) {
            await prisma.patient.createMany({
                data: {
                    email: data.email,
                    name: data.name,
                    birthday: data.birthday,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    genderId: data.gender,
                    isActive: true,
                }
            })
        }

        // kiểm tra xem có booking theo bác si, giờ và ngày hay chưa
        const currentBooking = await prisma.booking.findFirst({
            where: {
                doctorId: data.doctorId,
                timeId: data.timeId,
                date: data.date,
            },
            select: { id: true }
        })

        // nếu không có thì tạo booking và gửi email tới patient
        if (!currentBooking) {
            const updatedPatient = await prisma.patient.findFirst({
                where: { email: data.email },
                select: { id: true }
            });
            await prisma.booking.createMany({
                data: {
                    reason: data.reason,
                    token: token,
                    date: data.date,

                    statusId: '944abee6-6db0-4b1d-9291-ad7004213106', // New
                    doctorId: data.doctorId,
                    patientId: updatedPatient.id,
                    timeId: data.timeId,
                }
            })

            await sendBookingEmail({
                name: data.name,
                email: data.email,
                doctorId: data.doctorId,
                timeId: data.timeId,
                receivedRedirectLink: `${process.env.URL_REACT}/confirmBooking?token=${token}&doctorId=${data.doctorId}&patientId=${updatedPatient.id}`,
            })

            await prisma.schedule.updateMany({
                where: {
                    date: data.date,
                    doctorId: data.doctorId,
                    timeId: data.timeId,
                },
                data: {
                    isBooked: true
                }
            })
            return ("Create booking successful.");
        } else {
            // nếu có lịch khám rồi thì trả về...
            return ("The doctor has scheduled an examination during this time.");
        }

    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}

export const confirmBookingService = async (data) => {
    try {
        // Hàm chuyển đổi tên thuộc tính thành định dạng mong muốn
        const formatFieldName = (fieldName) => {
            return fieldName
                .replace(/([A-Z])/g, ' $1') // Thêm khoảng trắng trước các chữ cái viết hoa
                .replace(/^./, str => str.toUpperCase()); // Viết hoa chữ cái đầu tiên
        };

        // Duyệt qua tất cả các thuộc tính của object data
        for (const key in data) {
            // Kiểm tra xem giá trị của thuộc tính có là null, undefined hoặc rỗng không
            if (!data[key]) {
                // Nếu có, tạo thông báo lỗi từ tên thuộc tính
                const formattedFieldName = formatFieldName(key);
                return `Missing Parameter: ${formattedFieldName} !`;
            }
        }

        const currentBooking = await prisma.booking.findFirst({
            where: {
                token: data?.token,
                doctorId: data?.doctorId,
                patientId: data?.patientId,
                statusId: '944abee6-6db0-4b1d-9291-ad7004213106', // New
            }, select: { id: true }
        })

        if (currentBooking) {
            await prisma.booking.updateMany({
                data: {
                    statusId: '241d05de-9220-4b0c-9017-39316ca14ed2' // Confirm
                }
            })

            return ('Confirm booking successful.');
        } else {
            return ("Booking hasn't been activated or doesn't exsit!");
        }
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
};

export const getAllPatientsByDateAndDoctorIdService = async (date, doctorId) => {
    try {
        if (!doctorId) {
            return ("Missing parameter: Doctor Id");
        }
        if (!date) {
            return ("Missing parameter: Date");
        }

        const data = await prisma.booking.findMany({
            where: {
                date: date,
                doctor: { id: doctorId }, // doctorId is relation field
                statusId: '241d05de-9220-4b0c-9017-39316ca14ed2' // Confirm
            },
            select: {
                reason: true,
                date: true,
                time: { select: { id: true, name: true, ordinal: true } },
                patient: { select: { id: true, email: true, name: true, phoneNumber: true, birthday: true, gender: { select: { id: true, name: true } } } }
            }
        })

        return (data ? data : [])
    } catch (error) {
        console.log(error);
        throw new Error("Error retrieving schedules.");
    } finally {
        await prisma.$disconnect();
    }
};

export const sendPrescriptionService = async (data) => {
    try {
        const formatFieldName = (fieldName) => {
            return fieldName
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
        };

        for (const key in data) {
            if (!data[key]) {
                return (`Missing Parameter: ${formatFieldName(key)} !`);
            }
        }

        const currentBooking = await prisma.booking.findFirst({
            where: {
                doctorId: data.doctorId,
                patientId: data.patientId,
                timeId: data.time.id,
                statusId: '241d05de-9220-4b0c-9017-39316ca14ed2' // Confirm
            }
        })

        if (currentBooking) {
            await prisma.booking.updateMany({
                where: {
                    doctorId: data.doctorId,
                    patientId: data.patientId,
                    timeId: data.time.id,
                    statusId: '241d05de-9220-4b0c-9017-39316ca14ed2' // Confirm
                },
                data: {
                    statusId: 'c649307a-35eb-4fbb-bcc4-b4168a84e1c1' //Done
                }
            })
        }

        //send prescription
        await sendPrescription(data);

        return ('Send prescription successful.');

    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
}