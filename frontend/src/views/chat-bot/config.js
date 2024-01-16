import { createChatBotMessage } from "react-chatbot-kit";
import styled from "styled-components";
import ChatMessage from "../chat-bot/ChatMessage.js";
import Options from "../chat-bot/Options.js";
import QuestionChatBot from "./QuestionChatBot.js";
import { useState } from "react";

const HeaderContainer = styled.div`
  background: rgb(92, 130, 255);
  background: linear-gradient(
    90deg,
    rgba(157, 92, 255, 1) 0%,
    rgba(92, 130, 255, 1) 100%
  );
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.4rem;

  .ri-close-line {
    font-size: 1.5rem;
    color: #ffffff;
    cursor: pointer;
  }
`;


const config = {
  botName: "Pofect-ChatBot",
  initialMessages: [
    createChatBotMessage(`메뉴 중 무엇이 궁금하신가요?`,
      {
        widget: "options",
      }),
    // createChatBotMessage(`안녕하세요 Pofect 챗봇입니다. 궁금한 것이 있으신가요?`)
    
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
            answer: "가능통과공장설계에서는 각종 기준(경유 공정, 사이즈, 필수재)들을 적용해서 교집합으로 가통 코드를 설계합니다.",
            id: 1,
          },
          {
            questions: "출강주",
            answer: "출강주란 한 주의 주문을 받아서 처리하는 단위입니다.",
            underWidget: "mainWeekChatBot",
            id: 2,
          },
          {
            questions: "진행단계",
            answer: "기능통과공장 설계에 대한 진행단계는 다음과 같습니다. \n\n " +
            "A: 주문 최초 편성 대상 \n B: 가능통과공장 정상 설계 \n C: 가능통과설계 에러\n",
            // underWidget: "mainCodeChatBot",
            id: 3,
          },
          {
            questions: "에러코드",
            answer: "가능통과공장에 대한 에러코드는 다음과 같습니다.",
            underWidget: "mainErrorChatBot",
            id: 4,
          },
          {
            questions: "확정처리",
            answer: "가틍통과공장이 설계된 주문 건을 확정하는 것으로 확정처리 할 주문들을 선택하여 오른쪽 위 확정처리 버튼을 클릭하여 확정합니다.\n 확정처리 이후에는 취소가 불가합니다.",
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
      widgetName: "mainErrorChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      widgetName: "mainErrorChatBot",
      props: {
        questions: [
          {
            questions: "PP",
            answer: "PP: 필수재와 사이즈 기준의 교집합이 존재하나 불가한 상태 \n\n"
            + "현재 해당 에러코드를 가진 주문번호는 아래와 같습니다.\n",
            withApi: "errorCode",
            id: 1,
          },
          {
            questions: "PF",
            answer: "PF: 사이즈 기준 부적합 \n\n"
            + "현재 해당 에러코드를 가진 주문번호는 아래와 같습니다.\n",
            withApi: "errorCode",
            id: 2,
          },
          {
            questions: "FP",
            answer: "FP: 필수재 부적합 \n\n"
            + "현재 해당 에러코드를 가진 주문번호는 아래와 같습니다.\n",
            withApi: "errorCode",
            id: 3,
          },
          {
            questions: "FF",
            answer: "FF: 사이즈, 필수재 부적합 \n\n"
            + "현재 해당 에러코드를 가진 주문번호는 아래와 같습니다.\n",
            withApi: "errorCode",
            id: 4,
          },
          {
            questions: "CC",
            answer: "CC: 사이즈, 필수재 모두 적합하나 교집합 없음 \n\n"
            + "현재 해당 에러코드를 가진 주문번호는 아래와 같습니다.\n",
            withApi: "errorCode",
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
      widgetName: "mainWeekChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      widgetName: "mainWeekChatBot",
      props: {
        questions: [
          {
            questions: "현재 출강주",
            answer: " 아래는 기능통과공장 설계의 현재 출강주입니다.",
            withApi: "week",
            flagList: ["A","B","C"],
            id: 1,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 2,
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
            answer: "공장결정 가능통과공정 코드를 기반으로 확정통과공정 코드를 부여하고 공장을 결정합니다.",
            id: 1,
          },
          {
            questions: "출강주",
            answer: "출강주란 한 주의 주문을 받아서 처리하는 단위입니다.",
            underWidget: "factoryWeekChatBot",
            id: 2,
          },
          {
            questions: "진행단계",
            answer: "공장 결정에 대한 진행단계는 다음과 같습니다. \n\n " +
            "D: 가능통과공장 확정 \n E: 공장확정 및 투입대기 상태 \n F: 기투입 상태",
            // underWidget: "mainCodeChatBot",
            id: 3,
          },
          {
            questions: "공장부여와 제조투입",
            answer: "공장부여란 가능통과공정코드를 기반으로 실제로 제작할 공장의 확정코드를 부여합니다.\n\n 제조투입은 확정공정코드가 부여된 후 주문을 투여하는 것 입니다.",
            id: 4,
          },
          {
            questions: "공장변경",
            answer: "밑에서 결정된 공장을 확인하고 여유 능력치를 체크하여 공장을 수기로 변경할 수 있습니다.",
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
      widgetName: "factoryWeekChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      widgetName: "factoryWeekChatBot",
      props: {
        questions: [
          {
            questions: "현재 출강주",
            answer: "아래는 현재 존재하는 공장 결정의 출강주입니다.",
            withApi: "week",
            flagList: ["E","F"],
            id: 1,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 2,
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
            answer: "투입능력관리에서는 투입 능력량을 관리하고 공장 배분 정보를 실시간 반영하여 가능한 잔량을 확인할 수 있습니다.",
            id: 1,
          },
          {
            questions: "능력량",
            answer: "능력량이란 공장이 가지고 있는 기본 능력량입니다.",
            id: 2,
          },
          {
            questions: "조정량",
            answer: "조정량이란 출강주 별 조정이 가능한 능력량입니다.",
            id: 3,
          },
          {
            questions: "투입량",
            answer: "투입량이란 출강주 별 투입 예정인 주문 진행량입니다.",
            id: 4,
          },
          {
            questions: "잔여량",
            answer: "잔여량이란 조정량에서 투입량을 뺀 값으로 앞으로 더 투입할 수 있는 값입니다.",
            id: 5,
          },
          {
            questions: "히트맵",
            answer: "오른쪽 화면의 히트맵은 공장 부하 정도를 나타내는 차트로 색이 진할수록 부하가 심한 상태입니댜.",
            id: 6,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 7,
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
            answer: "사이즈 기준에서 공정/공장별 통과할 수 있는 기준들을 확인할 수 있습니다.",
            id: 1,
          },
          {
            questions: "사이즈 기준 수정",
            answer: "사이즈 기준 수정은 수정하려는 값을 더블클릭하여 수정 후 저장 버튼을 클릭하여 수정합니다.\n\n"
            + "만약 수정이 되지 않는다면 데이터를 다시 확인해주세요.\n"
            + "ex) min값이 max값보다 큰 경우\n"
            + "\t숫자 외의 데이터가 들어갔을 경우\n\n"
            +"사이즈 기준은 추가, 삭제가 불가합니다.",
            id: 2,
          },
          {
            questions: "임시설계",
            answer: "사이즈 기준 임시 설계는 두께와 폭, 길이, 단중을 입력하면 수치에 따른 공정별 공장을 보여줍니다.",
            id: 3,
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
            answer: "필수재 기준에서는 제품의 공정에 따라서 필수재 기준들을 표시합니다.\n\n"
            + "박판계획공정별(열연, 열연정정, 냉각압연, 1차소둔, 2차소둔, 도금, 정정)에 따라 품종, 품명, 고객사코드, "
            + "주문용도지정코드,  제품두께, 제품주문폭, 제품규격약호, 판매고객사지역대분류구분, 출강목표번호, 주문제품후처리방법지정코드에 "
            + "기재된 연산자들에 맞게 값들을 비교하여 통과하면 박판 가능통과공장 코드를 반환하게 됩니다.",
            id: 1,
          },
          {
            questions: "필수재 추가",
            answer: "페이지 기준 추가 버튼을 눌러 기준을 추가합니다.\n"
            + "필수재를 추가할 때 법인, 공정계획박판Mill구분, 공정계획 필수재변경 관리번호, 일련번호, 박판계획공정구분은 필수로 포함되어야 합니다.\n\n"
            + "필수재 기준에서 수정과 삭제는 불가능합니다.",
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
            answer: "가능/확통 기준에서는 공정별로 가통 코드에 대응하는 공장 리스트와 공장마다 가능한 공정들을 확인할 수 있습니다.",
            id: 1,
          },
          {
            questions: "가통코드 변경 방법",
            answer: "변경하고자 하는 코드를 더블클릭하면 현재 선택된 공장만 체크 된 상태로 보여집니다. \n"
            + "체크 상태를 변경하여 저장 버튼을 누르면 가통 코드가 변경됩니다. \n 이 때, 이미 존재하는 조합은 저장할 수 없습니다.\n\n"
            + "가능통과공장코드 추가와 삭제는 불가합니다.",
            id: 2,
          },
          {
            questions: "경유공정기준",
            answer: "경유 공정 기준은 품명 별 필요한 공정들을 확인할 수 있습니다.",
            id: 3,
          },
          {
            questions: "경유공정 추가",
            answer: "경유공정 추가하는 방법은 ~ 입니다.",
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
      widgetName: "dashChatBot",
      widgetFunc: (props) => <QuestionChatBot {...props} />,
      props: {
        widgetName: "dashChatBot",
        questions: [
          {
            questions: "출강주 별 공장 투입 건수",
            answer: "출강주 별 공장 투입 건수를 히트맵으로 확인할 수 있습니다.",
            id: 1,
          },
          {
            questions: "주문 조회",
            answer: "간단한 주문 조회 표로 확인할 수 있습니다. ",
            id: 2,
          },
          {
            questions: "품종별 투입 현황",
            answer: "품종별 투입 현황 품종별로 투입 현황을 그래프로 확인할 수 있습니다.",
            id: 3,
          },
          {
            questions: "공장 부하 현황",
            answer: "공장 부하 현황 ~?",
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
            answer: "출강Lot에서는 투입대기, 기투입 상태(E, F)의 투입량 집계를 확인할 수 있습니다.\n\n"
            + "맨 위 행은 길이, 두번째 행은 제강 공장입니다.",
            id: 1,
          },
          {
            questions: "차트",
            answer: "강종 컬럼을 선택하여 클릭시 각 강종별 차트를 볼 수 있습니다.\n"
            + "오른쪽 위 차트보기 버튼을 클릭하면 전체 차트를 볼 수 있습니다.",
            id: 2,
          },
          {
            questions: "강종 리스트",
            withApi: "lotSm",
            answer: "아래는 현재 강종 리스트입니다.",
            id: 3,
          },
          {
            questions: "처음으로",
            answer: "",
            id: 4,
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
      },
    },
  ],

  customComponents: {
    header: (props) => {
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