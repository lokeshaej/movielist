// SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Updated import statement
import { auth } from '../firebase'; // Assuming you have the Firebase instance initialized in firebase.js
import './signin.css'; // Import the CSS file

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const firebaseAuth = getAuth(); // Get the Firebase authentication instance

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Attempt to sign in using signInWithEmailAndPassword function
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      // If successful, navigate to the home page
      navigate('/home');
    } catch (error) {
      // If sign-in fails, display the specific error message
      console.error('Error during sign-in:', error);
      setError(error.message);
    }
  };

  const handleForgotPassword = () => {
    // Redirect to password reset page
    navigate('/reset-password');
  };

  const handleSignUp = () => {
    // Redirect to sign up page
    navigate('/signup');
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
        <h3>New User? Click Here !</h3>
      </form>
      {error && <p className="error-message">{error}</p>}
      
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignIn;
