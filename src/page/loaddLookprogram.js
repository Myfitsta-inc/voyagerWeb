import React, { Component } from "react";
import Nav from "Components/nav";
import axios from "axios";
import "style/loadp.css";
import { withRouter, NavLink } from "react-router-dom";
import Video from "Components/video";
import Username from "Components/Username";
import { BiArrowBack } from "react-icons/bi";
import LoadingSpin from "Components/Loadingspin";
import apiUrl from "apiUrl/url";
import { GrPlayFill } from "react-icons/gr";
import ProIcon from "programs/proicon";
import Report from "Components/report";
import { connect } from "react-redux";
let source;
source = axios.CancelToken.source();
class LoadlookProgram extends Component {
  state = {
    playing: false,
    media: {},
    relaterd: null,
    id: this.props.match.params.id,
    comment: false,
    lecture: true,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }

  goBack = (e) => {
    this.props.history.goBack();
  };
  getProgramInfo = () => {
    axios
      .get(
        `/api/account/program/workoutt/course/${this.props.match.params.id}`,
        { withCredentials: true, cancelToken: source.token }
      )
      .then((res) => {
        if (res.data.publisherId) {
          this.setState({
            media: res.data,
          });
          if (this.state.playing === false) {
            this.loadRelater(res.data.programId, res.data.publisherId);
            this.setState({
              playing: true,
            });
          }
        } else {
          this.props.history.push("/home");
        }
      });
  };

  changlepage = (one, two) => {
    this.setState({
      comment: one,
      lecture: two,
    });
  };

  loadRelater = (programId, user) => {
    axios
      .get(`/api/loaddMyProgramContainer/${programId}/${user}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        this.setState({
          relaterd: res.data,
        });
      });
  };

  componentDidMount = () => {
    this.getProgramInfo();
  };
  componentDidUpdate(prevProps) {
    if (this.state.id !== this.props.match.params.id) {
      this.getProgramInfo();
      this.setState({ id: this.props.match.params.id });
    }
  }

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };
  render() {
    return (
      <div className="conatiner">
        <Nav />
        <div id="app">
          <div id="body-tabs">
            {this.state.media._id ? (
              <div className="hold-the-program-player-coterrool">
                <div className="control-back tobabrbfb">
                  <div className="wrieii">
                    <div onClick={this.goBack} className="close-that">
                      <BiArrowBack />
                    </div>
                    <p>Program</p>
                  </div>
                </div>
                <div className="wrrpaorjwwko">
                  <div className="video--image-elmnebnt-player">
                    <div className="box-player-elment">
                      {this.state.media.mediaInfo.mediaType ? (
                        this.state.media.mediaInfo.mediaType.includes(
                          "image"
                        ) ? (
                          <img
                            src={`${apiUrl.content}${this.state.media.mediaInfo.mediaUrl}`}
                          />
                        ) : (
                          <Video data={this.state.media.mediaInfo.mediaUrl} />
                        )
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="ejtcondigjojr">
                      <div className="iondoftjkfjjf">
                        <div className="hoilt-tje-titlem">
                          {this.state.media.title}
                        </div>
                        <div className="rjengtnjr4">
                          <div className="wraprjttrjr-infofo">
                            <div className="titlejkr-ifnfifjfjfjtegj"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ejwkjrtngnej"></div>
                    <div className="info-abour-thedub">
                      <div className="box-the-hold-your-info">
                        <div className="rjfnvvbnf">
                          <div className="iconnrhrjrjjr">
                            {this.state.media.publisherId ? (
                              <ProIcon user={this.state.media.publisherId} />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="info-about-him">
                            <Username
                              user={this.state.media.publisherId}
                              link={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="the-boxjjrjr">
                      {this.state.media.description.length > 0 ? (
                        <div className="holthw">
                          {this.state.media.description}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      className={`commnentnjntjn ${
                        this.state.comment ? "active" : ""
                      }`}
                    ></div>
                  </div>

                  <div
                    className={`showthebar-of-theother-element-player ${
                      this.state.lecture ? "active" : ""
                    }`}
                  >
                    <div className="fjejdgrrfje">
                      <div className="titketntkjej">Up Next</div>
                    </div>
                    <div className="load-sjjkr">
                      {this.state.relaterd !== null ? (
                        this.state.relaterd?.map((item) => {
                          return (
                            <div
                              className={`box-that-hold-theinfo-next-program-c ${
                                item._id === this.props.match.params.id
                                  ? "active"
                                  : ""
                              }`}
                              key={item._id}
                            >
                              <div className="info-afachi">
                                <div className="rro4jrr"></div>

                                <NavLink
                                  to={`/account/program/myfitsta/course/${item._id}`}
                                  className="read-load"
                                ></NavLink>
                                {item.mediaInfo.mediaType.includes("image") ? (
                                  <img
                                    src={`${apiUrl.content}${item.mediaInfo.mediaUrl}`}
                                  />
                                ) : (
                                  <div className="wraprorpsmmr">
                                    <video>
                                      <source
                                        src={`${apiUrl.content}${item.mediaInfo.mediaUrl}`}
                                      />
                                    </video>
                                    <div className="jfjfnnerbb">
                                      <GrPlayFill
                                        style={{ fill: "white" }}
                                        size={20}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="prohram-description">
                                <div className="rhrjjrjr-of-workot ">
                                  <p className="title-of-workot fbfjjr">
                                    {" "}
                                    {item.title}
                                  </p>
                                </div>

                                <div className="hold-descroptionr-rn">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="bixnknfkfjkjrjr">
                          <LoadingSpin />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bixnknfkfjkjrjr">
                <LoadingSpin />
              </div>
            )}
          </div>
        </div>

        <Report />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updataReport: (data) => {
      dispatch({ type: "UPDATE_REPORT", value: data });
    },
  };
};
export default connect(null, mapDispatchToProps)(withRouter(LoadlookProgram));
