import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    const handleTypingMessage = (messaage) => {
        const botMessage = createChatBotMessage(messaage);
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      };

    const handleMessage = (test) => {
        const botMessage = createChatBotMessage(test,
            {
                widget: "startChatbot"
            });

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    }

    const handleWidget = (name, widgetName) => {
        console.log(widgetName);
        const message = createChatBotMessage(
            name + "에 대해 무엇이 궁금하신가요?",
            {
                widget: widgetName,
            }
        );

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));

    }

    const handleNoContent = () => {
        const botMessage = createChatBotMessage('죄송합니다. 모르는 정보입니다.');

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    }

    // Put the handleHello function in the actions object to pass to the MessageParser
    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleTypingMessage,
                        handleMessage,
                        handleWidget,
                        handleNoContent
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;