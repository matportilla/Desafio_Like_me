import pool from "../../database/connection.js";

const getPosts = async () => {
    const sql = "SELECT id, titulo, img, descripcion FROM posts";

    try {
        const posts = await pool.query(sql);
        return posts.rows;
    } catch (error) {
        throw new Error(`Error al obtener las publicaciones: ${error.message}`);
    }
};

const createPost = async ({ titulo, img, descripcion }) => {
    const sql = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING id, titulo, img, descripcion";

    try {
        const result = await pool.query(sql, [titulo, img, descripcion]);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error al crear una publicación: ${error.message}`);
    }
};

export const postModel = { getPosts, createPost };
