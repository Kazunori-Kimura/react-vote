import React from 'react';
import { IUser } from '../models';

import './SignOut.css';

interface SignOutProps {
    user: IUser;
}

const SignOut: React.FC<SignOutProps> = ({ user }) => {
    return (
        <div className="sign-out">
            <span className="sign-out__user-name">{user.name}</span>
            <button type="button" className="sign-out__button">
                ログアウト
            </button>
        </div>
    );
};

export default SignOut;
