import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUp from '../SignUp';
import { IUserCreateParams } from '../../models';

const user: IUserCreateParams = {
    email: 'kimura-kazunori@example.com',
    name: '木村 憲規',
    password: 'secret',
};

describe('<SignUp />', () => {
    it('表示', () => {
        const onEntry = jest.fn();
        const { getByText, getByPlaceholderText } = render(<SignUp onEntry={onEntry} />);

        // メールアドレス
        const email = getByPlaceholderText('メールアドレス');
        expect(email).toBeTruthy();
        // 名前
        const name = getByPlaceholderText('名前');
        expect(name).toBeTruthy();
        // パスワード
        const password = getByPlaceholderText('パスワード');
        expect(password).toBeTruthy();
        // 登録ボタン
        const btn = getByText('登録');
        expect(btn).toBeTruthy();

        // 入力
        fireEvent.change(email, { target: { value: user.email } });
        fireEvent.change(name, { target: { value: user.name } });
        fireEvent.change(password, { target: { value: user.password } });
        // 登録ボタンのクリック
        fireEvent.click(btn);

        // onEntryが呼ばれた？
        const param = onEntry.mock.calls[0][0];
        expect(param).toEqual(user);
    });
});
