export interface IUser {
    id: number;
    name: string;
    email: string
};

export interface HomeProps<T> {
    items: T[]
}