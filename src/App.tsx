import React, { useState } from 'react';
import './App.css';
import QuestionForm from './components/QuestionForm';
import { Question } from './models';
import { clone } from './utils';
import QuestionItem from './components/QuestionItem';

const App: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<Question>();

    /**
     * 質問の登録/更新
     */
    const handleSubmit = (question: Question) => {
        const newQuestions = clone(questions);
        if (question.id === 0) {
            // idを採番する
            const ids = newQuestions.map((q) => q.id);
            const id = Math.max(...ids) + 1;
            // questionsの先頭に追加
            setQuestions([
                {
                    ...question,
                    id,
                },
                ...newQuestions,
            ]);
        } else {
            // idを元にindexを取得
            const index = newQuestions.findIndex((q) => q.id === question.id);
            // 該当要素を差し替え
            newQuestions[index] = question;
            // stateを更新
            setQuestions(newQuestions);
        }

        setSelectedQuestion(undefined);
    };

    /**
     * フォームのキャンセル
     */
    const handleCancel = () => {
        // 質問の選択を解除
        setSelectedQuestion(undefined);
    };

    /**
     * 質問の削除
     */
    const handleDelete = (questionId: number) => {
        // eslint-disable-next-line no-alert
        if (window.confirm('このアンケートを削除しても良いですか？')) {
            const newQuestions = questions.filter((q) => q.id !== questionId);
            setQuestions(clone(newQuestions));
        }
    };

    /**
     * 質問の編集
     */
    const handleEdit = (questionId: number) => {
        const question = questions.find((q) => q.id === questionId);
        if (question) {
            setSelectedQuestion(question);
        }
    };

    /**
     * 投票
     */
    const handleVote = (question: Question) => {
        const newQuestions = clone(questions);
        const index = newQuestions.findIndex((q) => q.id === question.id);
        newQuestions[index] = clone(question);
        setQuestions(newQuestions);
    };

    return (
        <div className="App">
            <QuestionForm
                question={selectedQuestion}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />

            <div className="App__list">
                {questions.map((question) => (
                    <QuestionItem
                        key={`question-item-${question.id}`}
                        question={question}
                        active={question.id === selectedQuestion?.id}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onVote={handleVote}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
