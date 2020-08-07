import React from 'react';
import { IUser } from '../models';

import './SignUp.css';

interface SignUpProps {
    user?: IUser;
}

const SignUp: React.FC<SignUpProps> = ({ user }) => {
    return (
        <form className="sign-up">
            <h2 className="sign-up__title">ユーザー登録</h2>
            <input
                type="email"
                className="sign-up__email"
                required
                maxLength={255}
                placeholder="メールアドレス"
                defaultValue={user?.email}
            />
            <input
                type="text"
                className="sign-up__name"
                required
                maxLength={255}
                placeholder="名前"
                defaultValue={user?.name}
            />
            <input
                type="password"
                className="sign-up__password"
                required
                placeholder="パスワード"
                defaultValue={user?.password}
            />
            <button type="submit" className="sign-up__entry-button">
                登録
            </button>
        </form>
    );
};

export default SignUp;
