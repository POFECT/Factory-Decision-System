# MSA기반 박판 공장 결정 시스템 구축




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/POFECT">
    <img src="https://github.com/POFECT/Factory-Decision-System/assets/96154444/ef96d23c-a5c3-4ad1-af5d-10d3f55bfb39" alt="Logo" width="300">
  </a>

  <h2 align="center">MSA 기반 공장 결정 시스템 (POSCO DX)</h3>

  <div style="margin: auto; width: 70%;">
    <h4>포스코DX 청년 IT 전문가 6기 2조 </h4> 
    <table style="align-items: center;text-align: center;">
      <tr>
        <th></th>
        <th>신유경</th>
        <th>박세지</th>
        <th>백재원</th>
        <th>윤혜진</th>
        <th>최진영</th>
      </tr>
      <tr>
        <td><strong>GIT</strong></td>
        <td><a href="https://github.com/shin-6-0">shin-6-0</a></td>
        <td><a href="https://github.com/newjee">newjee</a></td>
        <td><a href="https://github.com/bjw1622">bjw1622</a></td>
        <td><a href="https://github.com/yyhjin">yyhjin</a></td>
        <td><a href="https://github.com/bongdaring">bongdaring</a></td>
      </tr>
      <tr>
        <td><strong>EMAIL</strong></td>
        <td><a href="cheerup313@naver.com">📧email</a></td>
        <td><a href="s2cherryy@gmail.com">📧email</a></td>
        <td><a href="bjw1622@gmail.com">📧email</a></td>
        <td><a href="wendy0301666@gmail.com">📧email</a></td>
        <td><a href="chlwlsdud258@gmail.com">📧email</a></td>
      </tr>
      <tr>
        <td><strong>MBTI</strong></td>
        <td>_NTP</td>
        <td>_NFP</td>
        <td>ISFJ</td>
        <td>ISFJ</td>
        <td>INFP</td>
      </tr>
    </table>
    </div>


<br><br><br>
<br><br><br>


<!-- ABOUT THE PROJECT -->
# About The Project
<p style="font-size: 16px">박판 공장 결정 시스템은 매 출강주마다 박판 공정 별로 공장에 대한 능력치를 산출하고 필수 공장과 재료별 기준 및 사이즈 기준을 결정합니다. 기준들을 바탕으로 가능 통과 공장 선정 및 공장 결정을 진행하여 박판 공정 주문의 최적 투입 확정을 계획합니다. 이후 출강 주 별로 Lot 생산 정보를 확인할 수 있으며, 이후 출강 Lot 정보를 예측할 수 있습니다. 위의 일련의 과정을 통해 생산 리소스를 최대한 효율적으로 활용할 수 있습니다.<br>
프로젝트는 MSA(Micro Service Architecture)관점에서 개발되어 이미 개발이 완료된 서비스에 새로운 서비스를 수정 및 배포하더라도 영향을 미치지 않고, 각 서비스의 부하가 발생하더라도 다른 기능에 영향이 없도록 개발되었습니다. 서비스가 독립적으로 관리되어 변경 사항을 빠르게 개발 후 배포할 수 있으며, 서비스 별로 다른 기술 스택을 사용하여 확장할 수 있습니다.<br>
또한, Android 및 IOS 모바일 환경을 제공하여 언제 어디서든 시스템에 접속하여 주문 처리 상태 및 실시간으로 변하는 주문 정보, 기준 변경여부를 확인할 수 있어 접근성을 향상시켰습니다.
</p>
<br><br><br>

## 프로젝트 기능 및 로직
![image](https://github.com/POFECT/Factory-Decision-System/assets/96154444/77617a25-bcf8-4506-8d1b-3f0e1ccf200d)

박판 공정 계획 프로세스의 투입 계획 설계 시스템을 개발하였습니다. 주별로 주문이 투입되며, 품질설계가 끝나면 투입 계획이 수립됩니다. 이 부분이 우리의 공장 결정 시스템으로, 필수재 관리 시스템에서는 필수재 기준을 관리하며, 공장 결정 시스템에서는 이 기준들과 설비별 사이즈 기준을 고려하여 가능한 공장의 조합, 즉 가능통과공장 코드를 부여합니다. 공장 별 투입 능력을 적용하여 통과공장을 결정하고, 제조 투입 단계가 되면 제조 투입 프로세스로 넘어갑니다.
이러한 프로세스는 MSA (Micro Service Architecture) 관점에서 개발되어 각 서비스는 독립적으로 관리되어 새로운 서비스의 수정 및 배포가 다른 기능에 영향을 미치지 않고, 오류 및 서버 문제를 최소화합니다.
또한, Android 및 IOS 모바일 환경을 지원하여 언제 어디서든 시스템에 접속하여 실시간 주문 정보 및 기준 변경 여부를 확인할 수 있어 접근성이 향상되었습니다.
<br><br><br>

## 기술스택
![image](https://github.com/POFECT/Factory-Decision-System/assets/96154444/78e54da1-201b-46f3-9e34-c369be18fb3f)
**개발환경**<br> Windows 10, Mac OS, EC2(Linux 2023), RDS(Mysql), Atlas(MongoDB),  Android, IOS<br>
**개발언어**<br> Java, Python, Javascript, HTML5, CSS, node.js<br>
**개발도구**<br> VS Code, IntelliJ, Pycharm, Postman, Git, Slack, Notion<br>
**기술스택**<Br>
`프론트엔드` : React, MUI, Hikari CP, Axios, Next.js, NextAuth, npm, node.js<br>
     `백엔드` : Spring Boot, JPA, QueryDSL, JWT, OAuth2.0, Spring Security, REST API, Rest Template, Eureka, API Gateway, Gradle, Jenkins, MongoDB, Mysql, Flask, NumPy, javax.mail(SMTP), Swagger<br>
     `App` : React-Native, Expo Go, React-Navigation, Async Storage, React-Native-Reanimated<br>
     `Infra` : AWS EC2, AWS Certificate Manager, Amazon Route 53, Docker, Amazon RDS, Altas, Jenkins, Amplify, GitHub Actions<br>
<br><br><br>

## 프로젝트 구조
![image](https://github.com/POFECT/Factory-Decision-System/assets/96154444/9c4627dd-3776-4b5c-9cfb-ab1e97cbaf34)


<br><br><br>

# 실행
<h3>배포 주소 : https://www.pofect.store/</h3>
※이 주소는 현재 사용 가능합니다. 

<br><br><br>
# 프로젝트 주요 기능
... 추후 업데이트



<table style="margin: auto; width: 45%;">
    <tr>
        <th>
            <a href="https://github.com/POFECT/Factory-Decision-System/wiki/%F0%9F%93%8C%ED%8C%80-%EA%B7%9C%EC%B9%99">📌팀규칙</a> 
        </th>
        <th>
            <a href="https://github.com/POFECT/Factory-Decision-System/wiki/%F0%9F%94%A5GIT-%EA%B7%9C%EC%B9%99">🔥Git 규칙</a>
        </th>
        <th>
            <a href="https://www.canva.com/design/DAF6NDWs7yo/ESr3rvpLgHooK57XKEAr-Q/view?utm_content=DAF6NDWs7yo&utm_campaign=designshare&utm_medium=link&utm_source=editor">🏆최종발표PPT</a>
        </th>
    </tr>
</table>
</div>
