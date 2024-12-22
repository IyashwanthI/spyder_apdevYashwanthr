import express from 'express';
import cors from 'cors';  
import Chat from './Chat.js';  
import { connectDB } from "../mongobackend/mongo.js";
const app = express();
app.use(cors());
(async () => {
    await connectDB(); 
})();
app.get('/chat/history/:room', async (req, res) => {
    const { room } = req.params;

    try {
        const messages = await Chat.find({ room }).sort({ time: 1 });  
        res.json(messages);
        console.log(messages)
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching chat history');
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});