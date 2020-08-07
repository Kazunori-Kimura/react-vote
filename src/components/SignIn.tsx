import React, { useState } from 'react';
import { IUser } from '../models';

import './SignIn.css';

import { user } from '../models/data';

interface SignInProps {
    onSignIn: (user: IUser) => void;
}

// stateの型定義
interface ISignInState {
    email: string;
    password: string;
}
// stateの初期値
const initialState: ISignInState = {
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
        const state: ISignInState = {
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
            // 仮実装で data.ts のユーザー情報と一致するかどうか確認します
            const { email, password } = signInState;
            if (email === user.email && password === user.password) {
                // ログインユーザー情報を親コンポーネントに渡す
                onSignIn(user);
            } else {
                // 認証失敗時、alertを表示します
                // eslint-disable-next-line no-alert
                alert('メールアドレスかパスワードが正しくありません');
            }
        }
    };

    return (
        <form className="sign-in" onSubmit={handleSubmit} autoComplete="off">
            <input
                type="email"
                name="email"
                className="sign-in__email"
                placeholder="メールアドレス"
                required
                value={signInState.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                className="sign-in__password"
                placeholder="パスワード"
                required
                value={signInState.password}
                onChange={handleChange}
            />
            <button type="submit" className="sign-in__button">
                ログイン
            </button>
        </form>
    );
};

export default SignIn;
