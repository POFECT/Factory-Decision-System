import styled from "styled-components";

const ChatMessageContainer = styled.div`
  max-width: 85%;
  width: fit-content;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.isBot ? "#f2f2f2" : "#5c82ff")};
  border-radius: ${(props) =>
    props.isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px"};
  margin-left: ${(props) => (props.isBot ? "0.4rem" : "auto")};
  color: ${(props) => (props.isBot ? "#3d4f6e" : "#ffffff")};
  padding: ${(props) => (props.isBot ? "0.8rem 1.2rem" : "0.7rem 1.1rem")};
  font-weight: ${(props) => (props.isBot ? "500" : "400")};
  font-size: 0.97rem;
  line-height: 1.3rem;
  word-break: keep-all;
`;

function ChatMessage({ message, isBot, questions }) {
  return <ChatMessageContainer isBot={isBot}>{message}</ChatMessageContainer>;
}

export default ChatMessage;
