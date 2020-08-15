import React from 'react';
import { render } from '@testing-library/react';
import VoteResult from '../question/VoteResult';
import { IChoice, IVote, IUser } from '../../models';

const choice: IChoice = { id: 2, questionId: 1, content: 'たけのこ' };
const votes: IVote[] = [
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
];
// 投票済みユーザー
const user1: IUser = {
    id: 1,
    email: 'kimura-kazunori@example.com',
    name: '木村 憲規',
    password: 'secret',
    token: 'abc123',
};
// 未投票ユーザー
const user2: IUser = {
    id: 999,
    email: 'kimura-kazunori@example.com',
    name: '木村 憲規',
    password: 'secret',
    token: 'abc123',
};

describe('<VoteResult />', () => {
    it('投票済みユーザー', () => {
        const { getByTestId } = render(<VoteResult choice={choice} votes={votes} user={user1} />);

        const item = getByTestId('vote-result');
        expect(item).toHaveTextContent(choice.content);
        expect(item).toHaveTextContent('✔︎');
    });

    it('未投票ユーザー', () => {
        const { getByTestId } = render(<VoteResult choice={choice} votes={votes} user={user2} />);

        const item = getByTestId('vote-result');
        expect(item).toHaveTextContent(choice.content);
        expect(item).not.toHaveTextContent('✔︎');
    });
});
