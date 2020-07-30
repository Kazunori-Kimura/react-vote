export interface Question {
    id: number;
    question: string;
    limit: string;
    createdBy?: number;
    createdAt?: string;
    updatedAt?: string;
    choices?: Choice[];
    votes?: Vote[];
}

export interface Choice {
    id: number;
    questionId?: number;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Vote {
    id: number;
    questionId: number;
    choiceId: number;
    votedBy?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    id: number;
    name: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}
