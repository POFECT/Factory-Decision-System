import React from "react";
import { useState } from "react";
import ChatMessage from "../chat-bot/ChatMessage.js";

const QuestionChatBot = (props) => {
    const [messageToShow, setMessageToShow] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const updatedQuestions = props.questions.map((options) => {
        return {
            ...options,
            handler: () => props.actionProvider.handleMessage(options.answer),
        };
    });

    const onClickButton = (option) => {
        setMessageToShow(<ChatMessage message={option.questions} isBot={false} />);
        setShowMessage(true);
        if (option.questions === "처음으로") {
            props.actionProvider.handleWidget("메뉴 중 ", "options")
        } 
        else if (option.underWidget !== undefined) {
            props.actionProvider.handleUnderWidget(option.answer, option.underWidget);
        } else if(option.withApi === "week"){
            props.actionProvider.handleWeekApi(option.answer, option.flagList);
        } else if(option.withApi === "lotSm"){
            props.actionProvider.handleLotSmApi(option.answer);
        }
        else {
            props.actionProvider.handleMessage(option.answer);
        }
    }


    const buttonsMarkup = updatedQuestions.map((option) => (
        <button
            style={{
                margin: 5,
                borderRadius: 25,
                padding: 8,
                borderColor: 'cornflowerblue',
                background: 'transparent',
                textAlign: 'center',
                fontFamily: 'TheJamsil5Bold',
            }}
            key={option.id} onClick={() => { onClickButton(option); option.handler }} className="option-button">
            {option.questions}
        </button>
    ));

    return (
        <div>
            {!showMessage && (
                <div className="options-container">{buttonsMarkup}</div>
            )}
            {showMessage && (
                <div className="message-container">{messageToShow}</div>
            )}

        </div>
    );
};

export default QuestionChatBot;