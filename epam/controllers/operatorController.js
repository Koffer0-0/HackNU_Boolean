import {Operator} from "../models/Operator.js";
import nodemailer from "nodemailer";
import config from 'config';
import bcrypt from 'bcryptjs';
import {Specialist} from "../models/Specialist.js";

export async function getAllOperators(req, res) {
    try {
        const operators = await Operator.find();
        res.status(200).json({ data: operators});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting operators' });
    }
}

export async function getOperator(req, res) {
    try {
        const operatorId = req.params.id;
        const operator = await Operator.findById(operatorId);
        res.status(200).json({ data: operator});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting operators' });
    }
}

// 12) Obtain a list of all the operator's closed applications
export async function getOperatorClosedApplications(req, res) {
    try {
        const operatorId = req.params.operatorId;
        const requests = await Request.find({ operator: operatorId, status: 'completed' });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 13) Obtain a list of all active operator's requests
export async function getOperatorActiveRequests(req, res) {
    try {
        const operatorId = req.params.operatorId;
        const requests = await Request.find({ operator: operatorId, status: 'active' });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// email sender/verification
export async function createOperator(req, res) {
    try {
        const { email, first_name, second_name } = req.body;
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(password, 12);
        const operator = new Operator({ email, password: hashedPassword, first_name, second_name });
        const savedOperator = await operator.save();

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

        res.status(200).json({data: savedOperator});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating specialist' });
    }
}

