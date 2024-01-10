import { createChatBotMessage } from "react-chatbot-kit";
import styled from "styled-components";
import ChatMessage from "../chat-bot/ChatMessage.js";
import Options from "../chat-bot/Options.js";
import QuestionChatBot from "./QuestionChatBot.js";

const CloseButton = styled.i`
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;
`;

const config = {
  botName: "Pofect-ChatBot",
  initialMessages: [
    createChatBotMessage(`메뉴 중 무엇이 궁금하신가요?`,
      {
        widget: "options",
      }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />
    },
    {
      widgetName: "mainChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      widgetName: "mainChatBot",
      props: {
        questions: [
          {
            questions: "가능통과공장설계",
            answer: "가능통과공장설계에서는 ~ 합니다.",
            id: 1,
          },
          {
            questions: "출강주",
            answer: "출강주란 ~ 입니다.",
            id: 2,
          },
          {
            questions: "진행단계",
            answer: "진행단계란 ~ 입니다.",
            id: 3,
          },
          {
            questions: "에러코드",
            answer: "에러코드란 ~ 입니다.",
            id: 4,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 5,
          },
        ],
      }

    },
    {
      widgetName: "factoryChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      props: {
        widgetName: "factoryChatBot",
        questions: [
          {
            questions: "공장결정",
            answer: "공장결정에서는 ~ 입니다.",
            id: 1,
          },
          {
            questions: "진행단계",
            answer: "진행단계란 ~ 뭐입니다.",
            id: 2,
          },
          {
            questions: "공장부여와 제조투입",
            answer: "공장부여와 제조투입은 ~ 입니다.",
            id: 3,
          },
          {
            questions: "확정통과공정",
            answer: "확정통과공정이란 ~ 입니다.",
            id: 4,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 5,
          },
        ],
      }
    },
    {
      widgetName: "capacityChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      props: {
        widgetName: "capacityChatBot",
        questions: [
          {
            questions: "투입능력관리",
            answer: "투입능력관리에서는 ~ 합니다.",
            id: 1,
          },
          {
            questions: "능력량",
            answer: "능력량이란 ~ 입니다.",
            id: 2,
          },
          {
            questions: "조정량",
            answer: "조정량이란 ~ 입니다.",
            id: 3,
          },
          {
            questions: "투입량",
            answer: "투입량이란 ~ 입니다.",
            id: 4,
          },
          {
            questions: "잔여량",
            answer: "잔여량이란 ~ 입니다.",
            id: 5,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 6,
          },
        ],
      }
    },
    {
      widgetName: "sizeChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      props: {
        widgetName: "sizeChatBot",
        questions: [
          {
            questions: "사이즈 기준",
            answer: "사이즈 기준에서는 ~ 입니다.",
            id: 1,
          },
          {
            questions: "임시설계",
            answer: "임시 설계란 ~ 입니다.",
            id: 2,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 3,
          },
        ],
      }
    },
    {
      widgetName: "essentialChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      props: {
        widgetName: "essentialChatBot",
        questions: [
          {
            questions: "필수재 기준",
            answer: "필수재 기준에서는 ~ 입니다.",
            id: 1,
          },
          {
            questions: "기준 설계 방법",
            answer: "기준을 설계하는 방법은 ~ 입니다.",
            id: 2,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 3,
          },
        ],
      }
    },
    {
      widgetName: "passChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      props: {
        widgetName: "passChatBot",
        questions: [
          {
            questions: "가능/확통 기준",
            answer: "가능/확통 기준에서는 ~ 를 합니다",
            id: 1,
          },
          {
            questions: "가통코드 변경 방법",
            answer: "가통코드 변경 방법은 ~ 입니다",
            id: 2,
          },
          {
            questions: "경유공정기준",
            answer: "경유공정기준는 ~ 입니다.",
            id: 3,
          },
          {
            questions: "경유공중 추가",
            answer: "경유공중 추가하는 방법은 ~ 입니다.",
            id: 4,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 5,
          },
        ],
      }
    },
    {
      widgetName: "lotChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      props: {
        widgetName: "lotChatBot",
        questions: [
          {
            questions: "출강Lot",
            answer: "출강Lot에서는 ~ 입니다.",
            id: 1,
          },
          {
            questions: "강종",
            answer: "강종이란 ~ 입니다.",
            id: 2,
          },
          {
            questions: "기투입",
            answer: "기투입이란 ~ 입니다.",
            id: 3,
          },
          {
            questions: "차트",
            answer: "차트 확인은 ~ 입니다.",
            id: 4,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 5,
          },
        ],
      }
    },
    {
      widgetName: "startChatbot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      props: {
        questions: [
          {
            questions: "처음으로",
            answer: "",
            id: 1,
          },
        ],
      }
    },
  ],

  customComponents: {
    header: (props) => {
        const HeaderContainer = styled.div`
          background: rgb(92, 130, 255);
          background: linear-gradient(
            90deg,
            rgba(157, 92, 255, 1) 0%,
            rgba(92, 130, 255, 1) 100%
          );
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 1.4rem;

          .ri-close-line{
            font-size: 1.5rem;
            color: #ffffff;

          }
        `;
          console.log(props)
      return (
        <HeaderContainer  onClick={props.onClose}>
          {/* <button className="ri-close-line" /> */}
        </HeaderContainer>
      );
    },
    botAvatar: (props) => <div {...props} />,
    userAvatar: (props) => <div {...props} />,
    botChatMessage: (props) => <ChatMessage {...props} isBot={true} />,
    userChatMessage: (props) => <ChatMessage {...props} />,
  },

};


export default config;