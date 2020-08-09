import React from 'react';
import { IQuestion, IUser } from '../models';
import VoteList from './VoteList';
import QuestionItemFooter from './QuestionItemFooter';

import './QuestionItem.css';

interface QuestionItemProps {
    question: IQuestion;
    user?: IUser;
    onRefresh: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, user, onRefresh }) => {
    return (
        <div className="question-item">
            <div className="question-item__question">{question.question}</div>
            <VoteList
                limit={question.limit}
                choices={question.choices ?? []}
                votes={question.votes ?? []}
                user={user}
                onRefresh={onRefresh}
            />
            <QuestionItemFooter
                limit={question.limit}
                voteCount={question.votes?.length ?? 0}
                isOwner={question.createdBy === user?.id}
            />
        </div>
    );
};

export default QuestionItem;
