import React from 'react';
import { IUser } from '../models';
import SignOut from './SignOut';
import SignIn from './SignIn';

import './Header.css';

interface HeaderProps {
    user?: IUser;
    onSignIn: (user: IUser) => void;
    onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onSignIn, onSignOut }) => {
    return (
        <div className="header">
            {user ? <SignOut user={user} onSignOut={onSignOut} /> : <SignIn onSignIn={onSignIn} />}
        </div>
    );
};

export default Header;
