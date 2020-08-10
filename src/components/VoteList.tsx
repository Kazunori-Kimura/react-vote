import React from 'react';
import { IChoice, IVote, IUser } from '../models';
import VoteResult from './VoteResult';
import VoteButton from './VoteButton';

import './VoteList.css';

interface VoteListProps {
    limit: string;
    choices: IChoice[];
    votes: IVote[];
    user?: IUser;
    onRefresh: () => void;
}

const VoteList: React.FC<VoteListProps> = ({ limit, choices, votes, user, onRefresh }) => {
    // 期限切れかどうか
    const expired = limit < new Date().toJSON();
    // 投票済みかどうか
    const voted = votes.some((vote) => vote.votedBy === user?.id);

    return (
        <div className="vote-list" data-testid="vote-list">
            {choices.map((choice) => {
                const key = `vote-item-${choice.questionId}-${choice.id}`;
                if (expired || voted) {
                    return <VoteResult key={key} choice={choice} votes={votes} user={user} />;
                }
                return (
                    <VoteButton
                        key={key}
                        choice={choice}
                        disabled={Number.isNaN(user?.id)}
                        onRefresh={onRefresh}
                    />
                );
            })}
        </div>
    );
};

export default VoteList;
