import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuestionEntry from '../QuestionEntry';
import { IQuestionCreateParams } from '../../models';
import { formatLocalDatetime } from '../../utils';

const questionEntry: IQuestionCreateParams = {
    question: '朝食は何派？',
    limit: '2020-11-01T00:00:00.000Z',
    choices: [
        { id: 1, content: 'パン派' },
        { id: 2, content: '米派' },
        { id: 3, content: 'たべない' },
    ],
};

describe('<QuestionEntry />', () => {
    it('表示', async () => {
        const onEntry = jest.fn();
        const { getByTestId, getByText, getAllByTestId, findByPlaceholderText } = render(
            <QuestionEntry onEntry={onEntry} />
        );

        // 質問
        const question = getByTestId('question-entry-question');
        expect(question).toBeTruthy();
        // 期限
        const limit = getByTestId('question-entry-limit');
        expect(limit).toBeTruthy();
        // 追加ボタン
        const addBtn = getByText('追加');
        expect(addBtn).toBeTruthy();
        // 登録ボタン
        const entryBtn = getByText('登録');
        expect(entryBtn).toBeTruthy();

        // 追加ボタンのクリック
        fireEvent.click(addBtn);
        // 3つめの選択肢が追加されるまで待つ
        await findByPlaceholderText('選択肢 3');

        // 選択肢が3つ
        const choices = getAllByTestId('choice-item-input');
        expect(choices.length).toBe(3);

        // 入力
        fireEvent.change(question, { target: { value: questionEntry.question } });
        fireEvent.change(limit, {
            target: { value: formatLocalDatetime(new Date(questionEntry.limit)) },
        });
        for (let index = 0; index < choices.length; index += 1) {
            const choice = choices[index];
            fireEvent.change(choice, { target: { value: questionEntry.choices[index].content } });
            expect(choice).toHaveValue(questionEntry.choices[index].content);
        }

        // 登録ボタンをクリック
        fireEvent.click(entryBtn);
        // onEntryが呼ばれた？
        expect(onEntry.mock.calls[0][0]).toEqual(questionEntry);
    });
});
