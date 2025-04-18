export type UserModel = {
    id: number;
    username: string;
    created_at?: Date;
    budget?: number;
    currency_id?: number;
}

export type UserModelColumn = keyof UserModel;

export const userModelColumns: UserModelColumn[] = [
    "id",
    "username",
    "created_at",
    "budget",
    "currency_id"
];

export const userModelColumnSet: Set<UserModelColumn> = new Set(userModelColumns);
