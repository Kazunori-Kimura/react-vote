import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChoiceItem from '../question/ChoiceItem';
import { IChoice } from '../../models';

const choice: IChoice = {
    id: 1,
    questionId: 2,
    content: '10才未満',
};

describe('<ChoiceItem />', () => {
    it('選択肢', () => {
        const index = 0;
        const onChange = jest.fn();
        const onDelete = jest.fn();
        const { queryByTestId, getByPlaceholderText } = render(
            <ChoiceItem choice={choice} index={index} onChange={onChange} onDelete={onDelete} />
        );

        // 選択肢 1 が表示される
        const input = getByPlaceholderText(`選択肢 ${index + 1}`);
        expect(input).toBeTruthy();
        expect(input).toHaveValue(choice.content);
        // 削除ボタンが表示されない
        expect(queryByTestId('choice-item-delete-button')).not.toBeTruthy();
    });

    it('削除ボタン', () => {
        const index = 2;
        const onChange = jest.fn();
        const onDelete = jest.fn();
        const { queryByPlaceholderText, getByTestId } = render(
            <ChoiceItem choice={choice} index={index} onChange={onChange} onDelete={onDelete} />
        );

        // 選択肢 3 が表示される
        expect(queryByPlaceholderText(`選択肢 ${index + 1}`)).toBeTruthy();
        // 削除ボタンが表示される
        const btn = getByTestId('choice-item-delete-button');
        expect(btn).toBeTruthy();
        // 削除ボタンのクリック
        fireEvent.click(btn);
        // onDeleteが呼ばれた？
        expect(onDelete).toHaveBeenCalledWith(choice.id);
    });
});
