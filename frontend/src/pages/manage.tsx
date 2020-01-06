import React from "react";
import { useRouteMatch, withRouter, RouteComponentProps } from "react-router-dom";

interface IManagePageParameters {
    slug: string;
}

type IManagePageProps = RouteComponentProps<IManagePageParameters>

class UnconnectedManagePage extends React.Component<IManagePageProps> {
    public render() {
        const params = this.props.match.params;
        const slug = params.slug;
        return <h2> This is the manage page for {params.slug} ! </h2>;
    }
}

export const ManagePage = withRouter(UnconnectedManagePage);