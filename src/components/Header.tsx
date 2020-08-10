import React from 'react';
import { IUser, IAuthenticateParams } from '../models';
import SignOut from './SignOut';
import SignIn from './SignIn';

import './Header.css';

interface HeaderProps {
    user?: IUser;
    onSignIn: (user: IAuthenticateParams) => void;
    onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onSignIn, onSignOut }) => {
    return (
        <div className="header" data-testid="header">
            {user ? <SignOut user={user} onSignOut={onSignOut} /> : <SignIn onSignIn={onSignIn} />}
        </div>
    );
};

export default Header;
