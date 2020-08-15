import React from 'react';
import { IQuestion, IUser } from '../../models';
import QuestionItem from './QuestionItem';

import './QuestionList.css';

interface QuestionListProps {
    questions: IQuestion[];
    user?: IUser;
    onDelete: (questionId: number) => void;
    onVote: (vote: { questionId: number; choiceId: number }) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, user, onVote, onDelete }) => {
    return (
        <div className="question-list" data-testid="question-list">
            {questions.map((question) => (
                <QuestionItem
                    key={`question-item-${question.id}`}
                    question={question}
                    user={user}
                    onVote={onVote}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default QuestionList;
