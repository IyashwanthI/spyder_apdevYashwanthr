import reactLogo from '../assets/web-programming.png';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useUserAuth } from '../firebasejs/UserAuthContext';
function Nav({ onChatToggle }){
    const {logout} =useUserAuth();
    const handleLogout= async()=>{
        try{
             await logout();
        }
        catch (err){
            console.log(err.message)
        }
    }
    return(
        <div className="Nav" >
            <div className='logo'>
                <img src={reactLogo}></img>
                <p>Workspace</p>
            </div>
            <input type="text" placeholder='  Search'></input>
            <div className='Header'>
            <p><Link to="/signin"><div className='Nav-login-signup link'>Login</div></Link></p>
            <p style={{ color: "white", fontSize: "20px" }}>/</p>
            <p><Link to="/signup"><div className='Nav-login-signup link'>register</div></Link> </p>
            <p className='Nav-login-signup link' onClick={handleLogout}>Logout</p>           
            <div className='Nav-chat link' onClick={onChatToggle}>&#128172;</div>
            </div> 
        </div>
    );
}

export default Nav;