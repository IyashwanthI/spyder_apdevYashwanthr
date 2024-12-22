import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "../mongobackend/mongo.js";
import Chat from "./Chat.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        method: ['GET', 'POST'],
    },
});

const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB(); 
})();

io.on("connection", (socket) => {
    console.log("A user connected " + socket.id);

    socket.on("joinRoom", (data) => {
        const { user, room, displayname } = data;
        socket.join(room);
        console.log(`User ${user} (${displayname}) joined room ${room}`);
        io.to(room).emit("message", { user: "System", message: `${user} joined the room` });
    });

    socket.on("sendMessage", async (data) => {
        const { room, username, currentmessage, time } = data;
        try {
            const chatMessage = new Chat({
                room:room,
                user: username,
                message: currentmessage,
                timestamp: time,
            });
            await chatMessage.save();
            console.log("Message saved to DB");
        } catch (error) {
            console.error("Error saving message:", error);
        }
        console.log("Received message:", data);
        io.to(room).emit('receive_message', data);
    });

    socket.on("leaveRoom", ({ room, user }) => {
        socket.leave(room);
        io.to(room).emit("message", { user: "System", message: `${user} left the room` });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected " + socket.id);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
