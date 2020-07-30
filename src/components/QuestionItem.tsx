import React, { useState, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { Question, Vote } from '../models';
import { clone } from '../utils';
import ChoiceItem from './ChoiceItem';
import './QuestionItem.css';

// ログイン中のユーザー
const USER_ID = 1;

interface QuestionItemProps {
    question: Question;
    active?: boolean;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onVote: (question: Question) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
    question,
    active = false,
    onDelete,
    onEdit,
    onVote,
}) => {
    const [today, setToday] = useState(new Date());

    /**
     * 投票可能かどうか
     */
    const votable = useMemo(() => {
        const { limit, votes } = question;
        const limitDate = new Date(limit);

        if (limitDate < today) {
            // 投票期間が過ぎた
            return false;
        }

        // 投票済みかどうか
        const exists = votes?.some((v) => v.votedBy === USER_ID);
        // 未投票なら投票可能
        return !exists;
    }, [question, today]);

    /**
     * 投票処理
     */
    const handleVote = (choiceId: number) => {
        // vote id を採番
        const ids = question.votes?.map((v) => v.id) ?? [0];
        const id = Math.max(...ids) + 1;

        const vote: Vote = {
            id,
            questionId: question.id,
            choiceId,
            votedBy: USER_ID,
        };

        const newQuestion = clone(question);
        if (newQuestion.votes) {
            newQuestion.votes.push(vote);
        } else {
            newQuestion.votes = [vote];
        }

        onVote(newQuestion);
    };

    useEffect(() => {
        // 毎分現在日時を更新する
        const timer = setInterval(() => setToday(new Date()), 60000);
        // clean up
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className={classnames('question', {
                active,
            })}
        >
            <div className="question__question">{question.question}</div>
            {question.choices?.map((choice) => (
                <ChoiceItem
                    key={`choice-${question.id}-${choice.id}`}
                    choice={choice}
                    votable={votable}
                    votes={question.votes}
                    onVote={handleVote}
                />
            ))}
            <div className="question__footer">
                <div className="question__vote-count">{`${question.votes?.length ?? 0} 票`}</div>
                <div className="question__limit">{question.limit} まで</div>
                <button type="button" onClick={() => onDelete(question.id)}>
                    削除
                </button>
                <button type="button" onClick={() => onEdit(question.id)}>
                    編集
                </button>
            </div>
        </div>
    );
};

export default QuestionItem;
