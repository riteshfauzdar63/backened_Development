import {User} from "../Models/user.model.js";

const registerUser = async(req, res) => {
    try {
        const {username, password, email} = req.body;

        // basic validation
        if(!username || !password || !email){
            return res.status(400).json({message: "All Fields are required"})
        }

        // check if user already exists
        const existingUser = await User.findOne({ email:email.toLowercase() });
        if(existingUser){
            return res.status(409).json({message: "user already exists!"});
        }

        // create new user
        const user = await User.create({
            username,
            email:email.toLowercase(),
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
}

export {registerUser};