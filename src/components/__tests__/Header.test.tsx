import React from 'react';
import { render } from '@testing-library/react';
import Header from '../auth/Header';
import { IUser } from '../../models';

// 認証情報
const user: IUser = {
    id: 1,
    email: 'kimura-kazunori@example.com',
    name: '木村 憲規',
    password: 'secret',
    token: 'abc123',
};

describe('<Header />', () => {
    it('認証情報なし', () => {
        const onSignIn = jest.fn();
        const onSignOut = jest.fn();
        const { queryByTestId } = render(<Header onSignIn={onSignIn} onSignOut={onSignOut} />);

        // sign-inが表示される
        expect(queryByTestId('sign-in')).toBeTruthy();
        // sign-outが表示されない
        expect(queryByTestId('sign-out')).not.toBeTruthy();
    });

    it('認証情報あり', () => {
        const onSignIn = jest.fn();
        const onSignOut = jest.fn();
        const { queryByTestId } = render(
            <Header user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
        );

        // sign-inが表示されない
        expect(queryByTestId('sign-in')).not.toBeTruthy();
        // sign-outが表示される
        expect(queryByTestId('sign-out')).toBeTruthy();
    });
});
