import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { IUser } from './models';

// 認証情報
const user: IUser = {
    id: 1,
    email: 'kimura-kazunori@example.com',
    name: '木村 憲規',
    password: 'secret',
    token: 'abc123',
};

describe('<App />', () => {
    it('未認証時の表示', () => {
        const { queryByTestId } = render(<App />);
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
        const { queryByTestId, getByTestId, getByText, findByTestId, container } = render(<App />);
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
