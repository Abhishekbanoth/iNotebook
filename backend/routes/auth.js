const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary
const { body, validationResult } = require('express-validator');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser');

const JWT_SECRET='Abhiisagoodb$oy';

// ROUTE 1: Create a user using POST "/api/auth". Doesn't require auth
router.post(
    '/createuser',
    [
        body('name', 'Enter a valid Name').isLength({ min: 3 }),
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Enter a valid Password').isLength({ min: 5 })
    ],
    async (req, res) => {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if the user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: 'User already exists' });
            }
            
            // securing password using bcrypt function to hash the password
            const salt=await bcrypt.genSalt(10);
            const secPass=await bcrypt.hash(password,salt);

            // Create a new user
            user = new User({ name, email, password:secPass });
            await user.save();

            // Respond with the created user
            const data={
                user:{
                    id:user.id
                }
            }
            // used to create a token so that users data is not verified whenever they login but only the auth token is vefified
            const authToken=jwt.sign(data,JWT_SECRET);

            // res.status(201).json(user);
            res.json(authToken);

        } catch (error) {
            // Handle errors during user creation
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);


//ROUTE 2: Authenticate the user using :POST "/api/auth/login" , no login required
router.post(
    '/login',
    [
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'paswword cannot be blank').exists()
    ],
    async (req, res) => {
         // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if the user already exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Enter valid credentials ' }] });
            }

            const passwordCompare=await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({ errors: 'Enter valid credentials ' });
            }      
            
            const data={
                user:{
                    id:user.id
                }
            }
            // used to create a token so that users data is not verified whenever they login but only the auth token is vefified
            const authToken=jwt.sign(data,JWT_SECRET);

            // res.status(201).json(user);
            res.json(authToken);

        }catch (error) {
            // Handle errors during user creation
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
)

//ROUTE 3: Get logged in user Details using :POST "/api/auth/getuser" ,Login required
router.post('/getuser', fetchUser,async (req, res) => {
        
try {
    UserId=req.user.id;
    const user = await User.findById(UserId).select("-password")
    res.send(user)
} catch (error) {
    // Handle errors during user creation
    console.error(error.message);
    res.status(500).send('Server Error');
}
    }
)
module.exports = router;
