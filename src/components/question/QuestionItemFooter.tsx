import React from 'react';
import { formatLocalDatetime } from '../../utils';
import { IQuestion } from '../../models';

import './QuestionItemFooter.css';

interface QuestionItemFooterProps {
    question: IQuestion;
    voteCount: number;
    isOwner?: boolean;
    onDelete: (questionId: number) => void;
}

const QuestionItemFooter: React.FC<QuestionItemFooterProps> = ({
    question,
    voteCount,
    isOwner = false,
    onDelete,
}) => {
    return (
        <div className="question-item-footer" data-testid="question-item-footer">
            <div className="question-item-footer__limit">
                {`${formatLocalDatetime(new Date(question.limit))} まで`}
            </div>
            <div className="question-item-footer__vote-count">{`${voteCount} 票`}</div>
            {isOwner && (
                <button
                    type="button"
                    className="question-item-footer__delete-button"
                    onClick={() => onDelete(question.id)}
                >
                    削除
                </button>
            )}
        </div>
    );
};

export default QuestionItemFooter;
