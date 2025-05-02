import React, { useState } from 'react';
import Login from './Login';
import Profile from './Profile';
import './App.css';

const App : React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(
        !!localStorage.getItem('token')
    );

    return(
        <div>{ loggedIn ? <Profile /> : <Login onLogin={() => setLoggedIn(true) } /> }</div>
    );
};

export default App;
