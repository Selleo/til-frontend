import styled from "styled-components";

const StyledPostInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .author {
    margin: 0;
    font-size: 16px;
  }

  .date {
    margin: 0;
    font-size: 16px;
  }

  .date-author {
    display: flex;
    flex-direction: column;
  }
`;
export default StyledPostInfo;
