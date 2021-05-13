import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
const url = "http://localhost:4700/video";

const Video = () => {
  const { id } = useParams();
  let history = useHistory();
  //   const [video, setVideo] = useState("");
  //   const getVideo = async () => {
  //     const response = await fetch(`${url}/${id}`);
  //     const video = await response.json();
  //     if (video.success <= 0) {
  //       alert(video.message);
  //       setVideo("");
  //     } else {
  //       setVideo(video.data);
  //     }
  //   };
  //   useEffect(() => {
  //     getVideo();
  //   }, [url]);

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <main role="main" className="col-md-6 m-auto col-lg-6 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom mt-5">
            <div className="btn-toolbar mb-0 mb-md-0">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  history.push("/dashboard");
                }}
              >
                Videos
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <h3>Video Playing</h3>
                <video width="320" height="240" controls muted="muted" autoPlay>
                  <source
                    src={`http://localhost:4700/video/${id}`}
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Video;
