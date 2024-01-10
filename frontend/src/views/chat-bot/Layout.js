import React from 'react';
// import { ModalProvider } from '../chat-bot/ModalContext';
import { useState } from "react";
import ChatBot from './ChatBot';

const imageStyle = {
    width: '80%', // 이미지를 버튼의 가로 폭에 맞게 조절
    objectFit: 'contain',
  };
const Layout = ({ children }) => {
    const [chatBotOpen, setChatBotOpen] = useState(false);

    const handleChatBotOpenModal = () => {
        setChatBotOpen(!chatBotOpen);
    };


    return (
        // <ModalProvider>
        <div>
            {/* <img className="phoneImage" alt="iPhone_01" src="avatars/9.png" /> */}
            <button style={{
                    zIndex: 1,
                    background: 'linear-gradient(90deg, rgba(157, 92, 255, 1) 0%, rgba(92, 130, 255, 1) 100%)',
                    position: "fixed",
                    bottom: "40px",
                    right: "40px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50px",
                    overflow: "hidden",
                    border: "0px"
                }}
                onClick={handleChatBotOpenModal}>
                <img src="/images/avatars/9.png" alt="버튼 이미지" style={imageStyle} />
            </button>
            {/* <Button
                style={{
                    zIndex: 1,
                    backgroundColor: "darkgreen",
                    position: "fixed",
                    bottom: "50px",
                    right: "50px",
                    borderRadius: "50px",
                }}
                onClick={handleChatBotOpenModal}
            >
                챗봇
            </Button> */}
            {chatBotOpen && (
                <div>
                    <ChatBot
                        isOpen={chatBotOpen}
                    />
                </div>
            )}
            {children}

        </div>
        // </ModalProvider>
    );
};

export default Layout;