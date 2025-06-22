import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import userRouter from './routes/userRoute';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRouter);

const main = async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected!!');

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}

main();