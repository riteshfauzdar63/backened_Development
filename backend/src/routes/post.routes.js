import { Router } from "express";
import { createPost, getallPosts } from "../controller/post.controller.js";


const router = Router();
// Define post routes here

router.route('/createPost').post(createPost);
router.route('/getPost').get(getallPosts);

export default router;