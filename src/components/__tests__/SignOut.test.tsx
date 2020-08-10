import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignOut from '../SignOut';
import { IUser } from '../../models';

const user: IUser = {
    id: 1,
    email: 'kimura-kazunori@example.com',
    name: '木村 憲規',
    password: 'secret',
    token: 'abc123',
};

describe('<SignOut />', () => {
    it('表示', () => {
        const onSignOut = jest.fn();
        const { getByText, getByTestId } = render(<SignOut user={user} onSignOut={onSignOut} />);

        // 名前
        expect(getByTestId('sign-out')).toHaveTextContent(user.name);
        // ログアウトボタン
        const btn = getByText('ログアウト');
        expect(btn).toBeTruthy();
        // ログアウトボタンのクリック
        fireEvent.click(btn);
        // onSignOutが呼ばれた？
        expect(onSignOut).toBeCalled();
    });
});
