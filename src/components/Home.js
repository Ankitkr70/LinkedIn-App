import React from "react";
import styled from "styled-components";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function Home(props) {
  return (
    <Container>
      {!props.user && <Navigate to="/"></Navigate>}
      <Content>
        <Section>
          <h5>
            <a>Hiring in a hurry? - </a>
          </h5>
          <p>
            Find talented props in record time with Upwork and keep business
            moving.
          </p>
        </Section>
        <Layout>
          <LeftSide></LeftSide>
          <Main></Main>
          <RightSide></RightSide>
        </Layout>
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div`
  max-width: 1168px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  p {
    font-weight: 600;
    text-decoration: underline;
    color: #434649;
    text-align: center;
  }

  a {
    color: #0a66c2;
    font-size: 16px;
    font-weight: 700;
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  gap: 25px;
  @media (max-width: 768px) {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
`;

const mapState = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapState, null)(Home);
