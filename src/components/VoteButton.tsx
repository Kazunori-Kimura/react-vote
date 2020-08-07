import React from 'react';
import { IChoice } from '../models';

import './VoteButton.css';

interface VoteButtonProps {
    choice: IChoice;
    disabled?: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ choice, disabled = false }) => {
    return (
        <button type="button" className="vote-button" disabled={disabled}>
            {choice.content}
        </button>
    );
};

export default VoteButton;
