import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import QuestionEntry from './components/QuestionEntry';
import SignUp from './components/SignUp';
import QuestionList from './components/QuestionList';
import { IUser } from './models';

// 仮に静的なデータを使用する
import { questions } from './models/data';

const App: React.FC = () => {
    // ログインユーザー情報
    const [user, setUser] = useState<IUser>();

    /**
     * ログイン認証成功時に state にログインユーザー情報を保持
     */
    const onSignIn = (signInUser: IUser) => {
        setUser(signInUser);
    };

    /**
     * ログアウト時に state のログインユーザー情報を破棄する
     */
    const onSignOut = () => {
        setUser(undefined);
    };

    /**
     * リスト更新
     */
    const onRefresh = () => {
        // TODO リスト更新する
    };

    return (
        <div className="App">
            <Header user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
            <div className="App__contents">
                <div className="App__content-item">
                    {user ? <QuestionEntry onReflesh={onRefresh} /> : <SignUp />}
                </div>
                <div className="App__content-item">
                    <QuestionList questions={questions} user={user} />
                </div>
            </div>
        </div>
    );
};

export default App;
