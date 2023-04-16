import {Specialist} from "../models/Specialist.js";
import nodemailer from 'nodemailer';
import config from "config";
import bcrypt from "bcryptjs";

export async function getAllSpecialists(req, res) {
    try {
        const specialists = await Specialist.find();
        res.status(200).json({data: specialists});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting specialists' });
    }
}

export async function getSpecialist(req, res) {
    try {
        const id = req.params;
        const specialist = await Specialist.findById(id);
        res.status(200).json({data: specialist});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting specialists' });
    }
}

export async function createSpecialist(req, res) {
    try {
        const { email, phone_number, company_name, company_address } = req.body;
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(password, 12);
        const specialist = new Specialist({ email, password: hashedPassword, phone_number, company_name, company_address });
        const savedSpecialist = await specialist.save();

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465 ,
            secure: true,
            auth: {
                user: 'koffer0_0@mail.ru', // replace with your ProtonMail email address
                pass: 'a0szFRxzmvvzwtnfgKK3' // replace with your ProtonMail password or application-specific password
            },
            tls: {
                ciphers:'SSLv3'
            }
        });
        const mailOptions = {
            from: 'koffer0_0@mail.ru',
            to: email,
            subject: 'Now you can visit our website',
            text: 'Login: ' + email + ' Password: ' + password
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({data: savedSpecialist});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating specialist' });
    }
}
