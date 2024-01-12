import React, { useState } from 'react';

const MessageParser = ({ children, actions }) => {
  const [preMessage, setPremessage] = useState("");

  const parse = (message) => {
    const messageFlag = false;
    console.log(message);

    //공통
    if (message.includes('안녕') || message.includes('반가워') || message.includes('인사')
      || message.includes('하이') || message.includes('헬로')) {
      messageFlag = true;
      setPremessage("인사");
      actions.handleTypingMessage("안녕하세요.");
    }
    if (message.includes('알겠') || message.includes('아하')
      || message.includes('이해') || message.includes('알았') || message.includes('고마워') || message.includes('땡큐') || message.includes('감사') || message.includes('고맙')) {
      messageFlag = true;
      setPremessage('');
      actions.handleTypingMessage("네")
    }

    if (!message) {
      messageFlag = true;
      actions.handleTypingMessage("질문을 입력해주세요.");
    }

    // 가능통과공장 설계
    if ((message.includes('가능') && message.includes('통과') && message.includes('설계')) || preMessage.includes('가능통과공장설계')) {
      messageFlag = true;
      
    }





    if (message.includes('가능') && message.includes('설계')
      && !message.includes('진행') && !message.includes('확정처리') && !message.includes('코드')) {
      messageFlag = true;
      setPremessage("가능통과공장");
      actions.handleTypingMessage("가능통과공장설계에서는 ~");
    }

    if ((preMessage.includes('가능통과공장') && message.includes('확정') || (message.includes('가능') && message.includes('확정')))
      && !message.includes('취소') && !message.includes('코드')) {
      messageFlag = true;
      setPremessage("확정처리");
      actions.handleTypingMessage("가틍통과공장이 설계된 주문 건을 확정하는 것으로 확정처리 할 주문들을 선택하여 오른쪽 위 확정처리 버튼을 클릭하여 확정합니다.");
    }

    if ((message.includes('취소') && preMessage.includes('확정')) || (message.includes('취소') && message.includes('확정'))) {
      messageFlag = true;
      actions.handleTypingMessage("확정처리 이후에는 취소가 불가합니다.");
    }

    if (message.includes('출강주') && !message.includes('현재') && !message.includes('지금')) {
      messageFlag = true;
      setPremessage('출강주');
      actions.handleTypingMessage("출강주란 ~~를 뜻합니다.")
    }

    if (((message.includes('현재') || message.includes('지금')) && preMessage.includes('출강주')) || ((message.includes('현재') || message.includes('지금')) && message.includes('출강주'))) {
      messageFlag = true;
      actions.handleTypingMessage("현재 출강주는 다음과 같습니다.(Api 고민)");
    }


    // 공장결정
    if (message.includes('공장') && message.includes('결정')
      && !(message.includes('부여') || message.includes('현황') || message.includes('제조') || message.includes('투입')
        || message.includes('취소') || message.includes('진행') || message.includes('조정')
        || message.includes('결과') || message.includes('이용량') || message.includes('사용량') || message.includes('변경'))) {
      messageFlag = true;
      setPremessage('공장결정');
      actions.handleTypingMessage("공장결정에서는 이것 입니다.")
    }

    if (message.includes('부여') && !(message.includes('현황') || message.includes('수정'))) {
      messageFlag = true;
      setPremessage('공장부여');
      actions.handleTypingMessage("공장 부여 버튼을 누를 경우 선택 주문에 대하여 투입능력관리에서 확인한 잔여 공장 능력이 가장 높은 공장으로 확정 통과 공장을 지정합니다.")
    }

    if (message.includes('부여') && message.includes('수정')) {
      messageFlag = true;
      setPremessage('공장부여');
      actions.handleTypingMessage("밑에서 결정된 공장을 확인하고 여유 능력치를 체크하여 공장을 수기로 변경할 수 있습니다.")
    }

    if (message.includes('제조') && message.includes('투입') && !message.includes('취소')
      && !message.includes('진행')) {
      messageFlag = true;
      setPremessage("제조투입");
      actions.handleTypingMessage("제조투입은 ~~ 입니다.");
    }

    if ((message.includes('취소') && preMessage.includes('제조투입')) || (message.includes('취소') && message.includes('투입'))) {
      messageFlag = true;
      actions.handleTypingMessage("제조투입 이후에는 취소가 불가합니다.");
    }

    if ((message.includes('공장') || message.includes('결과'))
      && (message.includes('조정') || (message.includes('변경')))
      && (!message.includes('사용량') && !message.includes('이용량'))) {
      messageFlag = true;
      setPremessage("결과조정");
      actions.handleTypingMessage("선택한 주문의 상세 확인과 "
        + "결정된 공장을 확인하고 여유 능력치를 체크하여 공장을 수기로 변경할 수 있습니다.");
    }

    if (((message.includes('공장') || message.includes('결과'))
      && (message.includes('조정') || (message.includes('변경'))) || preMessage.includes('결과조정'))) {
      messageFlag = true;
      setPremessage("결과조정");
      if (message.includes('사용량')) {
        actions.handleTypingMessage("능력 사용량은 공장에서 현재 사용중인 양 입니다.");
      }

      if (message.includes('이용량')) {
        actions.handleTypingMessage("능력 이용량은 공장에서 현재 사용할 수 있는 양 입니다.");
      }
    }

    // 투입 능력 관리
    if (message.includes('투입') && message.includes('능력') && !(message.includes('히트맵') || (message.includes('페이지') && message.includes('오른쪽'))
      || (message.includes('오른쪽') && message.includes('그래프'))
      || (message.includes('공장') && message.includes('부여') && message.includes('현황')))) {
      messageFlag = true;
      setPremessage("투입능력");
      actions.handleTypingMessage("투입 능력 관리에서는 출강주 별로 공정별 공장 능력을 확인할 수 있습니다. 출강주를 선택하고 조회하면 선택한 출강 주에 대한 공장 능력이 나오게 됩니다.");
    }

    if ((preMessage.includes('투입능력') || (message.includes('투입') && message.includes('능력'))) && (message.includes('히트맵') || (message.includes('페이지') && message.includes('오른쪽'))
      || (message.includes('오른쪽') && message.includes('그래프'))
      || (message.includes('공장') && message.includes('부여') && message.includes('현황')))) {
      messageFlag = true;
      setPremessage("투입능력");
      actions.handleTypingMessage("공장의 부하 정도를 나타내는 히트맵으로 공장의 현재 부하 상태를 나타내었습니다. 색이 진할 수록 잔여량이 적어서 부하가 심한 상태임을 한눈에 확인할 수 있습니다.");
    }

    // 사이즈 기준
    if ((message.includes('사이즈') || (message.includes('사이즈') && message.includes('기준')))
      && (!message.includes('수정') && !message.includes('임시') && !message.includes('설계') && !message.includes('추가')&& !message.includes('삭제'))) {
      messageFlag = true;
      setPremessage('사이즈기준');
      actions.handleTypingMessage("사이즈 기준은 공정/공장별 통과할 수 있는 기준들을 확인할 수 있습니다.");
    }

    if ((message.includes('사이즈') && message.includes('수정'))
      || (preMessage.includes('사이즈기준') && message.includes('수정'))) {
      messageFlag = true;
      actions.handleTypingMessage("사이즈 기준 수정은 수정하려는 값을 더블클릭하여 수정 후 저장 버튼을 클릭하여 수정합니다.\n\n"
        + "만약 수정이 되지 않는다면 데이터를 다시 확인해주세요.\n"
        + "ex) min값이 max값보다 큰 경우\n"
        + "\t숫자 외의 데이터가 들어갔을 경우");
    }

    if ((message.includes('사이즈') && message.includes('추가'))
      || (preMessage.includes('사이즈기준') && message.includes('추가'))) {
      messageFlag = true;
      actions.handleTypingMessage("사이즈 기준 추가는 불가능합니다.");
    }

    if ((message.includes('사이즈') && message.includes('삭제'))
      || (preMessage.includes('사이즈기준') && message.includes('삭제'))) {
      messageFlag = true;
      actions.handleTypingMessage("사이즈 기준 삭제는 불가능합니다.");
    }

    if ((message.includes('사이즈') && message.includes('임시') && message.includes('설계'))
      || (preMessage.includes('사이즈기준') && message.includes('임시') && message.includes('설계'))) {
      messageFlag = true;
      actions.handleTypingMessage("사이즈 기준 임시 설계는 두께와 폭, 길이, 단중을 입력하면 수치에 따른 공정별 공장을 보여줍니다.");
    }

    // 필수재 기준
    if (message.includes('필수재') && !message.includes('기준')
      && !(message.includes('더 설명') && message.includes('알려줘') && message.includes('로직') && message.includes('추가') 
    && message.includes('수정') && message.includes('삭제'))) {
      messageFlag = true;
      setPremessage('필수재기준');
      actions.handleTypingMessage("필수재 기준에서는 제품의 공정에 따라서 필수재 기준들을 표시합니다.");
    }

    if ((message.includes('필수재') && message.includes('기준') || preMessage.includes('필수재기준'))
      && (message.includes('설명') || message.includes('더 알려줘') || message.includes('로직'))) {
      messageFlag = true;
      setPremessage('필수재기준');
      actions.handleTypingMessage("박판계획공정별(열연, 열연정정, 냉각압연, 1차소둔, 2차소둔, 도금, 정정)에 따라 품종, 품명, 고객사코드, "
        + "주문용도지정코드,  제품두께, 제품주문폭, 제품규격약호, 판매고객사지역대분류구분, 출강목표번호, 주문제품후처리방법지정코드에 "
        + "기재된 연산자들에 맞게 값들을 비교하여 통과하면 박판 가능통과공장 코드를 반환하게 됩니다.");
    }

    if ((message.includes('필수재') && message.includes('기준') || preMessage.includes('필수재기준'))
      && (message.includes('추가'))) {
      messageFlag = true;
      actions.handleTypingMessage("필수재를 추가할 때 법인, 공정계획박판Mill구분, 공정계획 필수재변경 관리번호, 일련번호, 박판계획공정구분은 필수로 포함되어야 합니다.");
    }

    if ((message.includes('필수재') && message.includes('기준') || preMessage.includes('필수재기준'))
      && (message.includes('수정'))) {
      messageFlag = true;
      actions.handleTypingMessage("필수재 기준 수정은 불가능합니다.");
    }

    if ((message.includes('필수재') && message.includes('기준') || preMessage.includes('필수재기준'))
      && (message.includes('삭제'))) {
      messageFlag = true;
      actions.handleTypingMessage("필수재 기준 삭제는 불가능합니다.");
    }

    // 가통/확통 코드
    if ((message.includes('가능') && message.includes('코드')) && !(message.includes('수정')
    || message.includes('추가') || message.includes('삭제'))) {
      messageFlag = true;
      setPremessage('가능통과공장코드');
      actions.handleTypingMessage("공정별로 가통 코드에 대응하는 공장 리스트를 확인할 수 있습니다.");
    }

    if ((message.includes('확정') && message.includes('코드')) && !(message.includes('수정')
    || message.includes('추가') || message.includes('삭제'))) {
      messageFlag = true;
      setPremessage('확정통과공장코드');
      actions.handleTypingMessage("공장마다 가능한 공정들을 확인할 수 있습니다.");
    }

    if (((message.includes('가능') && message.includes('코드')) || preMessage.includes('가능통과공장코드'))
      && message.includes('수정') && !message.includes('확정')) {
      messageFlag = true;
      actions.handleTypingMessage("변경하고자 하는 코드를 더블클릭하면 현재 선택된 공장만 체크 된 상태로 보여집니다. \n"
        + "체크 상태를 변경하여 저장 버튼을 누르면 가통 코드가 변경됩니다. \n 이 때, 이미 존재하는 조합은 저장할 수 없습니다.");
    }

    if ((((message.includes('가능') && message.includes('코드')) || preMessage.includes('가능통과공장코드'))
      && message.includes('추가'))) {
      messageFlag = true;
      actions.handleTypingMessage("가능통과공장코드 추가는 불가합니다.");
    }

    if ((((message.includes('가능') && message.includes('코드')) || preMessage.includes('가능통과공장코드'))
      && message.includes('삭제'))) {
      messageFlag = true;
      actions.handleTypingMessage("가능통과공장코드 삭제는 불가합니다.");
    }

    if ((((message.includes('확정') && message.includes('코드')) || preMessage.includes('확정통과공장코드'))
      && message.includes('수정'))) {
      messageFlag = true;
      actions.handleTypingMessage("확정통과공장코드 수정이 불가합니다.");
    }

    if ((((message.includes('확정') && message.includes('코드')) || preMessage.includes('확정통과공장코드'))
      && message.includes('삭제'))) {
      messageFlag = true;
      actions.handleTypingMessage("확정통과공장코드 삭제는 불가합니다.");
    }

    if ((((message.includes('확정') && message.includes('코드')) || preMessage.includes('확정통과공장코드'))
      && message.includes('추가'))) {
      messageFlag = true;
      actions.handleTypingMessage("확정통과공장 추가는 불가합니다.");
    }

    if ((message.includes('경유') && message.includes('공정')) && !(message.includes('추가'))) {
      messageFlag = true;
      setPremessage('경유공정기준');
      actions.handleTypingMessage("경유 공정 기준은 품명 별 필요한 공정들을 확인할 수 있습니다.");
    }

    if (((message.includes('경유') && message.includes('공정')) || preMessage.includes('경유공정기준'))
      && message.includes('추가')) {
      messageFlag = true;
      setPremessage('경유공정기준');
      actions.handleTypingMessage("경유 공정 기준 추가는 ~~입니다.");
    }

    // 페이지 공통 느낌
    if (message.includes('에러코드')) {
      messageFlag = true;
      setPremessage('에러코드');
      actions.handleTypingMessage("가능통과공장에 대한 에러코드는 다음과 같습니다. \n\n"
        + "PP: 필수재와 사이즈 기준의 교집합이 존재하나 \n PF:사이즈 기준 부적합 \n FP: 필수재 부적합"
        + "\n FF: 사이즈, 필수재 부적합 \n CC: 사이즈, 필수재 모두 적합하나 교집합 없음")
    }

    if (message.includes('진행')) {
      messageFlag = true;
      setPremessage('진행');
      actions.handleTypingMessage("설계에 대한 진행단계는 다음과 같습니다. \n\n " +
        "A: 주문 최초 편성 대상 \n B: 가능통과공장 정상 설계 \n C: 가능통과설계 에러\n"
        + "D: 가능통과공장 확정 \n E: 공장확정 및 투입대기 상태 \n F: 기투입 상태"
        + "\n\n 가능통과공장설계 페이지에서는 A,B,C단계, 공장결정 페이지에서는 D,E단계, 출강Lot에서는 E,F단계가 표시됩니다.")
    }


    if (!messageFlag) {
      // setPremessage("");
      actions.handleTypingMessage("죄송합니다. 잘 모르겠습니다.");
    }
  };

  return (
    <div style={{ whiteSpace: 'pre-line' }}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;