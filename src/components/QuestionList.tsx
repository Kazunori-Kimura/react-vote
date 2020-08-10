import React from 'react';
import { IQuestion, IUser } from '../models';
import QuestionItem from './QuestionItem';

import './QuestionList.css';

interface QuestionListProps {
    questions: IQuestion[];
    user?: IUser;
    onRefresh: () => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, user, onRefresh }) => {
    return (
        <div className="question-list" data-testid="question-list">
            {questions.map((question) => (
                <QuestionItem
                    key={`question-item-${question.id}`}
                    question={question}
                    user={user}
                    onRefresh={onRefresh}
                />
            ))}
        </div>
    );
};

export default QuestionList;
