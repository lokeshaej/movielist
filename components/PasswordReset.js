import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { confirmPasswordReset, sendPasswordResetEmail, updatePassword } from 'firebase/auth';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [isResetting, setIsResetting] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    try {
      setIsResetting(true);
      await sendPasswordResetEmail(auth, email);
      setResetRequested(true);
      setError(null);
    } catch (error) {
      console.error('Error sending reset email:', error);
      setError('Failed to send reset email. Please check your email address and try again.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleConfirmPasswordReset = async () => {
    try {
      setIsResetting(true);
      const actionCode = window.location.href.split('oobCode=')[1];
      await confirmPasswordReset(auth, actionCode, newPassword);
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      alert('Password reset successful. You can now login with your new password.');
      navigate('/signin');
    } catch (error) {
      console.error('Error confirming password reset:', error);
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      {!resetRequested ? (
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handlePasswordReset} disabled={isResetting}>
            {isResetting ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      ) : (
        <div>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required />
          <button onClick={handleConfirmPasswordReset} disabled={isResetting}>
            {isResetting ? 'Resetting...' : 'Confirm Password Reset'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default PasswordReset;
