import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import QuestionEntry from './components/QuestionEntry';
import SignUp from './components/SignUp';
import QuestionList from './components/QuestionList';
import { IUser, IQuestionCreateParams, IUserCreateParams, IAuthenticateParams } from './models';

// 仮に静的なデータを使用する
import { questions, user as staticUser } from './models/data';

const App: React.FC = () => {
    // ログインユーザー情報
    const [user, setUser] = useState<IUser>();

    /**
     * ログイン認証成功時に state にログインユーザー情報を保持
     */
    const onSignIn = (signInUser: IAuthenticateParams) => {
        // TODO: 認証処理を実行する
        // 仮実装: data.ts のユーザー情報と一致するかどうか確認します
        const { email, password } = signInUser;
        if (email === staticUser.email && password === staticUser.password) {
            // ログインユーザー情報をセット
            setUser(staticUser);
        } else {
            // 認証失敗時、alertを表示します
            // eslint-disable-next-line no-alert
            alert('メールアドレスかパスワードが正しくありません');
        }
    };

    /**
     * ログアウト時に state のログインユーザー情報を破棄する
     */
    const onSignOut = () => {
        setUser(undefined);
    };

    /**
     * 質問の投稿
     */
    const onEntryQuestion = (question: IQuestionCreateParams) => {
        // TODO: POST: /question
        // eslint-disable-next-line no-console
        console.log(question);
    };

    /**
     * リスト更新
     */
    const onRefresh = () => {
        // TODO リスト更新する
    };

    /**
     * ユーザーの登録
     */
    const onEntryUser = (entryUser: IUserCreateParams) => {
        // eslint-disable-next-line no-console
        console.log(entryUser);
        // eslint-disable-next-line no-alert
        alert(`ユーザー登録処理が完了しました。
        入力されたメールアドレスとパスワードでログインしてください。`);
    };

    return (
        <div className="App">
            <Header user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
            <div className="App__contents">
                <div className="App__content-item">
                    {user ? (
                        <QuestionEntry onEntry={onEntryQuestion} />
                    ) : (
                        <SignUp onEntry={onEntryUser} />
                    )}
                </div>
                <div className="App__content-item">
                    <QuestionList questions={questions} user={user} onRefresh={onRefresh} />
                </div>
            </div>
        </div>
    );
};

export default App;
