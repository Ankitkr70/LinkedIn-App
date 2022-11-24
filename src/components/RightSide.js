import React from "react";
import styled from "styled-components";
import feedIcon from "../images/feed-icon.svg";
import rightIcon from "../images/right-icon.svg";
import adImg from "../images/ad.jpg";

function RightSide() {
  return (
    <Container>
      <Card>
        <AddToFeed>
          <h2>Add to Feed</h2>
          <img src={feedIcon} alt="" />
        </AddToFeed>
        <FeedList>
          <List>
            <a>
              <img src="https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs" />
            </a>
            <div>
              <span>#Linkedin</span>
              <button>Follow</button>
            </div>
          </List>
          <List>
            <a>
              <img src="https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs" />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </List>
        </FeedList>
        <Recommendation>
          View all recommendations
          <img src={rightIcon} alt="" />
        </Recommendation>
      </Card>
      <BannerCard>
        <img src={adImg} alt="" />
      </BannerCard>
    </Container>
  );
}

const Container = styled.div``;
const Card = styled.div`
  text-align: center;
  background-color: white;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const AddToFeed = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const FeedList = styled.ul`
  list-style: none;
  margin: 20px 0;
`;
const List = styled.li`
  display: flex;
  align-items: center;
  margin: 15px 0;

  a {
    img {
      width: 48px;
      height: 48px;
      margin-right: 10px;
    }
  }
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      font-size: 14px;
      font-weight: 600;
    }
  }
  button {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
    padding: 16px;
    align-items: center;
    border-radius: 15px;
    box-sizing: border-box;
    font-weight: 600;
    display: inline-flex;
    justify-content: center;
    max-height: 32px;
    max-width: 480px;
    text-align: center;
    outline: none;
  }
`;

const Recommendation = styled.a`
  color: #0a66c2;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const BannerCard = styled(Card)`
  img {
    width: 100%;
    height: 100%;
  }
`;

export default RightSide;
