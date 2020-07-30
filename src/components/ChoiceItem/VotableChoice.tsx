import React from 'react';
import { Choice } from '../../models';

interface VotableChoiceProps {
    choice: Choice;
    onVote: (choiceId: number) => void;
}

/**
 * 投票可能な選択肢コンポーネント
 */
const VotableChoice: React.FC<VotableChoiceProps> = ({ choice, onVote }) => {
    return (
        <button type="button" className="choice votable" onClick={() => onVote(choice.id)}>
            {choice.content}
        </button>
    );
};

export default VotableChoice;
