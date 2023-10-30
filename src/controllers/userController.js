const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();


exports.CreateUser = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        if (!fname || !lname || !email || !password) {
            return res.status(400).json({ status: false, message: "Please enter all fields" });
        }

        const check_user = await User.findOne({ email });

        if (check_user) {
            return res.status(400).json({ status: false, message: 'email already exists' });
        }

   

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fname,
            lname,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ status: true, message: "User account created",data: newUser  });

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}





exports.userLogin = async (req, res) => {
    try {
        const requestBody = req.body;

        if (!requestBody) {
            return res.status(400).send({ status: false, message: 'Data in request body is mandatory' });
        }

        const { email, password } = requestBody;

        if (!email) {
            return res.status(400).send({ status: false, message: 'Please provide an email' });
        }

        if (!password) {
            return res.status(400).send({ status: false, message: 'Please provide a password' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ status: false, message: 'No user found - invalid user' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send({ status: false, password_message: 'Invalid password' });
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
            },
            process.env.TOKEN_KEY,
            { expiresIn: '60min' }
        );

        const userId = user._id;
        return res.send({ status: true, message: 'Success', data: { userId, token } });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
