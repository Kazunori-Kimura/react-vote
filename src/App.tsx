import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import QuestionEntry from './components/QuestionEntry';
import SignUp from './components/SignUp';
import QuestionList from './components/QuestionList';
import {
    IUser,
    IQuestionCreateParams,
    IUserCreateParams,
    IAuthenticateParams,
    IQuestion,
    IVoteParams,
    IVote,
    IRefreshPayload,
} from './models';
import { postData, getData, deleteData } from './utils/request';

const App: React.FC = () => {
    // ログインユーザー情報
    const [user, setUser] = useState<IUser>();
    // 質問リスト
    const [questions, setQuestions] = useState<IQuestion[]>([]);

    /**
     * ログイン認証成功時に state にログインユーザー情報を保持
     */
    const onSignIn = async (signInUser: IAuthenticateParams) => {
        const { email, password } = signInUser;
        // POST: /signin
        const [succeeded, status, statusText, payload] = await postData<IUser>(
            '/signin',
            JSON.stringify({ email, password })
        );

        if (succeeded) {
            const loginUser = payload as IUser;
            // ログインユーザー情報をセット
            setUser(loginUser);
        } else {
            // 認証失敗時、alertを表示します
            // eslint-disable-next-line no-alert
            alert('メールアドレスかパスワードが正しくありません');
            // eslint-disable-next-line no-console
            console.error(`${status}: ${statusText}`);
        }
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
    const onRefresh = async () => {
        // GET: /question
        const [succeeded, status, statusText, payload] = await getData<IQuestion[]>('/question');

        if (succeeded && payload) {
            setQuestions(payload);
            return;
        }

        // eslint-disable-next-line no-console
        console.error(`${status}: ${statusText}`);
    };

    /**
     * 質問の投稿
     */
    const onEntryQuestion = async (question: IQuestionCreateParams) => {
        // POST: /question
        const [succeeded, status, statusText] = await postData(
            '/question',
            JSON.stringify(question),
            user?.token
        );

        if (succeeded) {
            // リストを再読み込み
            await onRefresh();
            return;
        }

        // eslint-disable-next-line no-console
        console.error(`${status}: ${statusText}`);
    };

    /**
     * 質問の削除
     */
    const onDelete = async (questionId: number) => {
        // eslint-disable-next-line no-alert
        if (!window.confirm('質問を削除しても良いですか？')) {
            return;
        }

        // DELETE: /question/:id
        const [succeeded, status, message] = await deleteData(
            `/question/${questionId}`,
            user?.token
        );

        if (succeeded) {
            // リストを再読み込み
            await onRefresh();
            // eslint-disable-next-line no-alert
            window.alert('質問を削除しました。');
            return;
        }

        // eslint-disable-next-line no-console
        console.error(`${status}: ${message}`);
    };

    /**
     * 投票
     */
    const onVote = async ({ questionId, choiceId }: IVoteParams) => {
        // POST: /question/:questionId/choice/:choiceId/vote
        const [succeeded, status, statusText] = await postData<IVote>(
            `/question/${questionId}/choice/${choiceId}/vote`,
            '',
            user?.token
        );

        if (succeeded) {
            // リストを再読み込み
            await onRefresh();
            return;
        }

        // eslint-disable-next-line no-console
        console.error(`${status}: ${statusText}`);
    };

    /**
     * ユーザーの登録
     */
    const onEntryUser = async (entryUser: IUserCreateParams) => {
        // POST: /signup
        const [succeeded, status, statusText] = await postData<IUser>(
            '/signup',
            JSON.stringify(entryUser)
        );
        if (succeeded) {
            // eslint-disable-next-line no-alert
            alert(`ユーザー登録処理が完了しました。
入力されたメールアドレスとパスワードでログインしてください。`);
            return;
        }

        // eslint-disable-next-line no-console
        console.error(`${status}: ${statusText}`);
    };

    /**
     * トークンの更新
     */
    const refresh = useCallback(async () => {
        if (user?.token) {
            // GET: /refresh
            const [succeeded, status, statusText, payload] = await getData<IRefreshPayload>(
                '/refresh',
                '',
                user.token
            );

            if (succeeded && payload && user) {
                // tokenを更新
                setUser({
                    ...user,
                    token: payload.token,
                });
                return;
            }

            // eslint-disable-next-line no-console
            console.error(`${status}: ${statusText}`);
        }
    }, [user]);

    // 初回表示時に質問のリストを取得
    useEffect(() => {
        onRefresh();
    }, []);

    // 定期的にトークンを更新する
    useEffect(() => {
        const timer = setInterval(refresh, 15 * 60 * 1000);
        // cleanup
        return () => clearInterval(timer);
    }, [refresh]);

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
                    <QuestionList
                        questions={questions}
                        user={user}
                        onVote={onVote}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
