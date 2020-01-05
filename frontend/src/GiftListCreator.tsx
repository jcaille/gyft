import { Button, Callout, FormGroup, InputGroup, Intent, Spinner, TextArea } from "@blueprintjs/core";
import React from "react";
import { GiftListDatasource } from "./datasource";
import { IGiftListCreationPayload } from "./types";

enum CreatorState {
    PROMPTING,
    FORM,
    SUBMITTED,
}

interface IGiftListCreatorState {
    currentState: CreatorState;
    recipient: string;
    title: string;
    description: string;
    created_by: string;
}

interface IGiftListCreatorProps {
    datasource: GiftListDatasource;
}

export class GiftListCreator extends React.Component<IGiftListCreatorProps, IGiftListCreatorState> {

    constructor(props: IGiftListCreatorProps) {
        super(props);
        this.state = {
            created_by: "",
            currentState: CreatorState.FORM,
            description: "",
            recipient: "",
            title: "",
        };
    }

    public render() {
        let content;
        switch (this.state.currentState) {
            case CreatorState.PROMPTING:
                content = this.renderButton();
                break;
            default:
                content = this.renderForm();
        }

        return <div>{content}</div>;
    }

    public renderButton() {
        return <Button
            onClick={() => this.setState({ currentState: CreatorState.FORM })}>
            Create a list!
            </Button >;
    }

    public renderForm() {
        const { currentState, recipient } = this.state;
        const disabled = currentState === CreatorState.SUBMITTED;
        const buttonContent = currentState === CreatorState.FORM ?
            `Create a gift list for ${recipient || "..."}` :
            <Spinner />;
        return <div>
            <form onSubmit={this.submit}>
                <FormGroup
                    label="Recipient"
                    labelFor="recipient-input"
                    labelInfo="(required)">
                    <InputGroup id="recipient-input"
                        placeholder="Jean"
                        onChange={this.handleRecipientChange}
                        value={this.state.recipient}
                        disabled={disabled} />
                </FormGroup>
                <FormGroup
                    label="Title"
                    labelFor="title-input"
                    labelInfo="(required)">
                    <InputGroup id="title-input"
                        placeholder="Christmas"
                        onChange={this.handleTitleChange}
                        value={this.state.title}
                        disabled={disabled} />
                </FormGroup>
                <FormGroup
                    label="Additional information"
                    labelFor="description-input">
                    <TextArea
                        id="description-input"
                        placeholder="Jean has had a nice year, let's celebrate together"
                        fill={true}
                        onChange={this.handleDescriptionChange}
                        value={this.state.description}
                        disabled={disabled} />
                </FormGroup>
                <FormGroup
                    label="Who are you?"
                    labelFor="creator-input">
                    <InputGroup
                        id="creator-input"
                        placeholder="Alida"
                        onChange={this.handleCreatorChange}
                        value={this.state.created_by}
                        disabled={disabled} />
                </FormGroup>
                <div className="gift-creator-validation-row">
                    {/* <Callout intent={Intent.WARNING}>
                        There is a problem with the form
                    </Callout> */}
                    <Button
                        type="submit"
                        disabled={!this.isFormValid() || disabled}
                        loading={currentState === CreatorState.SUBMITTED}
                    >
                        Create a gift list for {recipient || "..."}
                    </Button>
                </div>

            </form>
        </div >;
    }

    /* Form handling */

    private handleCreatorChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ created_by: (event.target as HTMLInputElement).value });
    }

    private handleRecipientChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ recipient: (event.target as HTMLInputElement).value });
    }

    private handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ title: (event.target as HTMLInputElement).value });
    }

    private handleDescriptionChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        this.setState({ description: (event.target as HTMLTextAreaElement).value });
    }

    private isFormValid() {
        const { recipient, title, created_by, description } = this.state;
        return recipient.trim().length > 0
            && title.trim().length > 0
            && created_by.trim().length > 0
            && description.trim().length > 0;
    }

    private submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { recipient, title, created_by, description } = this.state;
        const { datasource } = this.props;
        this.setState({ currentState: CreatorState.SUBMITTED });
        const payload: IGiftListCreationPayload = {
            created_by,
            description,
            recipient,
            title,
        };
        datasource.createNewGiftList(payload)
            .then((data) => {
                console.log(data);
            })
            .catch(
                (error) => {
                    console.log(error);
                    this.setState({ currentState: CreatorState.FORM });
                },
            );
    }
}
