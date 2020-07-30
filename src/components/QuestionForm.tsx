import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Choice, Question } from '../models';
import { clone } from '../utils';
import './QuestionForm.css';

const USER_ID = 1;

interface QuestionFormProps {
    question?: Question;
    onSubmit: (question: Question) => void;
    onCancel: VoidFunction;
}

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
const QuestionForm: React.FC<QuestionFormProps> = ({
    question: beforeQuestion,
    onSubmit,
    onCancel,
}) => {
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
            const newChoices = clone(choices);
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
        const newChoices = clone(choices);
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
     * 各stateを初期状態に戻す
     */
    const resetState = () => {
        setQuestion('');
        setChoices(initialChoices);
        setLimit('');
    };

    /**
     * キャンセルボタンのクリック
     */
    const handleClickCancel = () => {
        // フォームをクリア
        resetState();
        // キャンセル処理
        onCancel();
    };

    /**
     * フォームのsubmit
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        // デフォルトのsubmitの動作をキャンセル
        event.preventDefault();
        event.stopPropagation();

        const isValid = event.currentTarget.checkValidity();
        if (isValid) {
            // questionを組み立て
            const q: Question = {
                id: 0,
                question,
                choices,
                limit,
                createdBy: USER_ID,
            };

            if (beforeQuestion) {
                // 更新時は id を引き継ぐ
                q.id = beforeQuestion.id;
            }

            // 親に値を返す
            onSubmit(clone(q));
            // フォームをクリア
            resetState();
        }
    };

    // propsにquestionが渡されたらstateにセットする
    useEffect(() => {
        if (beforeQuestion) {
            const q = clone(beforeQuestion);
            setQuestion(q.question);
            setChoices(q.choices || initialChoices);
            setLimit(q.limit);
        }
    }, [beforeQuestion]);

    return (
        <form className="question-form" onSubmit={handleSubmit}>
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
                    onClick={handleClickCancel}
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
