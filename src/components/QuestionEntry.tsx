import React from 'react';
import { IQuestion } from '../models';
import ChoiceList from './ChoiceList';
import { formatLocalDatetime } from '../utils/date';

import './QuestionEntry.css';

interface QuestionEntryProps {
    question: IQuestion;
}

const QuestionEntry: React.FC<QuestionEntryProps> = ({ question }) => {
    return (
        <form className="question-entry">
            <h2 className="question-entry__title">質問を投稿する</h2>
            <textarea
                className="question-entry__question"
                placeholder="質問"
                required
                maxLength={255}
                defaultValue={question.question}
            />
            <ChoiceList choices={question.choices ?? []} />
            <label className="question-entry__limit">
                <span className="question-entry__limit-label">期限</span>
                <input
                    className="question-entry__limit-input"
                    type="datetime-local"
                    required
                    min={formatLocalDatetime(new Date())}
                    defaultValue={formatLocalDatetime(new Date(question.limit))}
                />
            </label>
            <button type="submit" className="question-entry__entry">
                登録
            </button>
        </form>
    );
};

export default QuestionEntry;
