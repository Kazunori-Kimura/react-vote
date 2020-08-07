import React from 'react';
import { IChoice } from '../models';

import './ChoiceItem.css';

interface ChoiceItemProps {
    choice: IChoice;
    index: number;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({ choice, index }) => {
    return (
        <div className="choice-item">
            <input
                type="text"
                className="choice-item__content"
                placeholder={`選択肢 ${index}`}
                required
                maxLength={255}
                defaultValue={choice.content}
            />
            {index >= 2 && (
                <button type="button" className="choice-item__delete-button">
                    削除
                </button>
            )}
        </div>
    );
};

export default ChoiceItem;
