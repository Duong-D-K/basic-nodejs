import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllRolesService = async () => {
    try {
        const data = await prisma.role.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return (data?.length > 0 ? data : []);
    } catch (e) {
        return (e);
    } finally {
        await prisma.$disconnect();
    }
};

export const getAllStatusesService = async () => {
    try {
        const data = await prisma.status.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return (data?.length > 0 ? data : []);
    } catch (e) {
        return (e);
    } finally {
        await prisma.$disconnect()
    }

};

export const getAllTimesService = async () => {
    try {
        const data = await prisma.time.findMany({
            select: {
                id: true,
                name: true,
                ordinal: true,
            }
        })

        return (data?.length > 0 ? data : []);
    } catch (e) {
        return (e)
    } finally {
        await prisma.$disconnect()
    }
};

export const getAllPositionService = async () => {
    try {
        const data = await prisma.position.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return (data?.length > 0 ? data : []);
    } catch (e) {
        return (e)
    } finally {
        await prisma.$disconnect()
    }
};

export const getAllGendersService = async () => {
    try {
        const data = await prisma.gender.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return (data?.length > 0 ? data : []);
    } catch (e) {
        return (e)
    } finally {
        await prisma.$disconnect()
    }
};

export const getAllPricesService = async () => {
    try {
        const data = await prisma.price.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return (data?.length > 0 ? data : []);
    } catch (e) {
        return (e)
    } finally {
        await prisma.$disconnect()
    }
};

export const getAllPaymentsService = async () => {
    try {
        const data = await prisma.payment.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return (data?.length > 0 ? data : []);
    } catch (e) {
        return (e)
    } finally {
        await prisma.$disconnect()
    }
};