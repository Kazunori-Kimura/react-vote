import React from 'react';
import { IChoice } from '../models';
import ChoiceItem from './ChoiceItem';

import './ChoiceList.css';

interface ChoiceListProps {
    choices: IChoice[];
}

const ChoiceList: React.FC<ChoiceListProps> = ({ choices }) => {
    return (
        <div className="choice-list">
            {choices.map((choice, index) => (
                <ChoiceItem key={`choice-item-${choice.id}`} choice={choice} index={index} />
            ))}
            <button type="button" className="choice-list__add-button">
                追加
            </button>
        </div>
    );
};

export default ChoiceList;
