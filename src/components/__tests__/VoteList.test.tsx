import React from 'react';
import { render } from '@testing-library/react';
import VoteList from '../question/VoteList';
import { IUser } from '../../models';

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

const question = {
    limit: '2100-07-01T00:00:00.000Z',
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
};

describe('<VoteList />', () => {
    it('投票済みユーザー', () => {
        const onVote = jest.fn();
        const { getAllByTestId, queryByTestId } = render(
            <VoteList {...question} user={user1} onVote={onVote} />
        );

        // vote-buttonがない
        expect(queryByTestId('vote-button')).toBeFalsy();
        // vote-resultがchoicesの数と一致する
        const items = getAllByTestId('vote-result');
        expect(items.length).toBe(question.choices.length);
    });

    it('未投票ユーザー', () => {
        const onVote = jest.fn();
        const { getAllByTestId, queryByTestId } = render(
            <VoteList {...question} user={user2} onVote={onVote} />
        );

        // vote-resultがない
        expect(queryByTestId('vote-result')).toBeFalsy();
        // vote-buttonがchoicesの数と一致する
        const items = getAllByTestId('vote-button');
        expect(items.length).toBe(question.choices.length);
    });
});
