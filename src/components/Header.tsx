import React from 'react';
import { IUser } from '../models';
import SignOut from './SignOut';
import SignIn from './SignIn';

import './Header.css';

interface HeaderProps {
    user?: IUser;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    return <div className="header">{user ? <SignOut user={user} /> : <SignIn />}</div>;
};

export default Header;
