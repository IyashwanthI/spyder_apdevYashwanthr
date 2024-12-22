import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useUserAuth } from "../firebasejs/UserAuthContext.jsx";

function Signup() {
    const { signup } = useUserAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await signup(email, password);
            setError("");
            navigate("/signin");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login_signup">
            <div className='login_container'>
            <form className="login" onSubmit={handleSubmit}>
               
                {error && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                        {error}
                    </div>
                )}

                <label>Email</label>
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <br />
                
                <label>Password</label>
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <br />
                
                <label>Confirm Password</label>
                <br />
                <input
                    type="password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                />
                <br />
                <br />

                <button className="signin_btn" type="submit">
                    Sign up
                </button>
                <br />
                <br />
                          
            </form>
            <p>
                Have an account?{" "}
                <Link to="/signin">
                    Sign in
                </Link>
            </p>
            <br/>
            <Link to="/">
                Back to Home?
            </Link>
            </div>
        </div>
    );
}

export default Signup;
