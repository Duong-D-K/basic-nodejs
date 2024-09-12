import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export const loginService = async (data) => {
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

        const doctor = await prisma.doctor.findFirst({
            where: {
                email: data.email,
                password: data.password
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

        // const accessToken = jwt.sign({ id: doctor.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' });

        return (doctor);
    } catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }
};