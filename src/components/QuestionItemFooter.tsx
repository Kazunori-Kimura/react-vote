import React from 'react';
import { formatLocalDatetime } from '../utils';

import './QuestionItemFooter.css';

interface QuestionItemFooterProps {
    limit: string;
    voteCount: number;
    isOwner?: boolean;
}

const QuestionItemFooter: React.FC<QuestionItemFooterProps> = ({
    limit,
    voteCount,
    isOwner = false,
}) => {
    return (
        <div className="question-item-footer" data-testid="question-item-footer">
            <div className="question-item-footer__limit">
                {`${formatLocalDatetime(new Date(limit))} まで`}
            </div>
            <div className="question-item-footer__vote-count">{`${voteCount} 票`}</div>
            {isOwner && (
                <button type="button" className="question-item-footer__delete-button">
                    削除
                </button>
            )}
        </div>
    );
};

export default QuestionItemFooter;
