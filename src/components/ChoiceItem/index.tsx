import React, { useMemo } from 'react';
import { Choice, Vote } from '../../models';
import VotableChoice from './VotableChoice';
import ReadOnlyChoice from './ReadOnlyChoice';
import './Choice.css';

const USER_ID = 1;

interface ChoiceItemProps {
    choice: Choice;
    votes?: Vote[];
    votable?: boolean;
    onVote: (choiceId: number) => void;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({ choice, votable, votes, onVote }) => {
    // 得票率
    const rate = useMemo(() => {
        if (votes) {
            const selectedVote = votes.filter((v) => v.choiceId === choice.id) || [];
            return Math.floor((selectedVote.length / votes.length) * 100);
        }
        return 0;
    }, [choice.id, votes]);

    // ログインユーザーが投票したかどうか
    const voted = useMemo(() => {
        if (votes) {
            return votes.some((v) => v.choiceId === choice.id && v.votedBy === USER_ID);
        }
        return false;
    }, [choice.id, votes]);

    return votable ? (
        <VotableChoice choice={choice} onVote={onVote} />
    ) : (
        <ReadOnlyChoice choice={choice} rate={rate} voted={voted} />
    );
};

export default ChoiceItem;
