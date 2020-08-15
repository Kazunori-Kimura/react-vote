import React from 'react';
import { IChoice, IVoteParams } from '../../models';
import Button from '../Button';

import './VoteButton.css';

interface VoteButtonProps {
    choice: IChoice;
    disabled?: boolean;
    onVote: (vote: IVoteParams) => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ choice, disabled = false, onVote }) => {
    return (
        <Button
            data-testid="vote-button"
            className="vote-button"
            disabled={disabled}
            onClick={() => onVote({ questionId: choice.questionId ?? 0, choiceId: choice.id })}
        >
            {choice.content}
        </Button>
    );
};

export default VoteButton;
