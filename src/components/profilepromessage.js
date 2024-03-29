import React, { Component } from "react";
import axios from "axios";
import apiUrl from "apiUrl/url";
class ProfilePromessage extends Component {
  state = {
    icon: null,
    data: null,
    post: null,
    profile: null,
  };
  getprofilrhhhfhe = () => {
    axios
      .get(`/api/myfitstapro/${this.props.item.content}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.username) {
          this.setState({
            profile: res.data,
          });
        } else {
        }
      });
  };

  componentDidMount = () => {
    this.getprofilrhhhfhe();
  };

  render() {
    return (
      <div className="wrspejrj-profilej">
        {this.state.profile !== null ? (
          <div className="rjrjr">
            <div className="header-post">
              <div className="icon0tjnnr">
                <img
                  src={`${apiUrl.content}${this.state.profile.profileUrl}`}
                  loading="lazy"
                />
              </div>
              <div className="usernamerrjjr">{this.state.profile.username}</div>
            </div>
            <div className="barjsjj">
              <div className="box-thjtjtjr">
                {this.state.profile.numberOfProgram ?? 0} Program
              </div>
              <div className="box-thjtjtjr fjjr">
                {this.state.profile.numberOfSubscriber ?? 0} Subscribers
              </div>
            </div>
            <div className="rjrrj=tearjr"></div>
            <div className="wrsprrkrjjrjjr"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ProfilePromessage;
