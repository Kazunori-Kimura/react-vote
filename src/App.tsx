import React from 'react';
import './App.css';
import Header from './components/Header';
import QuestionEntry from './components/QuestionEntry';
import SignUp from './components/SignUp';
import QuestionList from './components/QuestionList';
// 仮に静的なデータを使用する
import { user, questionEntry, questions } from './models/data';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header user={user} />
            <div className="App__contents">
                <div className="App__content-item">
                    {user ? <QuestionEntry question={questionEntry} /> : <SignUp user={user} />}
                </div>
                <div className="App__content-item">
                    <QuestionList questions={questions} user={user} />
                </div>
            </div>
        </div>
    );
};

export default App;
