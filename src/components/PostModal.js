import React from "react";
import styled from "styled-components";
import closeIcon from "../images/close.svg";
import userIcon from "../images/user.svg";
import photoIcon from "../images/photo-icon.svg";
import videoIcon from "../images/video-icon.svg";
import shareIcon from "../images/comment-icon.svg";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { createPostAPI } from "../actions";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function PostModal({ closeModal, user, createPost }) {
  const [post, setPost] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [mediaToggle, setMediaToggle] = useState("");

  const uploadImage = (e) => {
    setShareImage(e.target.files[0]);
  };

  const switchMedia = (media) => {
    setShareImage("");
    setVideoLink("");
    setMediaToggle(media);
  };

  const reset = () => {
    setPost("");
    setShareImage("");
    setVideoLink("");
    setMediaToggle("");
  };
  const createPostHandler = () => {
    const payload = {
      user: user,
      video: videoLink,
      image: shareImage,
      description: post,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    if (shareImage === "" && videoLink === "") {
      alert("Please select the an image or Video to share");
      return;
    }
    createPost(payload);
    reset();
    closeModal((modal) => !modal);
  };
  return (
    <Container>
      <Content>
        <PostHead>
          <span>Create a Post</span>
          <button onClick={() => closeModal((modal) => !modal)}>
            <img src={closeIcon} alt="" />
          </button>
        </PostHead>
        <PostSection>
          <UserInfo>
            <img src={user.photoURL ? user.photoURL : photoIcon} alt="" />
            <span>{user.displayName}</span>
          </UserInfo>
          <UserPost>
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="What do you want to talk about?"
              autoFocus={true}
            ></textarea>
          </UserPost>
          <UploadImage>
            {mediaToggle === "image" && (
              <>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={uploadImage}
                />
                {shareImage && (
                  <img src={URL.createObjectURL(shareImage)}></img>
                )}
              </>
            )}
            {mediaToggle === "video" && (
              <>
                <input
                  type="text"
                  player="Enter video link"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
                {videoLink && (
                  <ReactPlayer
                    url={videoLink}
                    width="100%"
                    height="300px"
                  ></ReactPlayer>
                )}
              </>
            )}
          </UploadImage>
        </PostSection>
        <PostAction>
          <ShareMedia>
            <button onClick={() => switchMedia("image")}>
              <img src={photoIcon} alt="" />
            </button>
            <button onClick={() => switchMedia("video")}>
              <img src={videoIcon} alt="" />
            </button>
          </ShareMedia>
          <CommentButton>
            <img src={shareIcon} alt="" />
            Anyone
          </CommentButton>
          <PostButton disabled={!post} onClick={createPostHandler}>
            Post
          </PostButton>
        </PostAction>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
`;
const Content = styled.div`
  max-width: 600px;
  min-height: 50%;
  margin: 0 auto;
  margin-top: 50px;
  background-color: white;
  border-radius: 10px;
  padding: 20px 30px;
`;

const PostHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

  button {
    background-color: transparent;
    border: none;
    border-radius: 50%;
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 200ms ease;
    svg {
      height: 20px;
      width: 20px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
const PostSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
const UserPost = styled.div`
  padding: 15px 0;

  textarea {
    width: 100%;
    height: 100px;
    border: none;
    outline: none;
    font-size: 16px;
    line-height: 1.3;
    resize: none;
  }
`;

const PostAction = styled.div`
  display: flex;
  align-items: center;

  button {
    transition: background-color 200ms ease;
    cursor: pointer;
  }
`;
const ShareMedia = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  padding-right: 10px;
  button {
    border-radius: 50%;
    width: 42px;
    height: 42px;
    background-color: transparent;
    border: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
const CommentButton = styled.button`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  margin-left: 10px;
  padding: 8px 10px;
  border-radius: 30px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  img {
    margin-right: 8px;
  }
`;
const PostButton = styled.button`
  margin-left: auto;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 30px;
  color: white;
  background-color: ${(props) =>
    props.disabled ? "rgba(0,0,0,0.1)" : "#0a66c2"};
  border: none;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(0,0,0,0.1)" : "#004182"};
  }
`;
const UploadImage = styled.div`
  /* min-height: 500px; */
  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
  }
  /* padding: 10px 0; */
  input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
`;

const mapState = (state) => {
  return {
    user: state.userReducer.user,
  };
};
const mapProps = (dispatch) => ({
  createPost: (payload) => dispatch(createPostAPI(payload)),
});

export default connect(mapState, mapProps)(PostModal);
