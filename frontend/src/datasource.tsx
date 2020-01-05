import axios from "axios";
import { IGiftList, IGiftListCreationPayload } from "./types";

export class GiftListDatasource {
    private rootURL: string;

    constructor(rootURL: string) {
        this.rootURL = rootURL;
    }

    public createNewGiftList(payload: IGiftListCreationPayload): Promise<IGiftList> {
        return axios.post(this.constructURL("/api/gift-lists/"), payload);
    }

    private constructURL(path: string) {
        return this.rootURL + path;
    }
}