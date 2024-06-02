export type News = {
    _id: string;
    newsName: string;
    title: string;
    image: string;
    content: string;
    deleted?: boolean;
    createdAt: string;
    updatedAt?: string;
    __v?: number;
    status?: string;
};

export interface NewsResponse {
    mainNews: News[];
    secondaryNews: News[];
}
