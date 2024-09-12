import { PrismaClient } from '@prisma/client';
import { Buffer } from 'buffer';
import { time } from 'console';

const prisma = new PrismaClient();

export const createDoctorService = async (data) => {
    console.log(data)

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

        let imageBuffer = ''


        if (data.image) {
            // Remove the "data:image/jpeg;base64," part from the base64 image
            const base64Image = data.image.replace(/^data:image\/\w+;base64,/, '');

            imageBuffer = Buffer.from(base64Image, 'base64'); // Convert base64 to buffer
        }

        await prisma.doctor.create({
            data: {
                name: data.name,
                password: data.password,
                email: data.email,
                gender: { connect: { id: data.gender } },
                price: { connect: { id: data.price } },
                payment: { connect: { id: data.payment } },
                position: { connect: { id: data.position } },
                phoneNumber: data.phoneNumber,
                introduction: data.introduction,
                note: data.note,
                image: imageBuffer || '',
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
                role: { connect: { id: data.role } },
                // province: { connect: { id: 'none' } }, 
                specialty: { connect: { id: data.specialty } },
                clinic: { connect: { id: data.clinic } },
            },
        });

        return 'Doctor added successful.';
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
};

export const getAllDoctorsService = async () => {
    try {
        const data = await prisma.doctor.findMany({
            where: {
                roleId: 'fb46139a-84fd-4b1a-bdd8-060d16641502', // doctor
            },
            select: {
                id: true,
                createdAt: false,
                updatedAt: false,
                name: true,
                email: true,
                password: true,
                phoneNumber: true,
                image: true,
                introduction: true,
                note: true,
                contentHTML: true,
                contentMarkdown: true,
                gender: { select: { id: true, name: true } },
                role: { select: { id: true, name: true } },
                position: { select: { id: true, name: true } },
                price: { select: { id: true, name: true } },
                payment: { select: { id: true, name: true } },
                specialty: { select: { id: true, name: true } },
                clinic: { select: { id: true, name: true } },
            },
        });

        data.map(item => {
            if (item?.image) {
                item.image = item.image.toString('base64');
                item.image = `data:image/jpeg;base64,${item.image}`;
            }
        });

        return (data?.length > 0 ? data : []);
    } catch (e) {
        return (e);
    } finally {
        await prisma.$disconnect();
    }

};

export const getDoctorByIdService = async (id) => {
    if (!id) {
        return ("Missing parameter: Id");
    }
    try {
        const data = await prisma.doctor.findFirst({
            where: { id: id },
            select: {
                id: true,
                createdAt: false,
                updatedAt: false,
                name: true,
                email: true,
                password: true,
                phoneNumber: true,
                image: true,
                introduction: true,
                note: true,
                contentHTML: true,
                contentMarkdown: true,
                gender: { select: { id: true, name: true } },
                role: { select: { id: true, name: true } },
                position: { select: { id: true, name: true } },
                price: { select: { id: true, name: true } },
                payment: { select: { id: true, name: true } },
                specialty: { select: { id: true, name: true } },
                clinic: { select: { id: true, name: true, address: true } },
            }
        });

        if (data && data.image) {
            data.image = `data:image/jpeg;base64,${data.image.toString('base64')}`;
        }

        return data ? data : null;
    } catch (e) {
        return e;
    } finally {
        await prisma.$disconnect();
    }
};

export const updateDoctorService = async (data) => {
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

        const base64Image = data.image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Image, 'base64');

        const currentDoctor = await prisma.doctor.findFirst({
            where: {
                id: data.id,
            },
        });

        if (!currentDoctor) {
            return ("Unauthorized.");
        }

        await prisma.doctor.updateMany({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                password: data.password,
                email: data.email,
                genderId: data.gender,
                priceId: data.price,
                paymentId: data.payment,
                positionId: data.position,
                roleId: data.role,
                phoneNumber: data.phoneNumber,
                introduction: data.introduction,
                specialtyId: data.specialty,
                clinicId: data.clinic,
                note: data.note,
                image: imageBuffer,
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
            },
        });

        return ("Update doctor successful.");
    } catch (e) {
        console.error(e);
        return (e);
    } finally {
        await prisma.$disconnect();
    }
};

export const deleteDoctorService = async (id) => {
    if (!id) {
        return ("Missing parameter: Id");
    }
    try {
        await prisma.doctor.deleteMany({
            where: { id }
        })

        return ('Delete doctor successful.');
    } catch (e) {
        return (e)
    } finally {
        await prisma.$disconnect()
    }
};

export const createScheduleService = async (data) => {
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

        const schedulesToCreate = [];
        const schedulesToDelete = [];

        for (const time of data.times) {
            const existingSchedule = await prisma.schedule.findFirst({
                where: {
                    doctorId: data.doctorId,
                    date: data.date,
                    timeId: time.value,
                },
            });


            if (time.isSelected) {
                if (!existingSchedule) {
                    schedulesToCreate.push({
                        doctorId: data.doctorId,
                        date: data.date,
                        timeId: time.value,
                        isBooked: false,
                    });
                }
            } else {
                // Nếu isSelected là false và bản ghi tồn tại, thêm vào mảng xóa
                if (existingSchedule) {
                    schedulesToDelete.push({
                        doctorId: data.doctorId,
                        date: data.date,
                        timeId: time.value,
                    });
                }
            }
        }

        // Xóa các bản ghi
        if (schedulesToDelete.length > 0) {
            await prisma.schedule.deleteMany({
                where: {
                    doctorId: data.doctorId,
                    date: data.date,
                    timeId: {
                        in: schedulesToDelete.map(s => s.timeId),
                    },
                },
            });
        }

        // Tạo các bản ghi mới
        if (schedulesToCreate.length > 0) {
            await prisma.schedule.createMany({
                data: schedulesToCreate,
            });
        }

        return ('Create/delete schedule successful.');
    } catch (error) {
        console.log(error);
        return (error);
    } finally {
        await prisma.$disconnect();
    }
};

export const getAllSchedulesByDateAndDoctorIdService = async (doctorId, date) => {
    try {

        console.log({ doctorId, date })
        if (doctorId && date) {
            const data = await prisma.schedule.findMany({
                where: {
                    doctorId: doctorId,
                    date: date,
                },
                select: {
                    id: true,
                    date: true,
                    time: { select: { id: true, name: true, ordinal: true, } },
                    doctor: { select: { id: true, name: true } },
                    isBooked: true,
                }
            });

            return data.length > 0 ? data : [];
        }

    } catch (error) {
        console.log(error);
        throw new Error("Error retrieving schedules.");
    } finally {
        await prisma.$disconnect();
    }
};