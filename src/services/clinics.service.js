import { PrismaClient } from '@prisma/client';
import { Buffer } from 'buffer';

const prisma = new PrismaClient();

export const createClinicService = async (data) => {
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

        let imageBuffer = '';

        if (data.image) {
            const base64Image = data.image.replace(/^data:image\/\w+;base64,/, '');

            imageBuffer = Buffer.from(base64Image, 'base64');
        }

        await prisma.clinic.create({
            data: {
                name: data.name,
                address: data.address,
                image: imageBuffer || '',
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
            },
        });

        return ('Clinic added successful.')
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
};

export const getAllClinicsService = async () => {
    try {
        const data = await prisma.clinic.findMany({
            select: {
                id: true,
                createdAt: false,
                updatedAt: false,

                name: true,
                address: true,
                image: true,
                contentHTML: true,
                contentMarkdown: true,
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

export const getClinicByIdService = async (id) => {
    if (!id) {
        return ("Missing parameter: Id");
    }
    try {
        const data = await prisma.clinic.findFirst({
            where: { id: id },
            select: {
                name: true,
                image: true,
                address: true,
                contentHTML: true,
                contentMarkdown: true,
                doctors: {
                    where: { roleId: 'fb46139a-84fd-4b1a-bdd8-060d16641502' }, //doctor
                    select: {
                        id: true,
                        createdAt: false,
                        updatedAt: false,
                        name: true,
                        email: true,
                        password: false,
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
                    }
                },
            }
        });

        if (data?.image) {
            data.image = `data:image/jpeg;base64,${data.image.toString('base64')}`;
        }

        data.doctors.map(item => {
            if (item?.image) {
                item.image = item.image.toString('base64');
                item.image = `data:image/jpeg;base64,${item.image}`;
            }
        });

        return data ? data : null;
    } catch (e) {
        return e;
    } finally {
        await prisma.$disconnect();
    }
};


export const updateClinicService = async (data) => {
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

        console.log(data);

        const base64Image = data.image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Image, 'base64');

        const currentClinic = await prisma.clinic.findFirst({
            where: {
                id: data.id,
            },
        });

        if (!currentClinic) {
            return ("Unauthorized.");
        }

        await prisma.clinic.updateMany({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                address: data.address,
                image: imageBuffer,
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
            },
        });

        return ("Update clinic successful.");

    } catch (e) {
        console.error(e);
        return (e);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteClinicService = async (id) => {
    if (!id) {
        return ("Missing parameter: Id");
    }
    try {
        await prisma.clinic.deleteMany({
            where: { id }
        })

        return ('Delete clinic successful.');
    } catch (e) {
        return (e)
    } finally {
        await prisma.$disconnect()
    }
}