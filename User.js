import React, { useState } from 'react';
import { auth } from './fire';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const User = () => {
    const [usera, setusera] = useState({ name: "", email: "" });
    const { email, name } = usera;

    const changeHandler = e => {
        setusera({ ...usera, [e.target.name]: e.target.value });
    };

    const signUp = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, name)
            .then(userCredential => {
                // Signed in 
                console.log(userCredential.user);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const signIn = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, name)
            .then(userCredential => {
                // Signed in
                console.log(userCredential.user);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <center>
                <form autoComplete='off'>
                    <h1>Login Page</h1>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        placeholder='UserName'
                        onChange={changeHandler}
                    /><br />
                    <input
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={changeHandler}
                    /><br />
                    <button onClick={signIn}>Login</button><br />
                    <button onClick={signUp}>Sign Up</button>
                </form>
            </center>
        </div>
    );
};

export default User;
