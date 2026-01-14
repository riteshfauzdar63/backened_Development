import {User} from "../models/user.model.js";

const registerUser = async(req, res) => {
    try {
        const {username, password, email} = req.body;

        // basic validation
        if(!username || !password || !email){
            return res.status(400).json({message: "All Fields are required"})
        }

        // check if user already exists
        const existingUser = await User.findOne({ email:email.toLowerCase() });
        if(existingUser){
            return res.status(409).json({message: "user already exists!"});
        }

        // create new user
        const user = await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registration successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })

    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
};

const loginUser = async(req,res) => {
    try {
        // checking if user already exists
        const { email, password} = req.body;

        const user = await User.findOne({ email:email.toLowerCase() }).select('+password');;

        if(!user) return res.status(400).json({message: "User not found"});
        

        // comparing password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) return res.status(401).json({message: "Invalid password"});
        

        res.status(200).json({
            message: "login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            }
        })
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}

export {registerUser, loginUser};