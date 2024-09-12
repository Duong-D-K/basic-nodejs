import { PrismaClient } from '@prisma/client';
import { Buffer } from 'buffer';

const prisma = new PrismaClient();

export const createSpecialtyService = async (data) => {
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
            const base64Image = data.image.replace(/^data:image\/\w+;base64,/, '');

            imageBuffer = Buffer.from(base64Image, 'base64');
        }

        await prisma.specialty.create({
            data: {
                name: data.name,
                image: imageBuffer || '',
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
            },
        });

        return ('Specialty added successful.')
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
};

export const getAllSpecialtiesService = async () => {
    try {
        const data = await prisma.specialty.findMany({
            select: {
                id: true,
                createdAt: false,
                updatedAt: false,

                name: true,
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

export const getSpecialtyByIdService = async (id) => {
    if (!id) {
        return ("Missing parameter: Id");
    }
    try {
        const data = await prisma.specialty.findFirst({
            where: { id: id },
            select: {
                name: true,
                image: true,
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

export const updateSpecialtyService = async (data) => {
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

        const currentSpecialty = await prisma.specialty.findFirst({
            where: {
                id: data.id,
            },
        });

        if (!currentSpecialty) {
            return ("Unauthorized.");
        }

        await prisma.specialty.updateMany({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                image: imageBuffer,
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
            },
        });

        return ("Update specialty successful.");

    } catch (e) {
        console.error(e);
        return (e);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteSpecialtyService = async (id) => {
    if (!id) {
        return ("Missing parameter: Id");
    }
    try {
        await prisma.specialty.deleteMany({
            where: { id }
        })

        return ('Delete specialty successful.');
    } catch (e) {
        return (e)
    } finally {
        await prisma.$disconnect()
    }
}