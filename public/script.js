(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory(root));
  } else if (typeof exports === "object") {
    module.exports = factory(root);
  } else {
    root.triumphantWebRTC = factory(root);
  }
})(
  typeof global !== "undefined" ? global : this.window || this.global,
  function (root) {
    "use strict";
    /* globals MediaRecorder */
    let window = root;
    let mediaRecorder;
    let recordedBlobs;
    let isRecording;

    var triumphantWebRTC = {};
    var supports = !!document.querySelector && !!root.addEventListener; // Feature test
    var settings;

    // Default settings
    var defaults = {
      initVideoClass: "video",
      videoRecorderClass: "recorder",
      mimeType: "video/webm;codecs=opus,vp8",
      videoType: "video/mp4",
      blobType: "video/webm",
      fb_access_token:
        "EAACtOsQWxHEBACnC4h65aCC6T5wDTzjf7k7b13Va3UdlhInM0QnuDIXYnoPnTusZAMAFuwJOdxsNrtBCwqMpbPdjG629QlTeciJiA9fO2MrMBOoYhitBLlvczzWvZA2CcWK2cDFYxZAmfKzNbkDeRjrAlWxDzjpSzmPhzdWmDVm1hlqK1yvzJZCQMYwVIdquccljgN3ubygVsVmutacDzFXnlOUo5ZAQ6PvMZCJYxl0QZDZD",
      fbSecureStreamURL:
        "rtmps://live-api-s.facebook.com:443/rtmp/3808214982607623?s_bl=1&s_psm=1&s_sc=3808215135940941&s_sw=0&s_vt=api-s&a=Abz6rVBqX9k7DhdC",
      callbackBefore: function () {},
      callbackAfter: function () {},
    };

    //Private functions

    /**
     * local function to do the actua streaming
     * @param {*} stream
     */
    function handleSuccess(stream) {
      console.log("getUserMedia() got stream:", stream);
      window.stream = stream;

      const gumVideo = document.querySelector(
        `video#${defaults.videoRecorderClass}`
      );
      gumVideo.srcObject = stream;
    }

    /**
     * This method process continuous stream to facebook
     */
    async function streamingToFacebook() {
      const blob = new Blob(recordedBlobs, { type: defaults.videoType });
      //Creates a form data and appends the recorded video and
      var formData = new FormData();
      formData.append(
        "file",
        blob,
        Math.floor(Math.random() * 100800000000) + 1
      );
      try {
        const response = await fetch(
          "https://localhost:44366/facebook/streaming",
          {
            method: "POST",
            body: formData,
          }
        );
        const content = await response.json();
        if (content.issuccess) {
          const sResponse = streamingToFacebook();
          if (sResponse.issuccess) {
            isRecording = true;
            return sResponse;
          }
        }
        console.log(content);
        return content;
      } catch (err) {
        console.log(err);
      }
    }
    /**
     * Checks if there is streamed content to record
     * @param {*} event
     */
    function handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
      }
    }

    /**
     * Initializes video streaming
     * @param {*} constraints
     */
    async function initLocal(constraints) {
      try {
        await navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            //(stream) => (video.srcObject = stream);
            handleSuccess(stream);
          });
      } catch (e) {
        console.error("navigator.getUserMedia error:", e);
      }
    }

    // Object for public APIs
    /**
     * Destroy the current initialization of the plugin.
     * @public
     */
    triumphantWebRTC.destroy = function () {
      // If plugin isn't already initialized, stop
      if (!settings) return;

      // Remove init class for conditional CSS
      document.documentElement.classList.remove(settings.videoRecorderClass);

      // Reset variables
      settings = null;
    };

    /**
     * Initialize Plugin. Incase the user needs to manually initialize with custom parameters
     * this case you give params in an object format {a,b...}
     * @public
     * @param {Object} options User settings
     */
    triumphantWebRTC.init = function (options) {
      // feature test
      if (!supports) return;

      // Destroy any existing initializations
      triumphantWebRTC.destroy();

      // Merge user options with defaults
      settings = root.extend(defaults, options || {});

      // Add class to HTML element to activate conditional CSS
      document.documentElement.classList.add(settings.videoRecorderClass);
    };

    /**
     * exposed public function to call when a user wants to start playing
     * the recorded video
     * @param {*} el_id
     */
    triumphantWebRTC.playVideo = function (el_id) {
      const superBuffer = new Blob(recordedBlobs, { type: defaults.blobType });
      let recordedVideo = document.getElementById(el_id);
      recordedVideo.src = null;
      recordedVideo.srcObject = null;
      recordedVideo.src = window.URL.createObjectURL(superBuffer);
      recordedVideo.controls = true;
      recordedVideo.play();
    };

    /**
     * downloads the recorded video
     */
    triumphantWebRTC.downloadVideo = function () {
      const blob = new Blob(recordedBlobs, { type: defaults.videoType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = defaults.videoType;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    };

    /**
     * public function to start recording video
     */
    triumphantWebRTC.startRecording = function () {
      recordedBlobs = [];
      let options = { mimeType: defaults.mimeType };
      try {
        mediaRecorder = new MediaRecorder(window.stream, options);
      } catch (e) {
        console.error("Exception while creating MediaRecorder:", e);
        return;
      }
      mediaRecorder.onstop = (event) => {
        console.log("Recorder stopped: ", event);
      };

      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
    };

    /**
     * exposed plugin function to stop recording video
     */
    triumphantWebRTC.stopRecording = function () {
      mediaRecorder.stop();
    };

    /**
     * exposed plugin function to start video streaming
     */
    triumphantWebRTC.startVideo = async function () {
      const constraints = {
        audio: {
          echoCancellation: { exact: false },
        },
        video: {
          width: 1280,
          height: 720,
        },
      };
      await initLocal(constraints);
    };

    /**
     * this method streams live video to facebook
     * @param {*} options
     */
    triumphantWebRTC.startStreamingToFacebook = async function (options) {
      (async () => {
        try {
          let formData = new FormData();
          // Push our data into our FormData object
          for (name in options) {
            alert(options[name]);
            formData.append(name, options[name]);
          }

          const response = await fetch(
            "https://localhost:44366/facebook/startstreaming",
            {
              method: "POST",
              body: formData,
            }
          );
          const content = await response.json();
          if (content.issuccess) {
            const sResponse = streamingToFacebook();
            if (sResponse.issuccess) {
              setTimeout(function () {
                streamingToFacebook();
              }, 3000);
              alert("Video streaming started");
            }
          }
          console.log(content);
          return content;
        } catch (err) {
          console.log(err);
        }
      })();
    };

    /**
     * streams live video to youtube
     * @param {*} options
     */
    triumphantWebRTC.streamToYouTube = function (options) {};

    /**
     * streams live video to twitch
     * @param {*} options
     */
    triumphantWebRTC.streamToTwitch = function (options) {};
    /**
     * streams live video to periscope
     * @param {*} options
     */
    triumphantWebRTC.streamToPeriscope = function (options) {};
    return triumphantWebRTC;
  }
);
