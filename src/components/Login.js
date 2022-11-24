import React from "react";
import styled from "styled-components";
import loginLogo from "../images/login-logo.svg";
import google from "../images/google.svg";
import hero from "../images/login-hero.svg";
import { signinUsingGoogle } from "../actions";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function Login(props) {
  return (
    <Container>
      {props.user && <Navigate to="/home"></Navigate>}
      <Nav>
        <a href="/">
          <img src={loginLogo} alt="" />
        </a>
        <div>
          <Join>Join</Join>
          <SignIn>Sing In</SignIn>
        </div>
      </Nav>
      <Section>
        <h1>Welcome to your professional community</h1>
        <img src={hero} alt="Community Image" />
      </Section>
      <Google onClick={() => props.signIn()}>
        <img src={google} alt="Google logo" />
        <span>Sign in with Google</span>
      </Google>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1168px;
  margin: auto;
  padding: 20px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 150px;
  }
`;
const Join = styled.a`
  cursor: pointer;
  margin-right: 20px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.7);
  padding: 10px 25px;
  border-radius: 5px;
  transition-duration: 200ms;
  font-weight: 600;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: black;
  }
`;
const SignIn = styled.a`
  cursor: pointer;
  font-weight: 600;

  font-size: 20px;
  box-shadow: inset 0 0 0 2px #0a66c2;
  color: #0a66c2;
  padding: 10px 25px;
  transition-duration: 200ms;
  border-radius: 20px;

  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
  }
`;
const Section = styled.section`
  margin-top: 100px;
  display: flex;
  h1 {
    font-weight: 500;
    color: #0a66c2;
    width: 65%;
    font-size: 56px;
    line-height: 60px;
  }

  img {
    width: 800px;
    height: 760px;
    position: absolute;
    right: -150px;
    bottom: -150px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    h1 {
      font-size: 48px;
      width: 100%;
      text-align: center;
      margin-bottom: 50px;
    }
    img {
      width: inherit;
      height: inherit;
      position: inherit;
    }
  }
`;
const Google = styled.button`
  border: none;
  outline: none;
  font-size: 20px;
  padding: 20px 50px;
  width: 50%;
  border-radius: 35px;
  margin-top: 50px;
  cursor: pointer;
  background-color: white;
  font-weight: bold;

  box-shadow: inset 0 0 0 2px #0a66c2;
  transition-duration: 200ms;
  color: rgba(0, 0, 0, 0.7);
  img {
    vertical-align: bottom;
  }
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 1);
  }
  @media (max-width: 768px) {
    width: 100%;
  } ;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => dispatch(signinUsingGoogle),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
