import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GiftListTitle } from "../components/giftListTitle";
import { GiftListDatasource } from "../datasource";
import { IGiftList } from "../types";
import { errorOf, loadedOf, LOADING, LoadingOr } from "../utils/loading";
interface IManagePageParameters {
    slug: string;
}

interface IManagePageOwnProps {
    datasource: GiftListDatasource;
}

type IManagePageProps = RouteComponentProps<IManagePageParameters> & IManagePageOwnProps;

interface IManagePageState {
    giftList: LoadingOr<IGiftList>;
}

class UnconnectedManagePage extends React.Component<IManagePageProps, IManagePageState> {

    public constructor(props: IManagePageProps) {
        super(props);
        this.state = {
            giftList: LOADING,
        };
    }

    public async componentDidMount() {
        this.loadGiftList();
    }

    public async componentDidUpdate(prevProps: IManagePageProps) {
        if (this.props !== prevProps) {
            // The slug has changed - let's reload the data
            this.loadGiftList();
        }
    }

    public render() {
        const { match } = this.props;
        const { giftList } = this.state;
        const slug = match.params.slug;
        return (
            <div>
                <GiftListTitle giftList={giftList} />
            </div>
        );
    }

    private async loadGiftList() {
        const { datasource, match } = this.props;
        this.setState({ giftList: LOADING });
        try {
            const giftList = await datasource.getGiftListForOwner(match.params.slug);
            this.setState({ giftList: loadedOf(giftList) });
        } catch (e) {
            this.setState({ giftList: errorOf("Error loading the requested Gift list") });
        }
    }
}

export const ManagePage = withRouter(UnconnectedManagePage);
