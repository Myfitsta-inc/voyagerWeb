import React, { Component } from "react";
import axios from "axios";
import MessageButton from "./messageSomeone";
import ButtonFollow from "./ButtonFollow";
import { Link } from "react-router-dom";
import IconProfile from "./Iconpicture";
class ProfileModal extends Component {
  state = {
    profile: {},
  };

  loadProfile = () => {
    this.setState({
      profile: {},
    });
    axios
      .get(`/api/profile/${this.props.user}`, { withCredentials: true })
      .then((res) => {
        if (res.data.username) {
          this.setState({
            //profile:res.data
          });
        }
      });
  };
  componentDidUpdate = (prevProps) => {};
  componentDidMount = () => {};

  render() {
    return this.props.profile.useriid ? (
      <div className="box-that-hold-theprofile-ui-desios">
        <div className="box-wraper-thebox-of-cnsjf">
          <div className="wraper-the-icob">
            <IconProfile user={this.props.user} />
          </div>
          <div className="wraper-the-infrofjjsjnnnsn">
            <div className="name-p">{this.props.profile.username}</div>
            <div className="info-acctt">
              <div className="all">
                <div className="number-post">
                  {this.props.profile.numberOfPosts}
                </div>
                <p>Post</p>
              </div>
              <div className="all">
                <Link to={`user/${this.props.profile.username}/follower`}>
                  {this.props.profile.numberOfFollowers} Followers
                </Link>
              </div>
              <div className="all">
                <Link to={`user/${this.props.profile.username}/following`}>
                  {this.props.profile.numberOfFollowings} Following
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="wroarr-homfhjfj">
          <ButtonFollow friend={this.props.profile.userId} />
        </div>
        <div className="holf-the-bio">
          <p dangerouslySetInnerHTML={{ __html: this.props.profile.bio }}></p>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
export default ProfileModal;
