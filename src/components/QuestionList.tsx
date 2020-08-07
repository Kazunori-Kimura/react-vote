import React from 'react';
import { IQuestion, IUser } from '../models';
import QuestionItem from './QuestionItem';

import './QuestionList.css';

interface QuestionListProps {
    questions: IQuestion[];
    user?: IUser;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, user }) => {
    return (
        <div className="question-list">
            {questions.map((question) => (
                <QuestionItem
                    key={`question-item-${question.id}`}
                    question={question}
                    user={user}
                />
            ))}
        </div>
    );
};

export default QuestionList;