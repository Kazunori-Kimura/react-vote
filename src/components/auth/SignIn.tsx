import React, { useState } from 'react';
import { IAuthenticateParams } from '../../models';
import TextField from '../TextField';
import EntryButton from '../EntryButton';

import './SignIn.css';

interface SignInProps {
    onSignIn: (params: IAuthenticateParams) => void;
}

// stateの初期値
const initialState: IAuthenticateParams = {
    email: '',
    password: '',
};

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
    // stateの宣言
    const [signInState, setSignInState] = useState(initialState);

    /**
     * テキストボックスの変更時に実行されるイベントハンドラー
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        // 入力値を元に state を再作成
        const state: IAuthenticateParams = {
            ...signInState,
            [name]: value,
        };
        setSignInState(state);
    };

    /**
     * フォームの submit発生時に実行されるイベントハンドラー
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // デフォルトのSubmitイベント (画面の再読み込み) をキャンセル
        event.preventDefault();

        // フォームに入力エラーが無い場合
        if (event.currentTarget.checkValidity()) {
            // 認証処理を実行する
            onSignIn({ ...signInState });
        }
    };

    return (
        <form
            id="sign-in"
            data-testid="sign-in"
            className="sign-in"
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            <TextField
                type="email"
                name="email"
                className="sign-in__email"
                placeholder="メールアドレス"
                required
                value={signInState.email}
                onChange={handleChange}
            />
            <TextField
                type="password"
                name="password"
                className="sign-in__password"
                placeholder="パスワード"
                required
                value={signInState.password}
                onChange={handleChange}
            />
            <EntryButton type="submit" className="sign-in__button">
                ログイン
            </EntryButton>
        </form>
    );
};

export default SignIn;
