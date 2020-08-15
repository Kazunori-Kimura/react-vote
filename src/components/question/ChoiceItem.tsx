import React from 'react';
import { IChoice } from '../../models';
import TextField from '../TextField';
import DeleteButton from '../DeleteButton';

import './ChoiceItem.css';

interface ChoiceItemProps {
    choice: IChoice;
    index: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (choiceId: number) => void;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({ choice, index, onChange, onDelete }) => {
    return (
        <div className="choice-item" data-testid="choice-item">
            <TextField
                type="text"
                data-testid="choice-item-input"
                name={`${choice.id}-content`}
                className="choice-item__content"
                placeholder={`選択肢 ${index + 1}`}
                required
                maxLength={255}
                value={choice.content}
                onChange={onChange}
            />
            {index >= 2 && (
                <DeleteButton
                    data-testid="choice-item-delete-button"
                    className="choice-item__delete-button"
                    onClick={() => onDelete(choice.id)}
                >
                    削除
                </DeleteButton>
            )}
        </div>
    );
};

export default ChoiceItem;
