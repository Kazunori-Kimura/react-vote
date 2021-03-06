import React from 'react';
import { IUser } from '../../models';
import DeleteButton from '../DeleteButton';

import './SignOut.css';

interface SignOutProps {
    user: IUser;
    onSignOut: () => void;
}

const SignOut: React.FC<SignOutProps> = ({ user, onSignOut }) => {
    return (
        <div className="sign-out" data-testid="sign-out">
            <span id="authenticated-user-name" className="sign-out__user-name">
                {user.name}
            </span>
            <DeleteButton className="sign-out__button" onClick={onSignOut}>
                ログアウト
            </DeleteButton>
        </div>
    );
};

export default SignOut;
