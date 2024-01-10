import React from "react";
import { useState } from "react";
import ChatMessage from "../chat-bot/ChatMessage.js";


const Options = (props) => {
    const [messageToShow, setMessageToShow] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const options = [
        {
            text: "가능통과공장설계",
            handler: () => props.actionProvider.handleWidget("가능통과공장설계", "mainChatBot"),
            widgetName: "mainChatBot",
            id: 1,
        },
        { text: "공장결정", handler: () => props.actionProvider.handleWidget("공장결정", "factoryChatBot"), widgetName: "factoryChatBot",id: 2 },
        { text: "투입 능력 관리", handler: () => props.actionProvider.handleWidget("투입 능력 관리", "capacityChatBot"), widgetName: "capacityChatBot",id: 3 },
        { text: "사이즈 기준", handler: () => props.actionProvider.handleWidget("사이즈 기준", "sizeChatBot"), widgetName: "sizeChatBot", id: 4 },
        { text: "필수재 기준", handler: () => props.actionProvider.handleWidget("필수재 기준", "essentialChatBot"), widgetName: "essentialChatBot", id: 5 },
        { text: "가능/확통 기준", handler: () => props.actionProvider.handleWidget("가능/확통 기준", "passChatBot"), widgetName: "passChatBot", id: 6 },
        { text: "출강Lot", handler: () => props.actionProvider.handleWidget("출강Lot", "lotChatBot"), widgetName: "lotChatBot", id: 7 },
    ];

    const onClickButton = (option) => {
        setMessageToShow(<ChatMessage message={option.text} isBot={false} />);
        setShowMessage(true);
        if (option.questions === "처음으로") {
            props.actionProvider.handleWidget("메뉴 중 ", "options")
        }
        else {
            props.actionProvider.handleWidget(option.text, option.widgetName);

        }
        // props.actionProvider.handleWidget(option.text, 'mainChatBot');
    }
    const buttonsMarkup = options.map((option) => (
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
            {option.text}
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

export default Options;