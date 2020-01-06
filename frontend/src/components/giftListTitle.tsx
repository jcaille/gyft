import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { IGiftList } from "../types";
import { LoadingOr, getOptionalValue, isLoaded } from "../utils/loading";

interface IGiftListTitleProps {
    giftList: LoadingOr<IGiftList>;
}

export class GiftListTitle extends React.Component<IGiftListTitleProps> {
    public render() {
        const clazz = isLoaded(this.props.giftList) ? null : Classes.SKELETON;
        return <div>
            <div>
                <span className={classNames(clazz)}>
                    {getOptionalValue(this.props.giftList)?.title || "SKELETON_TITLE"}
                </span> for <span className={classNames(clazz)}>
                    {getOptionalValue(this.props.giftList)?.recipient || "SKELETON_RECIPIENT"}
                </span>
            </div>
            <div>
                Created by <span className={classNames(clazz)}>
                    {getOptionalValue(this.props.giftList)?.created_by || "SKELETON_CREATOR"}
                </span> on <span className={classNames(clazz)}>
                    {getOptionalValue(this.props.giftList)?.created_on || "SKELETON_CREATED_DATE"}
                </span>
            </div>
        </div>;
    }
}
