import React from "react";
import { useState } from "react";
import MainApi from "/api/MainApi";
import LotApi from "/api/LotApi";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleTypingMessage = (messaage) => {
    const botMessage = createChatBotMessage(messaage);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleMessage = (name) => {
    const botMessage = createChatBotMessage(name, {
      widget: "startChatbot",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleUnderWidget = (answer, widgetName) => {
    console.log(widgetName);
    const message = createChatBotMessage(answer, {
      widget: widgetName,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleWidget = (name, widgetName) => {
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
  };

  const handleWeekApi = (answer, flagList) => {
    MainApi.getWeekList("H", flagList, (data) => {
      const list = data.response;
      const messageText = list.map((item) => `${item}`).join("\n");
      const message = createChatBotMessage(answer + " \n\n" + messageText, {
        widget: "startChatbot",
      });

      if (list.length == 0) {
        message = createChatBotMessage("현재 출강주는 없습니다.", {
          widget: "startChatbot",
        });
      }
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    });
  };

  const handleLotSmApi = (answer) => {
    LotApi.getSmList((data) => {
      const list = data.response;
      const messageText = list.map((item) => `${item}`).join("\n");
      const message = createChatBotMessage(
        answer +
          " \n\n" +
          messageText +
          "\n\n" +
          "총 " +
          list.length +
          "개 입니다.",
        {
          widget: "startChatbot",
        }
      );

      if (list.length == 0) {
        message = createChatBotMessage(
          "해당 에러코드를 가진 주문이 없습니다.",
          {
            widget: "startChatbot",
          }
        );
      }
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    });
  };

  const handleErrorCodeApi = (answer, questions) => {
    MainApi.getErrorCodeList(questions, (data) => {
      const list = data.response;
      const messageText = list.map((item) => `${item}`).join("\n");
      const message = createChatBotMessage(
        answer +
          " \n\n" +
          messageText +
          "\n\n" +
          "총 " +
          list.length +
          "개 입니다.",
        {
          widget: "startChatbot",
        }
      );

      if (list.length == 0) {
        message = createChatBotMessage("현재 강종는 없습니다.", {
          widget: "startChatbot",
        });
      }
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    });
  };

  const handleNoContent = () => {
    const botMessage = createChatBotMessage("죄송합니다. 모르는 정보입니다.");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleTypingMessage,
            handleMessage,
            handleWidget,
            handleNoContent,
            handleWeekApi,
            handleUnderWidget,
            handleLotSmApi,
            handleErrorCodeApi,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
