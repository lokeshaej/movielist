import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './signUp.css'; // Import CSS file

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      
      setIsSigningUp(true);
      alert("Sign up successful!");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
      });

      setSuccess(true);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email address is already in use. Please use a different email.');
      } else {
        setError('Error during sign-up: ' + error.message);
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  useEffect(() => {
    if (success) {
      alert("Sign up successful!");
      navigate('/signin');
    }
  }, [success, navigate]);

  const handleLoginRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="container">
      <h1 className="title">Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Username:</label>
          <input
            className="input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Email:</label>
          <input
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password:</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Confirm Password:</label>
          <input
            className="input-field"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button className="button" type="submit" disabled={isSigningUp}>
          {isSigningUp ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      {isSigningUp && <p>Successfully account created</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="button" onClick={handleLoginRedirect}>
        Login
      </button>
    </div>
  );
}

export default SignUp;
