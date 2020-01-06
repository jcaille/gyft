import { Card, Elevation, H3, H5, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import { GiftListCreator } from "../components/giftListCreator";
import { GiftListDatasource } from "../datasource";

interface IHomepageProps {
    datasource: GiftListDatasource;
}

export class Homepage extends React.Component<IHomepageProps> {
    public render() {
        return (
            <div>
                <div className="description-column-container">
                    <Card elevation={Elevation.TWO} className="description-card">
                        <Icon icon={IconNames.PEOPLE} iconSize={40} />
                        <H5>Create and collaborate on gift lists</H5>
                    </Card>
                    <Card elevation={Elevation.TWO} className="description-card">
                        <Icon icon={IconNames.SHOP} iconSize={40} />
                        <H5>Everyone can contribute an idea or select a gift to give</H5>
                    </Card>
                    <Card elevation={Elevation.TWO} className="description-card">
                        <Icon icon={IconNames.HEART} iconSize={40} />
                        <H5>Never offer a duplicate gift again</H5>
                    </Card>
                </div>
                <Card elevation={Elevation.FOUR} className="gift-list-creator-container">
                    <H3>Start by creating a new list</H3>
                    <GiftListCreator datasource={this.props.datasource} />
                </Card>
            </div>
        );
    }
}
