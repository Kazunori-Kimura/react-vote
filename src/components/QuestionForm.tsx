import React, { useState, ChangeEvent } from 'react';
import { Choice } from '../models';
import './QuestionForm.css';

/**
 * 選択肢の初期値
 */
const initialChoices: Choice[] = [
    {
        id: 1,
        content: '',
    },
    {
        id: 2,
        content: '',
    },
];

/**
 * 投票の登録フォーム
 */
const QuestionForm: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState(initialChoices);
    const [limit, setLimit] = useState<string>('');

    /**
     * 設問の変更
     * @param event onChangeのEvent Object
     */
    const handleChangeQuestion = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setQuestion(value);
    };

    /**
     * 選択肢の変更
     * @param choiceId 選択肢のid
     */
    const handleChangeChoice = (choiceId: number) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.currentTarget;
            const newChoices = JSON.parse(JSON.stringify(choices)) as Choice[];
            const index = newChoices.findIndex((c) => c.id === choiceId);
            newChoices[index].content = value;
            setChoices(newChoices);
        };
    };

    /**
     * 追加ボタンのクリック
     */
    const handleAddChoice = () => {
        // 末尾に選択肢を追加
        const id = choices[choices.length - 1].id + 1;
        const newChoices = JSON.parse(JSON.stringify(choices)) as Choice[];
        newChoices.push({ id, content: '' });
        setChoices(newChoices);
    };

    /**
     * 投票期限の変更
     * @param event onChangeのEvent Object
     */
    const handleChangeLimit = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setLimit(value);
    };

    /**
     * フォームのクリア
     */
    const handleClickClear = () => {
        setQuestion('');
        setChoices(initialChoices);
        setLimit('');
    };

    return (
        <form className="question-form">
            <input
                type="text"
                className="question-form__question"
                placeholder="質問する"
                required
                maxLength={100}
                value={question}
                onChange={handleChangeQuestion}
            />
            {choices.map((choice, index) => (
                <div key={`choice=${choice.id}`} className="question-form__choice">
                    <input
                        type="text"
                        className="question-form__choice-text"
                        placeholder={`選択肢${index + 1}`}
                        required
                        maxLength={100}
                        value={choice.content}
                        onChange={handleChangeChoice(choice.id)}
                    />
                    {
                        // 最後の選択肢には追加ボタンを配置
                        choices.length - 1 === index && (
                            <button
                                type="button"
                                className="question-form__add-choice"
                                onClick={handleAddChoice}
                            >
                                追加
                            </button>
                        )
                    }
                </div>
            ))}
            <div className="question-form__limit">
                <label className="question-form__limit-label" htmlFor="limit">
                    投票期間
                </label>
                <input
                    type="datetime-local"
                    className="question-form__limit-text"
                    id="limit"
                    required
                    value={limit}
                    onChange={handleChangeLimit}
                />
            </div>
            <div className="question-form__footer">
                <button
                    type="button"
                    className="question-form__footer-button"
                    onClick={handleClickClear}
                >
                    キャンセル
                </button>
                <button type="submit" className="question-form__footer-button">
                    登録する
                </button>
            </div>
        </form>
    );
};

export default QuestionForm;
