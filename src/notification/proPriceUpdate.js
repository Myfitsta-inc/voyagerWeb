import React, { Component } from "react";
import axios from "axios";
import IconProfile from "Components/Iconpicture";
import Username from "Components/Username";
import DataPost from "Components/datePost";
class CommentNotification extends Component {
  state = {
    username: null,
    media: null,
  };

  getmedia = () => {
    axios
      .get(`/api/postinfo/${this.props.item.media}`, { withCredentials: true })
      .then((res) => {
        if (res.data.filename) {
          this.setState({
            media: res.data,
          });
        } else {
        }
      });
  };
  componentDidMount = () => {
    //this.getmedia()
  };
  render() {
    return (
      <div className="div-hold-hold-thenotification">
        <div className="wjsjrhrnnff ">
          <div className="icon-of-thedube">
            {this.props.item ? (
              <IconProfile user={this.props.item.notifiyiId} />
            ) : (
              ""
            )}
          </div>
          <div className="messahrhrn-not">
            <div className="ejwjjr">
              {this.props.item ? (
                <Username link={true} user={this.props.item.notifiyiId} />
              ) : (
                ""
              )}
            </div>
            <div className="bmhjn">
              {" "}
              <div>
                Change his subscription to : {this.props.item.extraInfo}
              </div>{" "}
              <div className="boxfj-rnj">
                {" "}
                <DataPost date={this.props.item.date} />
              </div>
            </div>
          </div>
        </div>

        {/*<div className="itjejmsmf">
            <button><i className="fas fa-ellipsis-v"></i></button>
        </div>*/}
      </div>
    );
  }
}

export default CommentNotification;
