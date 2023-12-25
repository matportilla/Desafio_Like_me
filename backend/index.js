import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", postRoutes);

app.listen(PORT, console.log(`Server running on port ${PORT}...`));


