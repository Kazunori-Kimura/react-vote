import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VoteButton from '../VoteButton';
import { IChoice } from '../../models';

const choice: IChoice = { id: 2, questionId: 1, content: 'たけのこ' };

describe('<VoteButton />', () => {
    it('表示', () => {
        const onVote = jest.fn();
        const { getByText } = render(<VoteButton choice={choice} onVote={onVote} />);

        const btn = getByText(choice.content);
        expect(btn).toBeTruthy();

        // ボタンクリック
        fireEvent.click(btn);
        const param = onVote.mock.calls[0][0];
        expect(param).toEqual({ questionId: choice.questionId, choiceId: choice.id });
    });
});
