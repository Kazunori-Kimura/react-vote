import React from 'react';
import classnames from 'classnames';
import { IUser, IVote, IChoice } from '../models';

import './VoteResult.css';

interface VoteResultProps {
    choice: IChoice;
    votes: IVote[];
    user?: IUser;
}

const VoteResult: React.FC<VoteResultProps> = ({ choice, votes, user }) => {
    // この選択肢に該当する投票
    const gainVotes = votes.filter((vote) => vote.choiceId === choice.id);
    // この選択肢に投票済み？
    const voted = gainVotes.some((vote) => vote.votedBy === user?.id);
    // 得票率
    const rate = votes.length === 0 ? 0 : Math.round((gainVotes.length / votes.length) * 100);

    return (
        <div
            className={classnames('vote-result', {
                'vote-result--voted': voted,
            })}
        >
            <div
                className={classnames('vote-result__rate-bar', {
                    'vote-result__rate-bar--voted': voted,
                })}
                style={{ width: `calc(100% * ${rate / 100})` }}
            />
            <div className="vote-result__wrapper">
                <div className="vote-result__content">{choice.content}</div>
                {voted && <div className="vote-result__voted">✔︎</div>}
                <div className="vote-result__rate">{`${rate} %`}</div>
            </div>
        </div>
    );
};

export default VoteResult;
