import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuestionItemFooter from '../question/QuestionItemFooter';
import { IQuestion } from '../../models';

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

describe('<QuestionItemFooter />', () => {
    it('表示', () => {
        const onDelete = jest.fn();
        const { getByTestId, queryByText } = render(
            <QuestionItemFooter
                question={question}
                voteCount={question.votes?.length ?? 0}
                isOwner={false}
                onDelete={onDelete}
            />
        );

        // 質問文が表示されているか
        expect(getByTestId('question-item-footer')).toHaveTextContent(
            `${question.votes?.length ?? 0} 票`
        );
        // 削除ボタンが存在しない
        expect(queryByText('削除')).toBeFalsy();
    });

    it('削除', () => {
        const onDelete = jest.fn();
        const { getByText } = render(
            <QuestionItemFooter
                question={question}
                voteCount={question.votes?.length ?? 0}
                isOwner
                onDelete={onDelete}
            />
        );

        // 削除ボタンが存在する
        const btn = getByText('削除');
        expect(btn).toBeTruthy();
        // 削除ボタンをクリック
        fireEvent.click(btn);
        // onDeleteが呼び出された？
        expect(onDelete).toBeCalledWith(question.id);
    });
});
