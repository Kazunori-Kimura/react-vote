import React, { useState } from 'react';
import { IChoice } from '../models';
import ChoiceList from './ChoiceList';
import { formatLocalDatetime, clone } from '../utils';

import './QuestionEntry.css';

interface QuestionEntryProps {
    onReflesh: () => void;
}

interface IQuestionEntryState {
    question: string;
    limit: string;
    choices: IChoice[];
}

const initialState: IQuestionEntryState = {
    question: '',
    limit: formatLocalDatetime(new Date()),
    choices: [
        { id: 1, content: '' },
        { id: 2, content: '' },
    ],
};

const QuestionEntry: React.FC<QuestionEntryProps> = ({ onReflesh }) => {
    const [question, setQuestion] = useState(initialState);

    /**
     * 質問の変更
     */
    const handleChangeQuestion = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        const state = {
            ...question,
            [name]: value,
        };
        setQuestion(state);
    };

    /**
     * 期限の変更
     */
    const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        const state = {
            ...question,
            [name]: value,
        };
        setQuestion(state);
    };

    /**
     * 選択肢の変更
     * ChoiceItem の input の name を `${choice.id}-content` とすること
     */
    const handleChangeChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        // name から choiceId を取得
        const choiceId = parseInt(name.replace('-content', ''), 10);
        if (!Number.isNaN(choiceId)) {
            const state = clone(question);
            const index = state.choices.findIndex((c) => c.id === choiceId);
            if (index >= 0) {
                state.choices[index].content = value;
                // state更新
                setQuestion(state);
            }
        }
    };

    /**
     * 選択肢の削除
     * @param choiceId 選択肢のID
     */
    const handleDeleteChoice = (choiceId: number) => {
        const state = clone(question);
        // choicesからchoiceIdが一致する項目を除く
        const choices = state.choices.filter((choice) => choice.id !== choiceId);
        state.choices = choices;
        // stateを更新
        setQuestion(state);
    };

    /**
     * 選択肢の追加
     */
    const handleAddChoice = () => {
        const state = clone(question);
        // 新しいIDを採番する
        const choiceId = Math.max(...state.choices.map((c) => c.id)) + 1;
        const choice = { id: choiceId, content: '' };
        state.choices.push(choice);
        // stateを更新
        setQuestion(state);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (event.currentTarget.checkValidity()) {
            // TODO: questionの登録処理

            // eslint-disable-next-line no-alert
            alert('質問を投稿しました!');

            // stateを初期化
            setQuestion(initialState);
            // 親コンポーネントにQuestionListの更新を依頼
            onReflesh();
        }
    };

    return (
        <form className="question-entry" onSubmit={handleSubmit}>
            <h2 className="question-entry__title">質問を投稿する</h2>
            <textarea
                className="question-entry__question"
                placeholder="質問"
                required
                maxLength={255}
                value={question.question}
                onChange={handleChangeQuestion}
            />
            <ChoiceList
                choices={question.choices ?? []}
                onChange={handleChangeChoice}
                onDelete={handleDeleteChoice}
                onAdd={handleAddChoice}
            />
            <label className="question-entry__limit">
                <span className="question-entry__limit-label">期限</span>
                <input
                    className="question-entry__limit-input"
                    type="datetime-local"
                    required
                    min={formatLocalDatetime(new Date())}
                    value={question.limit}
                    onChange={handleChangeLimit}
                />
            </label>
            <button type="submit" className="question-entry__entry">
                登録
            </button>
        </form>
    );
};

export default QuestionEntry;
