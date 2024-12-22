import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./chatpage";
import { useUserAuth } from "../firebasejs/UserAuthContext";
import './chatindex.css'
const socket = io.connect("http://localhost:3000");

function ChatRoom() {
    const user = useUserAuth();  
    const [room, setRoom] = useState('');
    const [username, setUsername] = useState('');
    const [showchat,setshowcat]=useState();
    
    let displayname= user?.displayName || user?.email || "Guest";
    const JoinRoom = () => {
        console.log("Username before emit:", username);  
        console.log("Room before emit:", room);          
        if (username && room) {
            socket.emit('joinRoom', { username, room,displayname });
            setshowcat(true)
        } else {
            console.log("Please enter both a username and a room");
        }
    };

    return (
        <>
            <div className="ChatHome">
                
                {!showchat ?(
                    <>
                <h3>Join a chat </h3>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(event) => setUsername(event.target.value)} 
                />
                <input 
                    type="text" 
                    id="roomid" 
                    placeholder="supportpage=1" 
                    value={room}
                    onChange={(event) => setRoom(event.target.value)} 
                />
                <button onClick={JoinRoom}>Join a room</button>
                </>
    ):(
                <Chat socket={socket} room={room} username={username} exit={() => setshowcat(false)}/>
            )}
            </div>
        </>
    );
}

export default ChatRoom;
