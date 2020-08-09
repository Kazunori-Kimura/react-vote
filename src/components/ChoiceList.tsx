import React from 'react';
import { IChoice } from '../models';
import ChoiceItem from './ChoiceItem';

import './ChoiceList.css';

interface ChoiceListProps {
    choices: IChoice[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (choiceId: number) => void;
    onAdd: () => void;
}

const ChoiceList: React.FC<ChoiceListProps> = ({ choices, onChange, onDelete, onAdd }) => {
    return (
        <div className="choice-list">
            {choices.map((choice, index) => (
                <ChoiceItem
                    key={`choice-item-${choice.id}`}
                    choice={choice}
                    index={index}
                    onChange={onChange}
                    onDelete={onDelete}
                />
            ))}
            <button type="button" className="choice-list__add-button" onClick={onAdd}>
                追加
            </button>
        </div>
    );
};

export default ChoiceList;
