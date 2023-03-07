import React, { MouseEventHandler, setState } from "react";
import { MdDashboard } from "react-icons/md";

import StartMenu from "./StartMenu";

interface TaskbarState {
  timeAndDate: {
    time: string;
    date: string;
  };
  recentlyList: {
    id: number;
    windowName: string;
    openWindow: (windowTitle: string) => void;
  };
  rightClick: {
    shown: boolean;
    x: number;
    y: number;
  };
  showStartMenu: boolean;
}

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

class Taskbar extends React.Component<
  { openWindow: (windowTitle: string) => void },
  { taskbarState: TaskbarState }
> {
  timeAndDate = new Date();

  constructor() {
    super();

    this.state = {
      taskbarState: {
        timeAndDate: {
          time:
            this.timeAndDate.getHours().toLocaleString() +
            ":" +
            (this.timeAndDate.getMinutes() < 10 ? "0" : "") +
            this.timeAndDate.getMinutes().toLocaleString() +
            (this.timeAndDate.toLocaleTimeString().includes("AM")
              ? " AM"
              : " PM"),
          date: this.timeAndDate.toLocaleDateString()
        },
        recentlyList: {
          id: 1,
          windowName: "hi",
          openWindow: () => window
        },
        rightClick: {
          shown: false,
          x: 0,
          y: 0
        },
        showStartMenu: false
      }
    };
    this.showStartMenu = this.showStartMenu.bind(this);
  }

  componentDidMount() {
    this.setState({
      taskbarState: {
        timeAndDate: {
          time:
            new Date().getHours().toLocaleString() +
            ":" +
            new Date().getMinutes().toLocaleString(),
          date: new Date().toLocaleDateString()
        },

        recentlyList: {
          id: this.state.taskbarState.recentlyList.id,
          windowName: this.state.taskbarState.recentlyList.windowName,
          openWindow: this.props.openWindow
        },
        rightClick: this.state.taskbarState.rightClick,
        showStartMenu: this.state.taskbarState.showStartMenu
      }
    });

    setInterval(() => {
      this.setState({
        taskbarState: {
          timeAndDate: {
            time:
              this.timeAndDate.getHours().toLocaleString() +
              ":" +
              (this.timeAndDate.getMinutes() < 10 ? "0" : "") +
              this.timeAndDate.getMinutes().toLocaleString() +
              (this.timeAndDate.toLocaleTimeString().includes("AM")
                ? " AM"
                : " PM"),
            date: this.timeAndDate.toLocaleDateString()
          },
          recentlyList: this.state.taskbarState.recentlyList,
          rightClick: this.state.taskbarState.rightClick,
          showStartMenu: this.state.taskbarState.showStartMenu
        }
      });
    }, 1000);
  }

  handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) {
      console.log("right click");
      this.state = {
        taskbarState: {
          timeAndDate: this.state.taskbarState.timeAndDate,
          recentlyList: this.state.taskbarState.recentlyList,
          rightClick: {
            shown: true,
            x: e.clientX,
            y: e.clientY - e.currentTarget.getBoundingClientRect().y
          },
          showStartMenu: false
        }
      };
      console.log(e.currentTarget.getBoundingClientRect().y);
      // Actions to perform when left mouse button is clicked, like update state
    } else if (e.button === 0) {
      console.log("left click");
      this.state = {
        taskbarState: {
          timeAndDate: this.state.taskbarState.timeAndDate,
          recentlyList: this.state.taskbarState.recentlyList,
          rightClick: {
            shown: false,
            x: 0,
            y: 0
          },
          showStartMenu: this.state.taskbarState.showStartMenu
        }
      };
    }
    console.log(this.state.taskbarState.rightClick.shown);
  };

  showStartMenu() {
    this.setState({
      taskbarState: {
        timeAndDate: this.state.taskbarState.timeAndDate,
        recentlyList: this.state.taskbarState.recentlyList,
        rightClick: this.state.taskbarState.rightClick,
        showStartMenu: !this.state.taskbarState.showStartMenu
      }
    });
  }

  render() {
    return (
      <h2 className="Taskbar" onMouseDown={this.handleMouseDown} id="taskbar">
        <div className="startButton" onClick={this.showStartMenu}>
          <MdDashboard className="startButtonIcon" />
          {this.state.taskbarState.showStartMenu && (
            <StartMenu
              list={this.state.taskbarState.recentlyList}
              openWindow={this.props.openWindow}
            />
          )}
        </div>
        <div className="timeAndDate">
          {this.state.taskbarState.timeAndDate.time}
          <br /> {this.state.taskbarState.timeAndDate.date}
        </div>
        {this.state.taskbarState.rightClick.shown && (
          <div
            className="taskbarRightClick"
            style={{
              position: "absolute",
              top: this.state.taskbarState.rightClick.y,
              left: this.state.taskbarState.rightClick.x
            }}
          >
            HELLO
          </div>
        )}
      </h2>
    );
  }
}

export default Taskbar;
