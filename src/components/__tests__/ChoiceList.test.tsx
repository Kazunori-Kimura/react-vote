import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChoiceList from '../question/ChoiceList';
import { IChoice } from '../../models';

const choices: IChoice[] = [
    { id: 1, questionId: 2, content: '10才未満' },
    { id: 2, questionId: 2, content: '11 〜 20' },
    { id: 3, questionId: 2, content: '21 〜 30' },
    { id: 4, questionId: 2, content: '31 〜 40' },
    { id: 5, questionId: 2, content: '41才以上' },
];

describe('<ChoiceList />', () => {
    it('表示', () => {
        const onChange = jest.fn();
        const onDelete = jest.fn();
        const onAdd = jest.fn();
        const { getAllByTestId } = render(
            <ChoiceList choices={choices} onChange={onChange} onDelete={onDelete} onAdd={onAdd} />
        );

        // 選択肢が表示される
        const items = getAllByTestId('choice-item');
        expect(items.length).toBe(choices.length);
    });

    it('追加ボタン', () => {
        const onChange = jest.fn();
        const onDelete = jest.fn();
        const onAdd = jest.fn();
        const { getByTestId } = render(
            <ChoiceList choices={choices} onChange={onChange} onDelete={onDelete} onAdd={onAdd} />
        );

        // 追加ボタンが表示される
        const btn = getByTestId('choice-item-add-button');
        expect(btn).toBeTruthy();
        // 追加ボタンのクリック
        fireEvent.click(btn);
        // onAddが呼ばれた？
        expect(onAdd).toHaveBeenCalled();
    });
});
