import styled from "styled-components";

const Container = styled.div`
  background-color: darkgreen;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Img = styled.img`
  width: 100px;
  border-radius: 50%;
`;

const InfoContainer = styled.div`
  width: 40%;
  border: none;
  background-color: gray;
  padding: 10px 20px;
  text-align: center;
  margin: 10px 0;
`;

const StatusInfo = styled.span`
  color: darkgreen;
  font-weight: bold;
  font-size: 30px;
`;

const Info = styled.span`
  text-align: center;
  color: lightblue;
`;

const Success = () => {
  return (
    <Container>
      <Wrapper>
        <Img src={"./images/mimicucu.jpg"}></Img>
      </Wrapper>
      <InfoContainer>
        <StatusInfo>Successfull</StatusInfo>
      </InfoContainer>
      <Info>
        Your order is being proccessed. <br />
        Thank you for choosing MiMiCuCu shop.
      </Info>
    </Container>
  );
};

export default Success;
