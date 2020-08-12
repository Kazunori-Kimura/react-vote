import React from 'react';
import { IChoice, IVoteParams } from '../models';

import './VoteButton.css';

interface VoteButtonProps {
    choice: IChoice;
    disabled?: boolean;
    onVote: (vote: IVoteParams) => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ choice, disabled = false, onVote }) => {
    return (
        <button
            type="button"
            data-testid="vote-button"
            className="vote-button"
            disabled={disabled}
            onClick={() => onVote({ questionId: choice.questionId ?? 0, choiceId: choice.id })}
        >
            {choice.content}
        </button>
    );
};

export default VoteButton;
