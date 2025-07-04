import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import userRouter from './routes/userRoute';
import contentRouter from './routes/contentRoute';
import shareRouter from './routes/shareRoute';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/brain', shareRouter)

const main = async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected!!');

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}

main();