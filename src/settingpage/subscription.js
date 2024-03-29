import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import SubscriptionInfo from "subscription/subscriptioninfo";
class Subcription extends Component {
  state = {
    loading: true,
    list: null,
  };
  goBack = () => {
    this.props.history.goBack();
  };

  handlePgram = () => {
    let option = {
      userId: this.props.user.userId,
    };
    axios.post("/api/get-my-subscription", option).then((res) => {
      if (res.data !== "no") {
        let list = res.data.filter((item) => item.subscriptionType === 0);
        if (list.length > 0) {
          this.setState({
            list: list,
          });
        } else {
          this.setState({
            list: "no",
          });
        }
      } else {
        this.setState({
          list: "no",
        });
      }
    });
  };

  componentDidMount = () => {
    this.handlePgram();
  };
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>Subscriptions</p>
          </div>
        </div>
        <div className="wraper-boxx-for-siucn">
          <div className="box-table-tabs">
            <div className="box-peopler active">Subscription</div>
          </div>

          {this.state.list !== null ? (
            this.state.list !== "no" ? (
              <div className="holt-the-wiri-subbr">
                {this.state.list.map((item, index) => {
                  return <SubscriptionInfo key={index} item={item} />;
                })}
              </div>
            ) : (
              <div className="wraperififoojfhr">
                <div className="wraperjf-ffkfkr">
                  <p>No Subscription</p>
                  <p>
                    When you subscribe to someone you will be able to see it
                    here
                  </p>
                </div>
              </div>
            )
          ) : (
            ""
          )}

          <div className="holt-the-program-bught">
            <div className="wrap-the-box-dicjss">
              <div className="holt-theinfi-jjr"></div>
              <div className="hold-thst-detail"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps)(withRouter(Subcription));
