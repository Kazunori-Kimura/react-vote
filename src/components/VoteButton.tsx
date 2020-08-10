import React from 'react';
import { IChoice } from '../models';

import './VoteButton.css';

interface VoteButtonProps {
    choice: IChoice;
    disabled?: boolean;
    onRefresh: () => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ choice, disabled = false, onRefresh }) => {
    /**
     * 投票する
     */
    const handleVote = () => {
        // TODO: /voteを呼び出す

        // リストの更新
        onRefresh();
    };

    return (
        <button
            type="button"
            data-testid="vote-button"
            className="vote-button"
            disabled={disabled}
            onClick={handleVote}
        >
            {choice.content}
        </button>
    );
};

export default VoteButton;
