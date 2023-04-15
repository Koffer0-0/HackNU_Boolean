import {Router} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import {check, validationResult} from 'express-validator'
import {Client} from "../models/Client.js";
import {Operator} from "../models/Operator.js";
import {Specialist} from "../models/Specialist.js";
import {Request} from "../models/Request.js";
import {Group} from "../models/Group.js";
// import supabase from "../supabase.js";

const router = Router()

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
            console.log({candidate})
            if (candidate) {
                return res.status(400).json('Client with this email already exists.')
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
            console.log({candidate})
            if (candidate) {
                return res.status(400).json('Operator with this email already exists.')
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
            console.log({candidate})
            if (candidate) {
                return res.status(400).json('specialist with this email already exists.')
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
router.post('/create/groups', async (req, res) => {
    try {
        const { name, specialists } = req.body;
        const group = new Group({ name, specialists });
        const savedGroup = await group.save();
        res.status(201).json(savedGroup);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating group' });
    }
});

// Get all specialists
router.get('/specialists', async (req, res) => {
    try {
        const specialists = await Specialist.find();
        res.status(200).json(specialists);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting specialists' });
    }
});

// Get all operators
router.get('/operators', async (req, res) => {
    try {
        const operators = await Operator.find();
        res.status(200).json(operators);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting operators' });
    }
});

// Get all clients
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json({data: clients});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting clients' });
    }
});

// Get all requests
router.get('/requests', async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting requests' });
    }
});

// Get all specialist groups
router.get('/groups', async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error getting groups' });
    }
});
export const authRouter = router