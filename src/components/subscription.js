import React, { Component } from "react";
import PaymentSub from "payment/paymentsub";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";
import { SILVER_PLAN, PLATINUM_PLAN, GOLD_PLAN } from "productOptions/plan";

class Subscribe extends Component {
  state = {
    selected: null,
    tabNext: false,
  };

  handleSelected = (data) => {
    this.setState({
      selected: data,
    });
  };

  handlenext = () => {
    if (this.state.selected !== null) {
      this.setState({
        tabNext: !this.state.tabNext,
      });
    }
  };

  render() {
    return (
      <motion.div
        className={`overlay-to-subcribe  ${
          this.props.subscribeBox === false ? "" : "active"
        }`}
      >
        <motion.div className="pupurps-to0subcribve">
          <div className="bander-box-subred">
            <div className="babdo">
              <button
                onClick={() => {
                  this.props.closesubscribe();
                }}
                className="close-that"
              >
                <IoCloseSharp />
              </button>
              <p>Subscribe</p>
            </div>
          </div>
          <div className="hold-thesubcribe">
            {!this.state.tabNext && (
              <p className="his-nreame">Select one subscription plan</p>
            )}

            {this.state.tabNext ? (
              ""
            ) : (
              <div className="wrajrkr-wosorr">
                <div className="hold-that-scuscri-tion">
                  {this.props.plan?.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          this.handleSelected(item);
                        }}
                        className="wraper-thesubscriotion "
                        key={item._id}
                      >
                        <div
                          className={`wrepr-arounbd0the-plan ${
                            this.state.selected !== null
                              ? item.planName === this.state.selected.planName
                                ? "active"
                                : ""
                              : ""
                          }`}
                        >
                          <div className="div-wiri">
                            <button className="asdd-sellect"></button>
                            <p>{item.planName}</p>
                          </div>
                          <div className="wharoor-the-amoiut">
                            <span>$</span>
                            <p className="price-it">
                              {convertFromStripe(item.price, "USD")}
                            </p>{" "}
                            /{" "}
                            <p className="title-4hh4">
                              {item.planName === SILVER_PLAN
                                ? "month"
                                : item.planName === PLATINUM_PLAN
                                ? "3 months"
                                : "Year"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="hold-that-mess"></p>
                <div className="controil-theaction">
                  <button
                    onClick={this.handlenext}
                    className={`add-shch ${!this.state.selected && "active"}`}
                  >
                    CONTINUE
                  </button>
                </div>
              </div>
            )}

            {this.state.tabNext ? (
              <PaymentSub
                handlenext={this.handlenext}
                publisherId={this.props.profile}
                item={this.state.selected}
              />
            ) : (
              ""
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }
}

export default Subscribe;
