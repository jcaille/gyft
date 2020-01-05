import { Button, FormGroup, InputGroup, TextArea, Spinner } from "@blueprintjs/core";
import React from "react";

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
    creator: string;
}

interface IGiftListCreatorProps {

}

export class GiftListCreator extends React.Component<IGiftListCreatorProps, IGiftListCreatorState> {

    constructor(props: IGiftListCreatorProps) {
        super(props);
        this.state = {
            creator: "",
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
            <Spinner />
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
                        value={this.state.creator}
                        disabled={disabled} />
                </FormGroup>

                <Button
                    type="submit"
                    disabled={!this.isFormValid() || disabled}
                    loading={currentState === CreatorState.SUBMITTED}
                >
                    Create a gift list for {recipient || "..."}
                </Button>
            </form>
        </div >;
    }

    public renderSpinner() {
        return <Spinner />;
    }

    /* Form handling */

    private handleCreatorChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ creator: (event.target as HTMLInputElement).value });
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
        const { recipient, title, creator } = this.state;
        return recipient.trim().length > 0 && title.trim().length > 0 && creator.trim().length > 0;
    }

    private submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({ currentState: CreatorState.SUBMITTED });
        console.log(this.state);
    }
}
