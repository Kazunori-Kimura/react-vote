export interface IQuestion {
    id: number;
    question: string;
    limit: string;
    createdBy?: number;
    choices?: IChoice[];
    votes?: IVote[];
}

export interface IChoice {
    id: number;
    questionId?: number;
    content: string;
}

export interface IVote {
    id: number;
    questionId: number;
    choiceId: number;
    votedBy?: number;
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
    token?: string;
}
