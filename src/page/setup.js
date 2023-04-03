import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import LoadingSpin from "../component/loadingspin";
import { HiCheck } from "react-icons/hi";
import Agreement from "../setup/agrement";
import { BsArrowRepeat, BsGraphUp } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import ApiUrl from "../url";
import SelectPlan from "../setup/selectplan";
import Verification from "../setup/verification";
import BaxBar from "../component/barbox";
import Select from "../setup/setuppage";
import { withRouter } from "react-router-dom";
let source;
source = axios.CancelToken.source();

class Setup extends Component {
  state = {
    kind: 0,
    plan: [],
    created: null,
    step: 0,
    loadingButtton: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goToNectAfterConfifiguration = () => {
    if (this.state.plan.length > 0) {
      document.querySelector(".hold-that-mess").innerText = "";
      document.querySelector(".hold-that-mess").classList.remove("active");
      this.next(4);
    } else {
      document.querySelector(".hold-that-mess").innerText =
        "Choose at least one subscription plan";
      document.querySelector(".hold-that-mess").classList.add("active");
    }
  };

  createWallet = () => {
    this.setState({
      loadingButtton: true,
    });

    axios
      .post("/api/create-the-wallet", { step: 3 }, { withCredentials: true })
      .then((result) => {
        if (result.data.succes === true) {
          this.setState({
            loadingButtton: false,
          });
          this.next(3);
        }
      });
  };
  selectplan = ({ planChoose, value }) => {
    let option = {
      planChoose: planChoose,
      price: String(value),
    };
    let array = [...this.state.plan, option];
    this.setState({
      plan: array,
    });
  };

  removePlan = (planChoose) => {
    let list = [...this.state.plan].filter(
      (item) => item.planChoose !== planChoose
    );
    this.setState({
      plan: list,
    });
  };
  Activatemyfitstapropro = () => {
    let option = {
      userId: this.props.user.userId,
      username: this.props.user.username,
      email: this.props.user.email,
      plan: this.state.plan,
      accountType: this.state.kind,
    };
    if (this.state.kind !== null) {
      axios.post(`/api/add-a-new-myfitsta-user`, option).then((res) => {
        window.location.href = "/myfitstapro";
      });
    }
  };

  selectOption = (data) => {
    this.setState({
      kind: data,
    });
  };

  cleanPlan = () => {
    this.setState({
      plan: [],
    });
  };

  next = (data) => {
    this.setState({
      step: data,
    });
  };

  componentDidMount = () => {
    axios
      .get("/api/created-wallet", { withCredentials: true })
      .then((result) => {
        if (result.data.succes === true) {
          this.setState({
            created: true,
            step: result.data.step,
          });
        } else {
          this.setState({
            created: false,
            step: 1,
          });
        }
      });
  };
  goBack = (e) => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="hold-thewelcome0-courseroell">
              <div className="control-back">
                <div className="fjf">
                  <div onClick={this.goBack} className="back-button">
                    <BiArrowBack />
                  </div>
                  <p>Setup</p>
                </div>
              </div>
              <div className="box-that-container-thecoursecro">
                {this.state.step === 1 ? (
                  <div className="wpaer-theslider active  ">
                    <div className="welcom-title">Welcome to MYFITSTAPRO</div>
                    <div className="describe-ite-simple">
                      <div className="wtapthensjjfjtr">
                        <div className="class-boxx">
                          <div className="eldtoo"></div>
                          <div className="rrjjsjeje">
                            <div className="wrieii">
                              <div className="wrpsjiirir-icocod">
                                <BsArrowRepeat />
                              </div>
                              <div className="djfrjir">Create Subsciption</div>
                            </div>
                          </div>
                          <div className="decrioirbe">
                            <div className="wrapeiirr">
                              <div className="fjsifojdisf">
                                <HiCheck />
                              </div>
                              <div className="ksffkfkkf">
                                Create your own Subsciption plan
                              </div>
                            </div>
                            <div className="wrapeiirr">
                              <div className="fjsifojdisf">
                                <HiCheck />
                              </div>
                              <div className="ksffkfkkf">
                                Recuring payment from subscriber
                              </div>
                            </div>
                            <div className="wrapeiirr">
                              <div className="fjsifojdisf">
                                <HiCheck />
                              </div>
                              <div className="ksffkfkkf">
                                Quick and easy implimentation
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="controil-theaction">
                      <button
                        onClick={() => this.createWallet()}
                        className={`next agreen   ${
                          this.state.loadingButtton === true ? "loading" : ""
                        }  `}
                      >
                        {this.state.loadingButtton === true ? (
                          <LoadingSpin />
                        ) : (
                          "NEXT"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {this.state.step === 3 ? (
                  <div className="wpaer-theslider active ">
                    <SelectPlan
                      goToNectAfterConfifiguration={
                        this.goToNectAfterConfifiguration
                      }
                      removePlan={this.removePlan}
                      selectplan={this.selectplan}
                      next={this.next}
                    />
                  </div>
                ) : (
                  ""
                )}

                {this.state.step === 4 ? (
                  <div className="wpaer-theslider active">
                    <Agreement
                      cleanPlan={this.cleanPlan}
                      next={this.next}
                      Activatemyfitstapropro={this.Activatemyfitstapropro}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Setup);
