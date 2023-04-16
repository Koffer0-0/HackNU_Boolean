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
        const id = req.params.id;
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
            service: 'gmail',
            auth: {
                user: config.get('email'),
                pass: config.get('password')
            }
        })
        const mailOptions = {
            from: config.get('email'),
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
