import styled from "styled-components";

const StyledPostInfo = styled.div`
  align-items: center;
  display: flex;
  img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
  .author {
    font-size: 16px;
    margin: 0;
  }

  .date {
    font-size: 16px;
    margin: 0;
  }

  .date-author {
    display: flex;
    flex-direction: column;
  }
`;
export default StyledPostInfo;
