import React from "react";
import styled from "styled-components";
import userIcon from "../images/user.svg";
import photoIcon from "../images/photo-icon.svg";
import videoIcon from "../images/video-icon.svg";
import eventIcon from "../images/event-icon.svg";
import articleIcon from "../images/article-icon.svg";
import likeIcon from "../images/like-icon.svg";
import commentIcon from "../images/comment-icon.svg";
import shareIcon from "../images/share-icon.svg";
import sendIcon from "../images/send-icon.svg";
import ellipseIcon from "../images/ellipse-icon.svg";
import { useState } from "react";
import PostModal from "./PostModal";
import spinner from "../images/spinner.gif";
import { connect } from "react-redux";
import { fetchPosts, addLikes } from "../actions";
import { useEffect } from "react";
import ReactPlayer from "react-player";
function Main(props) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    props.getPost();
    console.log(props);
  }, []);

  return (
    <Container>
      <AddPost>
        <div>
          <img src={props.user ? props.user.photoURL : userIcon} alt="" />
          <button
            onClick={() => setShowModal((modal) => !modal)}
            disabled={props.loading ? true : false}
          >
            {" "}
            Start a Post...
          </button>
        </div>
        <div>
          <button>
            <img src={photoIcon} alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src={videoIcon} alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src={eventIcon} alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src={articleIcon} alt="" />
            <span>Write article</span>
          </button>
        </div>
      </AddPost>
      {props.loading && (
        <Spinner>
          <img src={spinner} alt="" />
        </Spinner>
      )}
      {props.posts.length === 0 && <p>No Posts to show</p>}
      {props.posts.length > 0 &&
        props.posts.map((post, index) => {
          return (
            <Post key={index}>
              <UserAvatar>
                <a>
                  <img src={post.user ? post.user.photo : userIcon} alt="" />
                </a>
                <div>
                  <span>{post.user.name}</span>
                  <span>{post.user.email}</span>
                  <span>{post.user.date.toDate().toLocaleString()}</span>
                </div>
                <button>
                  <img src={ellipseIcon} alt="" />
                </button>
              </UserAvatar>
              <Description>{post.description}</Description>
              <PostImage>
                {post.image ? (
                  <img src={post.image} alt="" />
                ) : (
                  <ReactPlayer
                    controls={true}
                    url={post.video}
                    width="100%"
                    height="300px"
                  ></ReactPlayer>
                )}
              </PostImage>
              <PostCount>
                <button>
                  <img
                    src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                    alt=""
                  />
                  <img
                    src="https://static-exp1.licdn.com/sc/h/lhxmwiwoag9qepsh4nc28zus"
                    alt=""
                  />
                  <img
                    src="https://static-exp1.licdn.com/sc/h/cpho5fghnpme8epox8rdcds22"
                    alt=""
                  />
                  <span>{post.likes}</span>
                </button>
                <span>2 comments</span>
              </PostCount>
              <PostActions>
                <button onClick={() => props.incLikes(post.postID)}>
                  <img src={likeIcon} alt="" />
                  <span>Like</span>
                </button>
                <button>
                  <img src={commentIcon} alt="" />
                  <span>Comment</span>
                </button>
                <button>
                  <img src={shareIcon} alt="" />
                  <span>Share</span>
                </button>
                <button>
                  <img src={sendIcon} alt="" />
                  <span>Send</span>
                </button>
              </PostActions>
            </Post>
          );
        })}
      {showModal && (
        <PostModal closeModal={setShowModal}>Create a Post</PostModal>
      )}
    </Container>
  );
}

const UserAvatar = styled.div`
  font-size: 12px;
  font-weight: bold;
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  div {
    flex-grow: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    span:first-child {
      color: black;
    }
  }
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 10px;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    border-radius: 50%;
    padding: 0;
    transition: background-color 200ms ease;
    padding: 5px;
    position: absolute;
    top: 0;
    right: 5px;
    img {
      margin: 0;
      width: 24px;
      height: 24px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
const Description = styled.div`
  margin-bottom: 10px;
  padding: 10px 10px;
`;
const PostImage = styled.div`
  padding: 0;
  img {
    width: 100%;
    height: 300px;
    object-fit: fill;
  }
`;
const PostCount = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  button {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.5);
    }
    img:nth-child(2) {
      transform: translateX(-5px);
    }
    img:nth-child(3) {
      transform: translateX(-10px);
    }
  }
`;
const PostActions = styled.div`
  padding: 5px 10px;
  display: flex;
  gap: 5px;

  button {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    padding: 8px 20px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    span {
      margin-left: 5px;
    }
    transition: background-color 200ms ease;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
const Container = styled.div``;
const AddPost = styled.div`
  text-align: center;
  background-color: white;
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* align-items: flex-start; */
  button {
    border: transparent;
    outline: none;
    background-color: white;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-weight: 600;
  }

  div:first-child {
    display: flex;
    margin-bottom: 5px;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 10px;
    }
    button {
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 35px;
      padding: 8px;
      flex-grow: 1;
      text-align: left;
      cursor: pointer;
      transition: background-color 200ms ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }

  div:last-child {
    display: flex;
    /* padding: 8px; */
    justify-content: space-between;

    button {
      display: flex;
      align-items: center;
      padding: 10px 5px;
      transition: background-color 200ms ease;
      cursor: pointer;
      border-radius: 5px;
      img {
        margin-right: 8px;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

const Post = styled.div`
  /* text-align: center; */
  background-color: white;

  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  overflow: hidden;
`;

const Spinner = styled.div`
  text-align: center;
  margin-bottom: 20px;
  img {
    width: 30px;
    height: 30px;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    loading: state.postState.loading,
    posts: state.postState.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPost: () => dispatch(fetchPosts()),
    incLikes: (id) => dispatch(addLikes(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
