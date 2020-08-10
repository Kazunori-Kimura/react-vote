export interface IQuestionCreateParams {
    question: string;
    limit: string;
    choices: IChoice[];
}

export interface IQuestion extends IQuestionCreateParams {
    id: number;
    createdBy?: number;
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

export interface IUserCreateParams {
    email: string;
    name: string;
    password: string;
}

export interface IUser extends IUserCreateParams {
    id: number;
    token?: string;
}

export interface IAuthenticateParams {
    email: string;
    password: string;
}
