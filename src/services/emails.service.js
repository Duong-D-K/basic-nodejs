import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sendBookingEmail = async data => {
    const doctor = await prisma.doctor.findFirst({
        where: {
            id: data.doctorId,
            roleId: 'fb46139a-84fd-4b1a-bdd8-060d16641502', //doctor
        },
        select: { id: true, name: true }
    })

    const time = await prisma.time.findFirst({
        where: { id: data.timeId },
        select: { id: true, name: true }
    })

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_APP_USERNAME,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    let mailOptions = {
        from: '"Yang Wei Qing" <s20113138@stu.edu.tw', // sender address,
        to: data.email,
        subject: "Appointment Confirmation Information",
        html:
            `
        <h3>Hello ${data.name}!</h3>
        <p>You are receiving this email because you have booked a medical appointment on the website!</p>
        <p>Appointment details:</p>
        <div>
            <p><b>Time: ${time?.name}</b></p>
            <p><b>Doctor: ${doctor?.name}</b></p>
        </div>

        
        <p>If the above information is correct, please click on the link below to complete the appointment booking process!</p>

        <div>
            <a href="${data.receivedRedirectLink}" target="_blank">Click Here</a>
        </div>
        <div>
            <p>Thank you very much!!!</p>
        </div>
        `
        ,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export const sendPrescription = async (data) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_APP_USERNAME,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        let mailOptions = {
            from: `"Yang Wei Qing" <s20113138@stu.edu.tw>`, // Đã sửa dấu ngoặc kép đóng
            to: data.email,
            subject: 'Confirm completion of medical examination and send prescription!',
            attachments: [{
                filename: `prescription-${data.patientName}-${new Date().getTime()}.jpg`,
                content: data.image.split("base64,")[1],
                encoding: 'base64',
            }],
            html: `
                <h3>Hello Mr/Mrs ${data.patientName}!</h3>
                <p>You are receiving this email because you have booked a medical appointment on the website!</p>
                <p>Thank you very much!!!</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                throw new Error('Failed to send email');
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (err) {
        console.error('Error in send prescription:', err);
    }
}