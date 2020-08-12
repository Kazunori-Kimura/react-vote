import React from 'react';
import { render } from '@testing-library/react';
import QuestionList from '../QuestionList';
import { IQuestion } from '../../models';

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

describe('<QuestionList />', () => {
    it('表示', () => {
        const onVote = jest.fn();
        const onDelete = jest.fn();
        const { getAllByTestId } = render(
            <QuestionList questions={questions} onDelete={onDelete} onVote={onVote} />
        );

        const items = getAllByTestId('question-item');
        expect(items.length).toBe(questions.length);
    });
});
