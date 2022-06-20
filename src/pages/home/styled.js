import styled from "styled-components";
import background from "assets/images/background.jpg";

export const Main = styled.div`
  .welcome {
    background-image: url(${background});
    background-repeat: no-repeat;
    width: 100%;
    height: calc(100vh - 64px);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    h3 {
      color: #fff;
    }
  }
`;
