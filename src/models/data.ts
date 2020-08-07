import { IUser, IQuestion } from '.';

export const user: IUser = {
    id: 1,
    email: 'kimura-kazunori@example.com',
    name: '木村 憲規',
    password: 'secret',
    token: 'abc123',
};

export const questions: IQuestion[] = [
    {
        id: 2,
        question: 'あなたの年齢を教えてください',
        limit: '2020-11-01T00:00:00.000Z',
        createdBy: 1,
        choices: [
            { id: 1, questionId: 2, content: '10才未満' },
            { id: 2, questionId: 2, content: '11 〜 20' },
            { id: 3, questionId: 2, content: '21 〜 30' },
            { id: 4, questionId: 2, content: '31 〜 40' },
            { id: 5, questionId: 2, content: '41才以上' },
        ],
        votes: [
            { id: 1, questionId: 2, choiceId: 1, votedBy: 2 },
            { id: 2, questionId: 2, choiceId: 1, votedBy: 3 },
            { id: 3, questionId: 2, choiceId: 1, votedBy: 4 },
            { id: 4, questionId: 2, choiceId: 1, votedBy: 5 },
            { id: 5, questionId: 2, choiceId: 1, votedBy: 6 },
        ],
    },
    {
        id: 1,
        question: 'きのこ派？たけのこ派？',
        limit: '2020-07-01T00:00:00.000Z',
        createdBy: 2,
        choices: [
            { id: 1, questionId: 1, content: 'きのこ' },
            { id: 2, questionId: 1, content: 'たけのこ' },
        ],
        votes: [
            { id: 1, questionId: 1, choiceId: 2, votedBy: 1 },
            { id: 2, questionId: 1, choiceId: 2, votedBy: 2 },
            { id: 3, questionId: 1, choiceId: 2, votedBy: 3 },
            { id: 4, questionId: 1, choiceId: 2, votedBy: 4 },
            { id: 5, questionId: 1, choiceId: 2, votedBy: 5 },
            { id: 6, questionId: 1, choiceId: 2, votedBy: 6 },
            { id: 7, questionId: 1, choiceId: 2, votedBy: 7 },
            { id: 8, questionId: 1, choiceId: 2, votedBy: 8 },
            { id: 9, questionId: 1, choiceId: 2, votedBy: 9 },
            { id: 10, questionId: 1, choiceId: 2, votedBy: 10 },
            { id: 11, questionId: 1, choiceId: 2, votedBy: 11 },
            { id: 12, questionId: 1, choiceId: 1, votedBy: 12 },
            { id: 13, questionId: 1, choiceId: 1, votedBy: 13 },
            { id: 14, questionId: 1, choiceId: 1, votedBy: 14 },
            { id: 15, questionId: 1, choiceId: 1, votedBy: 15 },
        ],
    },
];

export const questionEntry: IQuestion = {
    id: 0,
    question: '朝食は何派？',
    limit: '2020-11-01T00:00:00.000Z',
    choices: [
        { id: 1, content: 'パン派' },
        { id: 2, content: '米派' },
        { id: 3, content: 'たべない' },
    ],
};
