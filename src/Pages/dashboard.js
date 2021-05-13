import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useHistory } from "react-router-dom";
// import SideBar from "../components/sidebar";
import "../css/dashboard.css";
import PublicHeader from "../components/public-header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { useFetch } from "../adapters/usefetch";
const url = "http://localhost:4700/videos";

const Dashboard = () => {
  let history = useHistory();
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    const response = await fetch(url);
    const videos = await response.json();
    if (videos.success <= 0) {
      alert(videos.message);
      setVideos([]);
    } else {
      setVideos(videos.data);
    }
  };
  useEffect(() => {
    getVideos();
    // return () => {
    //   cleanup;
    // };
  }, [url]);

  const playVideo = (id) => {
    // let newList = videos.filter((video) => video.id !== id);
    //setList(newList);
    history.push(`/video/${id}`);
  };
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-md-10 m-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2"></h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-toolbar mb-2 mb-md-0">
                  <Link className="btn btn-sm btn-primary" to={"/upload"}>
                    Upload video to Facebook
                  </Link>
                </div>
              </div>
            </div>

            <h2>Section title</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => {
                    const { id, title, description } = video;
                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{title}</td>
                        <td>{description}</td>
                        <td>
                          <button onClick={() => playVideo(id)}>Play</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
