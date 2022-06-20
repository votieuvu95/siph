import styled from "styled-components";
import authOne from "assets/images/auth-one-bg.jpg";

export const Main = styled.div`
  height: 100vh;
  background: #f2f2f7;
  .auth-one-bg-position {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 380px;
    @media (max-width: 575.98px) {
      height: 280px;
    }
  }

  .auth-one-bg {
    background-image: url(${authOne});
    background-position: center;
    background-size: cover;

    .bg-overlay {
      background: linear-gradient(to right, #41319c, #4b38b3);
      opacity: 0.9;
      position: absolute;
      height: 100%;
      width: 100%;
      right: 0;
      bottom: 0;
      left: 0;
      top: 0;
    }

    .shape {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;
      > svg {
        width: 100%;
        height: auto;
        fill: #f2f2f7;
        vertical-align: middle;
      }
    }
  }
  .container {
    margin-left: auto;
    margin-right: auto;
    padding-left: 0.75rem;
    padding-left: var(--vz-gutter-x, 0.75rem);
    padding-right: 0.75rem;
    padding-right: var(--vz-gutter-x, 0.75rem);
    width: 100%;
    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 992px) {
      max-width: 960px;
    }
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
  }
  .auth-page-content {
    padding-bottom: 60px;
    position: relative;
    z-index: 2;
    width: 100%;
    padding-top: 3rem !important;
    .logo {
      text-align: center;
      margin-top: 3rem !important;
      margin-bottom: 1.5rem !important;
    }
    .text-center {
      text-align: center;
      padding-top: 10px;
      .text-primary {
        color: rgba(75,56,179, 1) !important;
        font-size: 1.015625rem;
      }
      .text-muted {
        color: #878a99 !important;
      }
    }
    .justify-content-center {
      justify-content: center;
      display: flex;
      .content-form {
        @media (min-width: 768px) {
          flex: 0 0 auto;
          width: 66.66666667%;
        }
        @media (min-width: 992px) {
          flex: 0 0 auto;
          width: 50%;
        }
        @media (min-width: 1200px) {
          flex: 0 0 auto;
          width: 41.66666667%;
        }
        .ant-input {
          height: 40px;
        }
        .ant-input-affix-wrapper {
          padding: 0 11px !important;
        }
        .ant-form-item {
          margin-bottom: 30px !important;
        }
      }
    }
    .button {
      background-color: #45cb85;
      border-color: #45cb85;
      color: #fff;
      border: 1px solid transparent;
      border-radius: 0.25rem;
      cursor: pointer;
      display: inline-block;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 0.5rem 0.9rem;
      text-align: center;
      text-decoration: none;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      vertical-align: middle;
      width: 100%;
      margin: 25px 0px;
    }
    .card {
      word-wrap: break-word;
      background-clip: border-box;
      background-color: #fff;
      border: 0 solid rgba(0, 0, 0, 0.125);
      border-radius: 0.25rem;
      display: flex;
      flex-direction: column;
      min-width: 0;
      position: relative;
      padding: 24px;
      margin-top: 1.5rem !important;
    }
  }
  .footer {
    left: 0;
    background-color: transparent;
    position: absolute;
    bottom: 0;
    text-align: center;
    right: 0;
    color: #98a6ad;
    font-size: 13px;
  }
`;
