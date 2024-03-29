import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import useUser from "hooks/useUser";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
function ButtonFollow({ friend, activeBox }) {
  const dispatch = useDispatch();
  const user = useUser();
  const { userId } = user.user;
  const [follow, setFollow] = useState(null);
  const [unfollow, setUnfollow] = useState(false);
  const followLists = useSelector((state) => state.followLists);

  const activeFollow = () => {
    setUnfollow(!unfollow);
  };

  const followUser = () => {
    let dataUser = {
      userId: userId,
      userToFollowId: friend,
    };
    setFollow(true);
    axios.post("/api/update-fo", dataUser).then((res) => {});
  };
  const removeFollow = () => {
    let option = {
      userId: userId,
      userToUnFollowId: friend,
    };
    activeFollow();
    setFollow(false);

    axios
      .post("/api/unfollowrequest", option, { withCredentials: true })
      .then((result) => {
        let list = followLists.slice().filter((item) => item !== friend);
        updataFollow(list);
      });
  };

  const updataFollow = (data) => {
    dispatch({ type: "UPDATE_FOLLOWER", value: data });
  };
  const checkFollow = () => {
    if (followLists.includes(friend)) {
      setFollow(true);
    } else {
      axios
        .get(`/api/checkfollower/${userId + "," + friend}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data) {
            let data = followLists.slice();
            data.push(friend);
            updataFollow(data);
            setFollow(true);
          } else {
            setFollow(false);
          }
        });
    }
  };

  useEffect(() => {
    checkFollow();
  }, []);

  return (
    <div
      className={`wriffjjxif ${
        userId === friend ? "" : follow !== null ? (follow ? "" : "fol") : ""
      }`}
    >
      {activeBox ? (
        <div className="hold-thatiocom">
          <MdDelete />
        </div>
      ) : (
        ""
      )}
      {userId === friend ? (
        <button>
          <Link to="/profile">Profile</Link>{" "}
        </button>
      ) : follow !== null ? (
        follow ? (
          <button onClick={activeFollow}>Follow </button>
        ) : (
          <button onClick={followUser} className="active">
            Follow{" "}
          </button>
        )
      ) : (
        <div className="jrkjrijrrrj"></div>
      )}
      {unfollow ? (
        <div className="unfolowbox">
          <div className="delete-the-colletion ajrjjrj">
            <div className="title-of--thise-action-e">
              <div onClick={activeFollow} className="close-that">
                <IoCloseSharp />
              </div>
              <div className="fjjtutjsjr">
                <p className="rkerr">Unfollow</p>{" "}
              </div>
            </div>
            <div className="jfkjworf">
              Their post will no longer appear in your feed. You can still look
              at their profile.{" "}
            </div>
            <div className="conte-thise-actionrrr active">
              <button onClick={() => removeFollow()}>UNFOLLOW</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ButtonFollow;
