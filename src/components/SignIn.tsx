import React from 'react';
import { IUser } from '../models';

interface SignInProps {
    user?: IUser;
}

const SignIn: React.FC<SignInProps> = ({ user }) => {
    return (
        <form className="sign-in">
            <input
                type="email"
                className="sign-in__email"
                placeholder="メールアドレス"
                required
                defaultValue={user?.email}
            />
            <input
                type="password"
                className="sign-in__password"
                placeholder="パスワード"
                required
                defaultValue={user?.password}
            />
            <button type="submit" className="sign-in__button">
                Sign In
            </button>
        </form>
    );
};

export default SignIn;
