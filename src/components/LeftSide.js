import React from "react";
import styled from "styled-components";
import cardBg from "../images/card-bg.svg";
import userIcon from "../images/photo.svg";
import plusIcon from "../images/plus-icon.svg";
import widgetIcon from "../images/widget-icon.svg";
import itemIcon from "../images/item-icon.svg";
import { connect } from "react-redux";

function LeftSide(props) {
  return (
    <Container>
      <Card>
        <UserInfo>
          <CardBackground></CardBackground>
          <a>
            <Photo></Photo>
            <Text>
              Welcome, {props.user ? props.user.displayName : "there"} !
            </Text>
          </a>
          <a>
            <AddPhoto>Add a photo</AddPhoto>
          </a>
        </UserInfo>
        <Connection>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src={widgetIcon} />
          </a>
        </Connection>
        <Item>
          <a>
            <img src={itemIcon} alt="" />
            <span>My Items</span>
          </a>
        </Item>
      </Card>
      <ConnectionInfo>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>Events</span>
          <img src={plusIcon} alt="" />
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </ConnectionInfo>
    </Container>
  );
}

const Container = styled.div``;
const UserInfo = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

const Card = styled.div`
  text-align: center;
  background-color: white;
  padding: 10px 0 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const CardBackground = styled.div`
  background-image: url(${cardBg});
  background-position: center center;
  background-size: 100%;
  background-repeat: no-repeat;
  height: 54px;
  margin-top: -10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Photo = styled.div`
  width: 72px;
  height: 72px;
  background-image: url(${userIcon});
  background-position: center center;
  background-repeat: no-repeat;
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: -38px;
`;

const Text = styled.p`
  padding-top: 20px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const AddPhoto = styled.p`
  color: #0a66c2;
  line-height: 1.33;
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Connection = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px 0;
  font-weight: bold;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;

    div {
      display: flex;
      flex-direction: column;
      text-align: left;

      span {
        margin-bottom: 5px;
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const Item = styled.div`
  text-align: left;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: bold;
  a {
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const ConnectionInfo = styled(Card)`
  /* padding: 10px 12px; */
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  a {
    padding: 4px 12px 4px 12px;
    color: black;
    font-size: 12px;
    font-weight: bold;
    text-decoration: none;
    &:hover {
      color: #0a66c2;
    }
    &:nth-child(2) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;
const mapState = (state) => {
  return {
    user: state.userReducer.user,
  };
};
const mapProps = (dispatch) => {
  return {};
};
export default connect(mapState, mapProps)(LeftSide);
