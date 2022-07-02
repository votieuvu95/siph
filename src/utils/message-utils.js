import React from "react";
import { message } from "antd";
import Ic from "assets/images/x-white.png";
import styled, { createGlobalStyle } from "styled-components";
export const GlobalMessageStyle = createGlobalStyle`
 & .ant-message {
    /* position: fixed;
    top: calc(100vh - 10px);
    right: 5px; */
    display: flex;
    height: 100%;
    flex-direction: column-reverse;
    align-items: end;
      .ant-message-notice-content{
        box-shadow: none;
        background: none;
        padding:5px 16px;
      }
      .ant-message-custom-content{
        min-width: 290px;
      }
      & .ant-message-notice{
        /* position: absolute; */
        bottom: 0;
        right: 0;
        .ant-message-error{
        text-align: left;
        border-radius: 5px;
        color: #fff;
        padding: 15px;
        background: #fc3b3a;
      }
      .ant-message-success{
        text-align: left;
        border-radius: 5px;
        border: 5px;
        color: #fff;
        padding: 15px;
        background: #049254;
        &:hover{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
      }
      .ant-message-warning{
        text-align: left;
        border-radius: 5px;
        border: 5px;
        color: #fff;
        padding: 15px;
        background: #fe8803;
        &:hover{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
      }
        svg{
            fill: #fff;
          }
        }
    }
`;
export const Main = styled("span")``;
export const configMessage = () => {
  if (!message.successbk) message.successbk = message.success;

  if (message.successbk) {
    message.success = (text, key, duration = 3) => {
      let keyCustom = key || text;
      message.successbk({
        content: (
          <Main>
            {text}
            <span
              className="close-message"
              onClick={() => message.destroy(keyCustom)}
            >
            </span>
          </Main>
        ),
        key: keyCustom,
        duration,
      });
    };
  }

  if (!message.errorbk) message.errorbk = message.error;

  if (message.errorbk) {
    message.error = (text, key, duration = 3) => {
      let keyCustom = key || text;
      message.errorbk({
        content: (
          <Main>
            {text}
            <span
              className="close-message"
              onClick={() => message.destroy(keyCustom)}
            >
            </span>
          </Main>
        ),
        key: keyCustom,
        duration,
      });
    };
  }

  if (!message.warningbk) message.warningbk = message.warning;

  if (message.warningbk) {
    message.warning = (text, key, duration = 3) => {
      let keyCustom = key || text;
      message.warningbk({
        content: (
          <Main>
            {text}
            <span
              className="close-message"
              onClick={() => message.destroy(keyCustom)}
            >
            </span>
          </Main>
        ),
        key: keyCustom,
        duration,
      });
    };
  }
  if (!message.infobk) message.infobk = message.info;

  if (message.infobk) {
    message.info = (text, key, duration = 3) => {
      let keyCustom = key || text;
      message.infobk({
        content: (
          <Main>
            {text}
            <span
              className="close-message"
              onClick={() => message.destroy(keyCustom)}
            >
            </span>
          </Main>
        ),
        key: keyCustom,
        duration,
      });
    };
  }
};

export const a = {
  b: 1,
};
