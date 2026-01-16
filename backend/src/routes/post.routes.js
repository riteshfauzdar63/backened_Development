import { Router } from "express";
import { createPost, deletePost, getallPosts, updatePost } from "../controller/post.controller.js";


const router = Router();
// Define post routes here

router.route('/createPost').post(createPost);
router.route('/getPost').get(getallPosts);
router.route('/updatePost/:id').patch(updatePost);
router.route('/deletePost/:id').delete(deletePost);

export default router;