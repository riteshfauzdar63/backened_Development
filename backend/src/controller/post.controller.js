import { Post } from "../models/post.model.js";

// create a new post
const createPost = async (req, res) => {
    try{
        const {name, description, age} = req.body;

        // basic validation
        if(!name || !description || !age){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const post = await Post.create({
            name,
            description,
            age,
        });

        res.status(201).json({
            message: "post created successfully", post
        });
    }
    catch(error){
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }


}

// get all posts

const getallPosts = async (req, res) => {
    try {
         const posts = await Post.find();
         res.status(200).json({posts});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}

// upadate post

const updatePost = async (req, res) => {
    try {
         
    } catch (error) {
        
    }
}

export {
    createPost,
    getallPosts
};