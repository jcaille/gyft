import axios from "axios";
import { IGiftList, IGiftListCreationPayload } from "./types";
import { LoadingOr } from "./utils/loading"
export class GiftListDatasource {
    private rootURL: string;

    constructor(rootURL: string) {
        this.rootURL = rootURL;
    }

    public async createNewGiftList(payload: IGiftListCreationPayload): Promise<IGiftList> {
        const response = await axios.post(this.constructURL("/api/gift-lists/"), payload);
        return response.data;
    }

    public async getGiftListForOwner(giftListSlug: string): Promise<IGiftList> {
        const response = await axios.get(this.constructURL(`/api/gift-lists/owner/${giftListSlug}`));
        return response.data;
    }

    private constructURL(path: string) {
        return this.rootURL + path;
    }
}