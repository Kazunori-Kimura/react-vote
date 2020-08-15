import React from 'react';
import { IQuestion, IUser } from '../../models';
import VoteList from './VoteList';
import QuestionItemFooter from './QuestionItemFooter';

import './QuestionItem.css';

interface QuestionItemProps {
    question: IQuestion;
    user?: IUser;
    onDelete: (questionId: number) => void;
    onVote: (vote: { questionId: number; choiceId: number }) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, user, onVote, onDelete }) => {
    return (
        <div className="question-item" data-testid="question-item">
            <div className="question-item__question">{question.question}</div>
            <VoteList
                limit={question.limit}
                choices={question.choices ?? []}
                votes={question.votes ?? []}
                user={user}
                onVote={onVote}
            />
            <QuestionItemFooter
                question={question}
                voteCount={question.votes?.length ?? 0}
                isOwner={question.createdBy === user?.id}
                onDelete={onDelete}
            />
        </div>
    );
};

export default QuestionItem;
