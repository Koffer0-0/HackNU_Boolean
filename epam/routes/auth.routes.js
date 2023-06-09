import {Router} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import {check, validationResult} from 'express-validator'
import {Client} from "../models/Client.js";
import {Operator} from "../models/Operator.js";
import {Specialist} from "../models/Specialist.js";
import {decodeToken} from "../helpers/decodeToken.js";
import {findUserByEmail} from "../helpers/findUserByEmail.js";
// import supabase from "../supabase.js";

const router = Router()
router.post(
    '/login',
    [
        check('email', 'Please, enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to login',
                });
            }

            const { email, password } = req.body;

            const result = await findUserByEmail(email);
            if (!result) {
                return res.status(400).json({ message: 'User not found' });
            }

            const { user, role } = result;

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password. Try again.' });
            }

            const responseData = {
                id: user.id,
                email: user.email,
                role,
            };

            const token = jwt.sign(responseData, config.get('jwtSecret'), { expiresIn: '1h' });
            res.json({ data: token });
        } catch (e) {
            res.status(500).json({ message: `Error in auth.routes. ${e.message}` });
        }
    }
);

// /api/auth/signup
router.post(
    '/client/signup',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal length should be 6').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to register'
                })
            }

            const {email, password, company_address, phone_number, company_name} = req.body

            const candidate = await Client.findOne({email})
            if (candidate) {
                return res.status(400).json('Client with this email already exists.')
            }

            // Additional checks
            const operatorCandidate = await Operator.findOne({ email });
            if (operatorCandidate) {
                return res.status(400).json('Email already exists in Operator.');
            }
            const specialistCandidate = await Specialist.findOne({ email });
            if (specialistCandidate) {
                return res.status(400).json('Email already exists in Specialist.');
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new Client({email, password: hashedPassword, company_name, company_address, phone_number})

            const savedUser = await user.save()

            res.status(201).json({message: 'Client created.'})
        } catch (e) {
            res.status(500).json({message: 'Error in auth.routes'})
        }
    }
)

// /api/auth/signin
router.post(
    '/client/signin',
    [
        check('email', 'Please, enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to login'
                })
            }
            const {email, password } = req.body
            const client = await Client.findOne({email})
            if (!client)
                return res.status(400).json({message: 'Client do not found'})

            const isMatch = await bcrypt.compare(password, client.password)
            if (!isMatch)
                return res.status(400).json({message: 'Incorrect password. Try again.'})

            const responseData = {
                id: client.id,
                email: client.email,
                role: 'client',
            }

            const token = jwt.sign(responseData, config.get('jwtSecret'), {expiresIn: '1h'})
            res.json({data: token})
        } catch (e) {
            res.status(500).json({message: `Error in auth.routes. ${e.message}`})
        }
    }
)

// /api/auth/operator/signup
router.post(
    '/operator/signup',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal length should be 6').isLength({min: 6}),
        check('first_name', 'Minimal length should be 2').isLength({min: 2}),
        check('second_name', 'Minimal length should be 2').isLength({min: 2})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to register'
                })
            }

            const {email, password, first_name, second_name, phone_number, } = req.body

            const candidate = await Operator.findOne({email})
            if (candidate) {
                return res.status(400).json('Operator with this email already exists.')
            }

            // Additional checks
            const clientCandidate = await Client.findOne({ email });
            if (clientCandidate) {
                return res.status(400).json('Email already exists in Client.');
            }
            const specialistCandidate = await Specialist.findOne({ email });
            if (specialistCandidate) {
                return res.status(400).json('Email already exists in Specialist.');
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const operator = new Operator({email, password: hashedPassword, first_name, second_name, phone_number })

            const savedOperator = await operator.save()

            res.status(201).json({message: 'Operator created.'})
        } catch (e) {
            res.status(500).json({message: 'Error in auth.routes'})
        }
    }
)

// /api/auth/operator/signin
router.post(
    '/operator/signin',
    [
        check('email', 'Please, enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to login'
                })
            }
            const {email, password} = req.body

            const operator = await Operator.findOne({email})

            if (!operator)
                return res.status(400).json({message: 'Operator do not found'})

            const isMatch = await bcrypt.compare(password, operator.password)
            if (!isMatch)
                return res.status(400).json({message: 'Incorrect password. Try again.'})

            const responseData = {
                id: operator.id,
            }
            const token = jwt.sign(responseData, config.get('jwtSecret'), {expiresIn: '1h'})

            res.json({token})
        } catch (e) {
            res.status(500).json({message: `Error in auth.routes. ${e.message}`})
        }
    }
)

// /api/auth/specialist/signup
router.post(
    '/specialist/signup',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal length should be 6').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to register'
                })
            }

            const {email, password} = req.body

            const candidate = await Specialist.findOne({email})
            if (candidate) {
                return res.status(400).json('Specialist with this email already exists.')
            }

            // Additional checks
            const clientCandidate = await Client.findOne({ email });
            if (clientCandidate) {
                return res.status(400).json('Email already exists in Client.');
            }
            const operatorCandidate = await Operator.findOne({ email });
            if (operatorCandidate) {
                return res.status(400).json('Email already exists in Operator.');
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const spec = new Specialist({email, password: hashedPassword })

            const savedUser = await spec.save()

            res.status(201).json({message: 'specialist created.'})
        } catch (e) {
            res.status(500).json({message: 'Error in auth.routes'})
        }
    }
)

// /api/auth/specialist/signin
router.post(
    '/specialist/signin',
    [
        check('email', 'Please, enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data to login'
                })
            }
            const {email, password} = req.body

            const spec = await Client.findOne({email})

            if (!spec)
                return res.status(400).json({message: 'specialist do not found'})

            const isMatch = await bcrypt.compare(password, spec.password)
            if (!isMatch)
                return res.status(400).json({message: 'Incorrect password. Try again.'})

            const responseData = {
                id: spec.id,
            }
            const token = jwt.sign(responseData, config.get('jwtSecret'), {expiresIn: '1h'})

            res.json({token})
        } catch (e) {
            res.status(500).json({message: `Error in auth.routes. ${e.message}`})
        }
    }
)
export const authRouter = router