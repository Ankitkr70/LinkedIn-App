import React, { useState } from "react";
import styled from "styled-components";
import HomeLogo from "../images/home-logo.svg";
import SearchIcon from "../images/search-icon.svg";
import user from "../images/user.svg";
import home from "../images/nav-home.svg";
import network from "../images/nav-network.svg";
import jobs from "../images/nav-jobs.svg";
import messaging from "../images/nav-messaging.svg";
import notifications from "../images/nav-notifications.svg";
import downIcon from "../images/down-icon.svg";
import work from "../images/nav-work.svg";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";

function Header(props) {
  return (
    <Container>
      <Content>
        <Logo>
          <a>
            <img src={HomeLogo} alt="LinkedIn Logo" />
          </a>
        </Logo>
        <SearchBar>
          <img src={SearchIcon} alt="" />
          <input type="text" placeholder="Search" />
        </SearchBar>
        <Navbar>
          <Navcontent>
            <Navlist className="active">
              <a>
                <img src={home} alt="Home" />
                <span>Home</span>
              </a>
            </Navlist>
            <Navlist>
              <a>
                <img src={network} alt="Home" />
                <span>My Networks</span>
              </a>
            </Navlist>
            <Navlist>
              <a>
                <img src={jobs} alt="Home" />
                <span>Jobs</span>
              </a>
            </Navlist>
            <Navlist>
              <a>
                <img src={messaging} alt="Home" />
                <span>Messaging</span>
              </a>
            </Navlist>
            <Navlist>
              <a>
                <img src={notifications} alt="Home" />
                <span>Notifications</span>
              </a>
            </Navlist>
            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src={user} alt="" />
                )}

                <span>
                  Me
                  <img src={downIcon} alt="" />
                </span>
              </a>
              <SignOut onClick={() => props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>
            <Work>
              <a>
                <img src={work} alt="" />
                <span>
                  Work
                  <img src={downIcon} alt="" />
                </span>
              </a>
            </Work>
          </Navcontent>
        </Navbar>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
`;
const Content = styled.div`
  margin: 0 auto;
  padding: 10px;
  max-width: 1168px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const Logo = styled.div`
  margin-right: 20px;
`;
const SearchBar = styled.div`
  position: relative;
  input {
    border: none;
    outline: none;
    background-color: #eef3f8;
    font-size: 16px;
    border-color: #dce6f1;
    padding: 10px 40px;
  }
  img {
    pointer-events: none;
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;
const Navbar = styled.div`
  margin-left: auto;
  @media (max-width: 768px) {
    background-color: white;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
  }
`;

const Navcontent = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style: none;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid rgba(0, 0, 0, 0.9);
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      transition: transform 0.5s ease-in-out;
    }
  }
`;

const Navlist = styled.li`
  position: relative;
  a {
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 52px;
    min-width: 80px;
    font-size: 14px;
    font-weight: 500;
    span {
      color: rgba(0, 0, 0, 0.6);
    }

    &:hover,
    &:active {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }

  @media (max-width: 768px) {
    a {
      min-width: 70px;
    }
  }
`;

const SignOut = styled.div`
  display: none;
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: white;
  position: absolute;
  top: 54px;
  a {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    top: -54px;
  }
`;

const User = styled(Navlist)`
  a > img {
    width: 30px;
    border-radius: 50%;
  }
  a {
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &:hover {
    ${SignOut} {
      display: block;
    }
  }
`;

const Work = styled(User)``;

const mapState = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatch = (dispatch) => {
  return { signOut: () => dispatch(signOutAPI) };
};
export default connect(mapState, mapDispatch)(Header);
