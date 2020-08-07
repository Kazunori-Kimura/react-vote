import React, { useState } from 'react';

import './SignUp.css';

interface ISignUpState {
    email: string;
    name: string;
    password: string;
}

const initialState: ISignUpState = {
    email: '',
    name: '',
    password: '',
};

const SignUp: React.FC = () => {
    const [signUpState, setSignUpState] = useState(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        const state = {
            ...signUpState,
            [name]: value,
        };
        setSignUpState(state);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (event.currentTarget.checkValidity()) {
            // TODO: ユーザー登録処理を実行する
            // eslint-disable-next-line no-alert
            alert(`ユーザー登録処理が完了しました。
入力されたメールアドレスとパスワードでログインしてください。`);

            // stateを初期値に戻す
            setSignUpState(initialState);
        }
    };

    return (
        <form className="sign-up" onSubmit={handleSubmit}>
            <h2 className="sign-up__title">ユーザー登録</h2>
            <input
                type="email"
                name="email"
                className="sign-up__email"
                required
                maxLength={255}
                placeholder="メールアドレス"
                value={signUpState.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="name"
                className="sign-up__name"
                required
                maxLength={255}
                placeholder="名前"
                value={signUpState.name}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                className="sign-up__password"
                required
                placeholder="パスワード"
                value={signUpState.password}
                onChange={handleChange}
            />
            <button type="submit" className="sign-up__entry-button">
                登録
            </button>
        </form>
    );
};

export default SignUp;
