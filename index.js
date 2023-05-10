// Importing required modules
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importing different routes
import userRoutes from './routes/User.js';
import newContactRoutes from './routes/Newcontact.js';


// Setting up the express object
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Specifying routes for different models
app.use('/user', userRoutes )
app.use('/newContact', newContactRoutes )


// Default page for the server-side application
app.get('/', (req, res) => {
    res.send('Welcome to Address Mapper!');
});

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));
