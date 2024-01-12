"use strict";
import Chatbot from 'react-chatbot-kit'
import styled from "styled-components";
import { useState } from "react";
// import 'react-chatbot-kit/build/main.css'
import "remixicon/fonts/remixicon.css";

import config from '../chat-bot/config.js';
import MessageParser from '../chat-bot/MessageParser.js';
import ActionProvider from '../chat-bot/ActionProvider.js';


const ChatBot = () => {
    return (
            <div>
                <Chatbot
                headerText="CHAT_BOT"
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
          />
            </div>
    );
};


export default ChatBot;

