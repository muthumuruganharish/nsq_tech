const User = require("../Model/User");

const bcrypt = require("bcrypt");

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        console.log(req.body);

        const user = await User.findOne({
            email
        });

        console.log(user);

        if (!user) {

            return res.status(401).json({
                message: "Invalid Credentials"
            });

        }

        const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Credentials"
            });

        }

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = { login };