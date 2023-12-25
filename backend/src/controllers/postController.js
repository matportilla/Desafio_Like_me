import { postModel } from '../models/postModel.js';

const getPosts = async (req, res) => {
    try {
        const posts = await postModel.getPosts();
        console.log("OK:", posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Error fetching posts", details: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const post = req.body;

        // Verifica la existencia de campos obligatorios
        const requiredFields = ['titulo', 'url', 'descripcion'];
        const missingFields = requiredFields.filter(field => !post[field]);

        if (missingFields.length > 0) {
            console.error("Error: Missing required fields -", missingFields.join(', '));
            res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
            return;
        }

        const newPost = await postModel.createPost(post);
        console.log("OK: Post created -", newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Error creating post", details: error.message });
    }
};

export { getPosts, createPost };
