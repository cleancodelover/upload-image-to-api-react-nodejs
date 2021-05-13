import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && video) {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("video", video);

      axios
        .post("http://localhost:4700/video", data)
        .then((res) => {
          if (res) {
            setTitle("");
            setDescription("");
            setVideo("");
            alert(
              "Video uploaded to the server but could not publish it to Facebook. You do not have permission to publish to Destiny Soft"
            );
            history.push("/dashboard");
          } else {
            alert(res.token);
          }
        })
        .catch((err) => alert(err));
    } else {
      alert("All fields are required");
    }
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="row mt-5">
        <main role="main" className="col-md-6 m-auto col-lg-6 px-4">
          <div className="table-responsive">
            <div className="auth-wrapper mt-0">
              <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                  <h3>Upload Video</h3>
                  <div className="form-group">
                    <label>Video Title</label>
                    <input
                      id="title"
                      value={title}
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter Title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      id="description"
                      value={description}
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                      placeholder="Enter Description"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="file"
                        id="video"
                        accept=".mp4"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          setVideo(file);
                        }}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                  <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Upload;
