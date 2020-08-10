import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignIn from '../SignIn';
import { IAuthenticateParams } from '../../models';

const user: IAuthenticateParams = {
    email: 'kimura-kazunori@example.com',
    password: 'secret',
};

describe('<SignIn />', () => {
    it('表示', () => {
        const onSignIn = jest.fn();
        const { getByText, getByPlaceholderText } = render(<SignIn onSignIn={onSignIn} />);

        // メールアドレス
        const email = getByPlaceholderText('メールアドレス');
        expect(email).toBeTruthy();
        // パスワード
        const password = getByPlaceholderText('パスワード');
        expect(password).toBeTruthy();
        // ログインボタン
        const btn = getByText('ログイン');
        expect(btn).toBeTruthy();

        // 入力
        fireEvent.change(email, { target: { value: user.email } });
        fireEvent.change(password, { target: { value: user.password } });
        // ログインボタンのクリック
        fireEvent.click(btn);

        const param = onSignIn.mock.calls[0][0];
        expect(param).toEqual(user);
    });
});
