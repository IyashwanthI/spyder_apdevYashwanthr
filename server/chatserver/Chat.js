import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    room: String,
    user: String,
    message: String,
    timestamp:String,
});

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;