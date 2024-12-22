import React, { useState, useEffect } from "react";
import { useUserAuth } from "../firebasejs/UserAuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import google from '../assets/icons8-google.svg';
import './up.css';

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signin, google_signin, user } = useUserAuth();

    useEffect(() => {
        if (user) {
            navigate('/'); 
        }
    }, [user, navigate]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signin(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await google_signin();
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='login_signup'>
            <div className='login_container'>
                <form className='login' onSubmit={handleSignIn}>
                    {error && (
                        <div style={{ color: "red", marginBottom: "10px" }}>
                            {error}
                        </div>
                    )}
                    <label>Email</label>
                    <br />
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                    />
                    <br /><br />
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                    />
                    <br /><br />
                    <button className='signin_btn' type="submit">Sign in</button>
                    <br /><br />
                    <div className="or_container">
                        <p>OR</p>
                    </div>
                    <div className="google_container">
                        <button className="google_button" onClick={handleGoogleSignIn}>
                            <img src={google} loading="lazy" alt="google logo" />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </form>
                <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                <br />
                <Link to='/'>Back to Home?</Link>
            </div>
        </div>
    );
}

export default SignIn;
