import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const STRIPE_PK =
  "pk_test_51HbqjgKrFN3kJ53HBqVlelHOW47fXxAkzMRgoWCsD4F4ATjn84cYGD14hkatxRnrFM5uouvcnkeRgU4cCMPHG0Re00zzYBURZi";

const Container = styled.div`
  background-color: gray;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  width: 120px;
  border: none;
  background-color: teal;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
`;
const StripeRes = styled.span``;

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(response.data);
        history.push("/success");
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, history]);

  return (
    <Container>
      {stripeToken ? (
        <StripeRes>processing. please wait ...</StripeRes>
      ) : (
        <StripeCheckout
          name="MiMiCuCu shop"
          image="./images/logo.png"
          billingAddress
          shippingAddress
          description="some disc"
          amount={2000}
          token={onToken}
          stripeKey={STRIPE_PK}
        >
          <Button>Pay Now</Button>
        </StripeCheckout>
      )}
    </Container>
  );
};

export default Pay;
