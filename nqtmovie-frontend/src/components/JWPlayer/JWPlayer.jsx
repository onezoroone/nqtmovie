/* eslint-disable react/prop-types */
import React from 'react';
import JWPlayer from '@jwplayer/jwplayer-react';

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.file = props.file;
    this.players = {};
    this.onTime = this.onTime.bind(this);
    this.onBeforePlay = this.onBeforePlay.bind(this);
    this.didMountCallback = this.didMountCallback.bind(this);
    this.loadPlayerLibrary();
  }

  loadPlayerLibrary() {
    const src = "/jwplayer.js";
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.onload = () => this.setState({ loaded: true });
    document.body.append(script);
  }

  didMountCallback({ player, id }) {
    this.players[id] = player;
    const eventLog = document.getElementById("log");
    player.on("all", (event) => {
      const li = document.createElement("li");
      li.innerText = `${id}: ${event}`;
      eventLog.prepend(li);
    });
  }

  onBeforePlay() {
    Object.keys(this.players).forEach((playerId) => {
      const player = this.players[playerId];
      const isPlaying = player.getState() === "playing";
      player.addButton("https://img.nguonc.com/players/forward.svg", "Đến 10s", function () {
        player.seek(player.getPosition() + 10);
      }, "Đến 10s");
      player.addButton("/logo.png", "NQTMOVIE.SITE");
      if (isPlaying) {
        player.pause();
      }
      const resumevideodata = JSON.parse(localStorage.getItem('resumedata'));
      if(resumevideodata){
        const matchingKey = Object.keys(resumevideodata).find(key => key === window.location.pathname);
        if(matchingKey){
            const matchingValue = resumevideodata[matchingKey];
            const parts = matchingValue.split(':');
            if(parseInt(parts[0]) < parseInt(parts[1])){
                player.seek(parts[0]);
            }
        }
      }
    });
  }

  getCookieValue = (cookieName) => {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  };

  onTime(event) {
    Object.keys(this.players).forEach((playerId) => {
        const player = this.players[playerId];
        const storedData = JSON.parse(localStorage.getItem('resumedata')) || {};
        storedData[window.location.pathname] = `${event.position}:${player.getDuration()}`;
        localStorage.setItem('resumedata', JSON.stringify(storedData));
      });
  }

  render() {
    const configDefaults = { 
        "autostart": false,
        "displaytitle": false,
        "primary": "html5",
        "key": "ITWMv7t88JGzI0xPwW8I0+LveiXX9SWbfdmt0ArUSyc=",
        "mute": false,
        "aspectratio": "16:9",
        "controls": true,
        "height": "100%",
        "playbackRateControls": true,
        "preload": "metadata",
        "width": "100%",
        "abouttext": 'https://nqtmovie.site',
        "aboutlink": 'https://nqtmovie.site', 
        logo: {
            file: "/jack.png",
            logoBar: "",
            position: "top-right",
        },
    };
    return this.state.loaded ? (
      <div className="players-container position-absolute h-100 w-100">
        <JWPlayer
          config={configDefaults}
          onTime={this.onTime}
          onBeforePlay={this.onBeforePlay}
          didMountCallback={this.didMountCallback}
          file={this.file}
        />
      </div>
    ) : (
      "loading..."
    );
  }
}
export default PlayerContainer;