import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import moment from "moment";
import apiUrl from "apiUrl/url";
import Bounce from "react-reveal/Bounce";
import socket from "socketConfig";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
function LikeButton({ numberOfLikes, userId, posterId, postId }) {
  const [numberOfLikesForThisPost, setNumberOfLikesForThisPost] =
    useState(numberOfLikes);
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const likes = useSelector((state) => state.likes);
  const saveLikes = (data) => {
    const option = {
      userId: userId,
      postId: data,
    };
    let info = {
      userId: userId,
      postId: data,
      _id: uuid(),
    };
    let list = [...likes, info];
    dispatch({ type: "ADD_LIKES", value: list });
    axios.post("/api/likedpost", option).then((res) => {
      updatenotification(res.data);
    });
  };
  const addPost = (data) => {
    dispatch({ type: "UPDATE_postList", value: data });
  };
  const updatePost = (data) => {
    let Updated = postList.find((item) => item.postId === data);
    if (Updated) {
      Updated.numberOfLikes = numberOfLikes;
      let list = postList.filter((item) => item.postId !== data);
      let sortted = [...list, Updated];
      addPost(sortted);
    } else {
    }
  };
  const nFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };
  const updatenotification = (data) => {
    let option = {
      userIdToNotify: data.userId,
      type: "like",
      notifiyiId: userId,
      media: data.postId,
      date: moment().format(),
      extraInfo: "",
    };

    if (userId !== posterId) {
      axios.post(`/api/update-notification`, option).then((res) => {});
    }
    socket.emit("some-like-a-post", {
      postId: data.postId,
      numberOfLikes: numberOfLikes,
    });
  };

  const handleLike = (e, data) => {
    let like = e.currentTarget;
    if (like.classList.contains("active")) {
      setNumberOfLikesForThisPost(numberOfLikesForThisPost - 1);
      removelike(data);
      updatePost(data);
    } else {
      setNumberOfLikesForThisPost(numberOfLikesForThisPost + 1);
      saveLikes(data);
      updatePost(data);
    }
  };

  const removelike = (data) => {
    const option = {
      userId: userId,
      postId: data,
    };
    let list = likes.filter((item) => item.postId !== data);
    dispatch({ type: "ADD_LIKES", value: list });
    axios.post("/api/removelike", option).then((res) => {});
    socket.emit("some-like-a-post", {
      postId: postId,
      numberOfLikes: numberOfLikes,
    });
  };

  useEffect(() => {
    socket.on("like-this-post", (data) => {
      if (data.postId === postId) {
        setNumberOfLikesForThisPost(data.numberOfLikes);
        updatePost(data.postId);
      }
    });
    return () => socket.off("like-this-post");
  }, []);

  return (
    <div className="lik box-ac">
      {likes?.some((i) => i.postId.includes(postId)) ? (
        <Bounce>
          <div
            onClick={(e) => {
              handleLike(e, postId);
            }}
            className="icon lik active"
          >
            <FaHeart />
          </div>
        </Bounce>
      ) : (
        <div
          onClick={(e) => {
            handleLike(e, postId);
          }}
          className="icon"
        >
          <FaRegHeart />
        </div>
      )}
      <p>{nFormatter(numberOfLikesForThisPost)}</p>
    </div>
  );
}

export default LikeButton;