import React, { useState } from 'react';
import { useUserAuth } from './firebasejs/UserAuthContext.jsx';
import { Link } from 'react-router-dom';
import JoinRoom from './Chat/joinroom.jsx';
function Home({showChat}) {
    const {user}= useUserAuth() ;
    const date = new Date();
    let timeOfDay = '';
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[date.getDay()];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let time = date.getHours();

    if (time >= 5 && time < 12) {
        timeOfDay = 'Morning';
    } else if (time >= 12 && time < 17) {
        timeOfDay = 'Afternoon';
    } else if (time >= 17 && time < 20) {
        timeOfDay = 'Evening';
    } else {
        timeOfDay = 'Night';
    }
    return (
        <>
            
            <div className='Content'>
                <p><span>Good {timeOfDay}</span>, {user?.displayName || user?.email || "Guest"}</p>
                <br />
                <p>{day}, {month}, {year}</p>
                <div className='Options_container'>
                    <div className='Options'>
                    <div ><Link to='/cdt'>cdts</Link></div>
                        <div >Option 2</div>
                        <div >Option 3</div>
                        <div >Option 4</div>
                        <div >Option 5</div>
                    </div>
                </div>
                
            </div>
            {showChat && <div className='chat'>{<JoinRoom></JoinRoom>}</div>}
        </>
    );
}

export default Home;