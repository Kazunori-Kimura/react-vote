import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'fetch-mock';
import App from './App';
import { IUser, IQuestion } from './models';

// 認証情報
const user: IUser = {
    id: 1,
    email: 'kimura-kazunori@example.com',
    name: '木村 憲規',
    password: 'secret',
    token: 'abc123',
};

const questions: IQuestion[] = [
    {
        id: 2,
        question: 'あなたの年齢を教えてください',
        limit: '2020-11-01T00:00:00.000Z',
        createdBy: 1,
        choices: [
            { id: 1, questionId: 2, content: '10才未満' },
            { id: 2, questionId: 2, content: '11 〜 20' },
            { id: 3, questionId: 2, content: '21 〜 30' },
            { id: 4, questionId: 2, content: '31 〜 40' },
            { id: 5, questionId: 2, content: '41才以上' },
        ],
        votes: [
            { id: 1, questionId: 2, choiceId: 1, votedBy: 2 },
            { id: 2, questionId: 2, choiceId: 1, votedBy: 3 },
            { id: 3, questionId: 2, choiceId: 1, votedBy: 4 },
            { id: 4, questionId: 2, choiceId: 1, votedBy: 5 },
            { id: 5, questionId: 2, choiceId: 1, votedBy: 6 },
        ],
    },
    {
        id: 1,
        question: 'きのこ派？たけのこ派？',
        limit: '2020-07-01T00:00:00.000Z',
        createdBy: 2,
        choices: [
            { id: 1, questionId: 1, content: 'きのこ' },
            { id: 2, questionId: 1, content: 'たけのこ' },
        ],
        votes: [
            { id: 1, questionId: 1, choiceId: 2, votedBy: 1 },
            { id: 2, questionId: 1, choiceId: 2, votedBy: 2 },
            { id: 3, questionId: 1, choiceId: 2, votedBy: 3 },
            { id: 4, questionId: 1, choiceId: 2, votedBy: 4 },
            { id: 5, questionId: 1, choiceId: 2, votedBy: 5 },
            { id: 6, questionId: 1, choiceId: 2, votedBy: 6 },
            { id: 7, questionId: 1, choiceId: 2, votedBy: 7 },
            { id: 8, questionId: 1, choiceId: 2, votedBy: 8 },
            { id: 9, questionId: 1, choiceId: 2, votedBy: 9 },
            { id: 10, questionId: 1, choiceId: 2, votedBy: 10 },
            { id: 11, questionId: 1, choiceId: 2, votedBy: 11 },
            { id: 12, questionId: 1, choiceId: 1, votedBy: 12 },
            { id: 13, questionId: 1, choiceId: 1, votedBy: 13 },
            { id: 14, questionId: 1, choiceId: 1, votedBy: 14 },
            { id: 15, questionId: 1, choiceId: 1, votedBy: 15 },
        ],
    },
];

describe('<App />', () => {
    beforeAll(() => {
        // mockの設定
        // GET: /question
        // POST: /signin
        fetchMock
            .get('http://localhost:3030/question?', {
                status: 200,
                body: questions,
            })
            .post('http://localhost:3030/signin', {
                status: 200,
                body: user,
            });
    });

    afterAll(() => {
        fetchMock.restore();
    });

    it('未認証時の表示', async () => {
        const { queryByTestId, findAllByTestId } = render(<App />);

        // 質問リストが表示されるまで待つ
        await findAllByTestId('question-item');

        // headerが存在する
        expect(queryByTestId('header')).toBeTruthy();
        // sign-inが存在する
        expect(queryByTestId('sign-in')).toBeTruthy();
        // sign-outが存在しない
        expect(queryByTestId('sign-out')).not.toBeTruthy();
        // sign-upが存在する
        expect(queryByTestId('sign-up')).toBeTruthy();
        // question-entryが存在しない
        expect(queryByTestId('question-entry')).not.toBeTruthy();
        // question-listが存在する
        expect(queryByTestId('question-list')).toBeTruthy();
    });

    it('認証時の表示', async () => {
        const {
            queryByTestId,
            getByTestId,
            getByText,
            findByTestId,
            findAllByTestId,
            container,
        } = render(<App />);

        // 質問リストが表示されるまで待つ
        await findAllByTestId('question-item');

        // email
        const emailInput = container.querySelector('.sign-in__email');
        // password
        const passwordInput = container.querySelector('.sign-in__password');

        expect(emailInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();

        if (emailInput && passwordInput) {
            // ユーザー名とパスワードを入力
            fireEvent.change(emailInput, { target: { value: user.email } });
            fireEvent.change(passwordInput, { target: { value: user.password } });

            // submitボタンをクリック
            fireEvent.click(getByText('ログイン'));

            // SignOutが表示されるまで待つ
            await findByTestId('sign-out');

            // sign-inが存在しない
            expect(queryByTestId('sign-in')).not.toBeTruthy();
            // sign-outが存在する
            expect(queryByTestId('sign-out')).toBeTruthy();
            // sign-outにログインユーザー名が表示される
            expect(getByTestId('sign-out')).toHaveTextContent(user.name);
            // sign-upが存在しない
            expect(queryByTestId('sign-up')).not.toBeTruthy();
            // question-entryが存在する
            expect(queryByTestId('question-entry')).toBeTruthy();
            // question-listが存在する
            expect(queryByTestId('question-list')).toBeTruthy();
        }
    });
});
