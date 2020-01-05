export interface IGiftBase {
    uuid: string;
    title: string;
    description: string;
    cost: number;
    list_uuid: string;
    created_on: string; // Iso 8601 datetime
    created_by: string;
}

export interface IIncompleteGift extends IGiftBase {
    completed: false;
}

export interface ICompleteGift extends IGiftBase {
    completed: true;
    completed_by: string;
    completed_on: string; // Iso 8601 datetime
}

export type IGift = IIncompleteGift | ICompleteGift;

export interface IGiftListCreationPayload {
    title: string;
    recipient: string;
    description: string;
    created_by: string;
}

export interface IGiftList {
    uuid: string;
    owner_link?: string;
    contributor_link?: string;
    recipient_link?: string;

    title: string;
    recipient: string;
    description: string;

    created_on: string; // Iso 8601 datetime
    created_by: string;
}

export function isCompletedGift(x: IGift): x is ICompleteGift {
    return x.completed;
}
