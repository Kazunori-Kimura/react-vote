import React from 'react';
import { render } from '@testing-library/react';
import QuestionItem from '../QuestionItem';
import { IQuestion, IUser } from '../../models';

const question: IQuestion = {
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
};

const user: IUser = {
    id: 1,
    email: 'kimura-kazunori@example.com',
    name: '木村 憲規',
    password: 'secret',
    token: 'abc123',
};

describe('<QuestionItem />', () => {
    it('表示', () => {
        const onRefresh = jest.fn();
        const onDelete = jest.fn();
        const { getByTestId } = render(
            <QuestionItem
                question={question}
                user={user}
                onRefresh={onRefresh}
                onDelete={onDelete}
            />
        );
        // 質問文が表示されているか
        expect(getByTestId('question-item')).toHaveTextContent(question.question);
    });
});
