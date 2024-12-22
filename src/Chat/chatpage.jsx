import React, { useEffect, useState } from "react";
import './chatindex.css';

function Chat({ socket, username, room ,exit}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await fetch(`http://localhost:5000/chat/history/${room}`);
                const data = await response.json();
                const formattedData = data.map((item) => ({
                    username: item.user,         
                    currentmessage: item.message, 
                    time: item.timestamp         
                }));
    
                setMessages(formattedData); 
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };
    
        fetchChatHistory();
    }, [room]);
    useEffect(() => {
        const messageListener = (data) => {
            console.log("Received message:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        socket.on('receive_message', messageListener);

        return () => {
            socket.off('receive_message', messageListener); 
        };
    }, [socket]);
    useEffect(()=>{
        socket.emit('leaveRoom',(room,username));
        exit;
    },[roomexit])
    const sendMessage = async () => {
        if (message.trim() !== '') {
            const messageData = {
                room: room,
                username: username,
                currentmessage: message,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            };
            await socket.emit('sendMessage', messageData);
            setMessage('');
        }
    };
    const handleExit = () => {
        socket.emit('leaveRoom', { room, username });
        exit();
    };
    return (
        <div>
            <div className="chatheader">
                <p>Live Chat</p>
            </div>
            <div className="chatbody">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.username}:</strong> {msg.currentmessage} <em>{msg.time || ''}</em>
                    </div>
                ))}
            </div>
            <div className="chatfooter">
                <input
                    type="text"
                    placeholder="Type here"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button onClick={sendMessage}>&#9658;</button>
                <button onClick={handleExit}>exit</button>
            </div>
        </div>
    );
}

export default Chat;
