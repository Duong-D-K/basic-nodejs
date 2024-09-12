const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedGender() {
    await prisma.role.deleteMany()
    await prisma.status.deleteMany()
    await prisma.time.deleteMany()
    await prisma.position.deleteMany()
    await prisma.gender.deleteMany()
    await prisma.price.deleteMany()
    await prisma.payment.deleteMany()

    await prisma.role.createMany({
        data: [
            { name: "Doctor" },
            { name: "Patient" }
        ]
    })

    await prisma.status.createMany({
        data: [
            { name: "New" },
            { name: "Confirmed" },
            { name: "Done" },
            { name: "Cancel" },
        ]
    })

    await prisma.time.createMany({
        data: [
            { name: "8:00 AM - 9:00 AM", ordinal: 1 },
            { name: "9:00 AM - 10:00 AM", ordinal: 2 },
            { name: "10:00 AM - 11:00 AM", ordinal: 3 },
            { name: "11:00 AM - 0:00 PM", ordinal: 4 },
            { name: "1:00 PM - 2:00 PM", ordinal: 5 },
            { name: "2:00 PM - 3:00 PM", ordinal: 6 },
            { name: "3:00 PM - 4:00 PM", ordinal: 7 },
            { name: "4:00 PM - 5:00 PM", ordinal: 8 },
        ]
    })

    await prisma.position.createMany({
        data: [
            { name: "None" },
            { name: "Master" },
            { name: "Doctor" },
            { name: "Associate Professor" },
            { name: "Professor" },
        ]
    })

    await prisma.gender.createMany({
        data: [
            { name: "Male" },
            { name: "Female" },
            { name: "Other" },
        ]
    })

    await prisma.price.createMany({
        data: [
            { name: "10 USD" },
            { name: "15 USD" },
            { name: "20 USD" },
            { name: "25 USD" },
            { name: "30 USD" },
            { name: "35 USD" },
            { name: "40 USD" },
        ]
    });

    await prisma.payment.createMany({
        data: [
            { name: "Cash" },
            { name: "Credit card" },
            { name: "All payment method" },
        ]
    })

}

seedGender()
    .then(async () => {
        await prisma.$disconnect();
        console.log('Gender seeded successful.');
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });