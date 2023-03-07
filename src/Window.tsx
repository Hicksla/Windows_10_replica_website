import React, { useEffect } from "react";
import {
  MdMinimize,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdClose
} from "react-icons/md";

interface window {
  id: number;
  title: string;
  isFullscreen: boolean;
  isVisible: boolean;
  width: number;
  height: number;
  posX: number;
  posY: number;
  closeWindow: (closeWindow: number) => void;
  updateWindow: (
    windowID: number,
    isFullscreen: boolean,
    isVisible: boolean,
    width: number,
    height: number,
    posX: number,
    posY: number
  ) => void;
  isCurrentlyMoving?: boolean;
  resize?: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  window?: any;
}

class Window<prop> extends React.Component<
  prop & window,
  { settings: window }
> {
  constructor() {
    super();
    this.state = {
      settings: {
        id: 0,
        title: "",
        isFullscreen: false,
        isVisible: false,
        width: 0,
        height: 0,
        posX: 0,
        posY: 0,
        isCurrentlyMoving: false,
        resize: {
          top: false,
          right: false,
          bottom: false,
          left: false
        }
      }
    };
    this.OnMouseMove = this.OnMouseMove.bind(this);
    this.OnMouseDown = this.OnMouseDown.bind(this);
    this.OnMouseUp = this.OnMouseUp.bind(this);
    this.OnMouseOut = this.OnMouseOut.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  componentDidMount() {
    this.setState({
      settings: {
        id: this.props.id,
        title: this.props.title,
        isFullscreen: this.props.isFullscreen,
        isVisible: this.props.isVisible,
        width: this.props.width,
        height: this.props.height,
        posX: this.props.posX,
        posY: this.props.posY,
        closeWindow: this.props.closeWindow,
        isCurrentlyMoving: false,
        resize: {
          top: false,
          right: false,
          bottom: false,
          left: false
        },
        window: this.props.window
      }
    });
  }

  setInvisible() {
    if (this.state.settings.isVisible) {
      this.setState({
        settings: {
          title: "Hello",
          isFullscreen: false,
          isVisible: false,
          width: 500,
          height: 500,
          posX: 100,
          posY: 100
        }
      });
    } else {
      this.setState({
        settings: {
          title: "Hello",
          isFullscreen: false,
          isVisible: true,
          width: 500,
          height: 500,
          posX: 100,
          posY: 100
        }
      });
    }
  }

  setFullscreen() {
    if (this.state.settings.isFullscreen) {
      this.setState({
        settings: {
          title: this.props.title,
          isFullscreen: false,
          isVisible: true,
          width: 100,
          height: 100,
          posX: 0,
          posY: 0
        }
      });
    } else {
      this.setState({
        settings: {
          title: "Hello",
          isFullscreen: true,
          isVisible: true,
          width: 500,
          height: 500,
          posX: 100,
          posY: 100
        }
      });
    }
  }

  closeWindow() {
    this.props.closeWindow(this.props.id);
  }

  OnMouseDown(evnt: MouseEvent) {
    if (this.state.settings.isFullscreen) {
      this.setState({
        settings: {
          title: this.props.title,
          isFullscreen: this.state.settings.isFullscreen,
          isVisible: this.props.isVisible,
          width: 500,
          height: 500,
          posX: evnt.clientX - 200,
          posY: evnt.clientY - 5,
          isCurrentlyMoving: true,
          resize: {
            top: this.props.top,
            right: this.props.right,
            bottom: this.props.bottom,
            left: false
          }
        }
      });
    }
    this.setState({
      settings: {
        title: this.props.title,
        isFullscreen: false,
        isVisible: this.props.isVisible,
        width: this.state.settings.width,
        height: this.state.settings.height,
        posX: this.state.settings.posX,
        posY: this.state.settings.posY,
        isCurrentlyMoving: true,
        resize: {
          top: this.state.settings.resize.top,
          right: this.state.settings.resize.right,
          bottom: this.state.settings.resize.bottom,
          left: false
        }
      }
    });
  }

  OnMouseMove(evnt: MouseEvent) {
    if (this.state.settings.isCurrentlyMoving) {
      this.setState({
        settings: {
          title: this.props.title,
          isFullscreen: this.state.settings.isFullscreen,
          isVisible: this.props.isVisible,
          width: this.props.width,
          height: this.props.height,
          posX: this.state.settings.posX + evnt.movementX,
          posY: this.state.settings.posY + evnt.movementY,
          isCurrentlyMoving: this.state.settings.isCurrentlyMoving,
          resize: {
            top: this.state.settings.resize.top,
            right: this.state.settings.resize.right,
            bottom: this.state.settings.resize.bottom,
            left: false
          }
        }
      });
      this.props.updateWindow(
        this.props.id,
        false,
        false,
        this.state.settings.width,
        this.state.settings.height,
        this.state.settings.posX,
        this.state.settings.posY
      );
    }
  }

  OnMouseUp(evnt: MouseEvent) {
    this.setState({
      settings: {
        title: this.props.title,
        isFullscreen: this.state.settings.isFullscreen,
        isVisible: this.props.isVisible,
        width: this.props.width,
        height: this.props.height,
        posX: this.state.settings.posX,
        posY: this.state.settings.posY,
        isCurrentlyMoving: false,
        resize: {
          top: this.state.settings.resize.top,
          right: this.state.settings.resize.right,
          bottom: this.state.settings.resize.bottom,
          left: this.state.settings.resize.left
        }
      }
    });
  }

  OnMouseOut(evnt: MouseEvent) {
    if (this.state.settings.isCurrentlyMoving) {
      this.setState({
        settings: {
          title: this.props.title,
          isFullscreen: this.state.settings.isFullscreen,
          isVisible: this.props.isVisible,
          width: this.state.settings.width,
          height: this.state.settings.height,
          posX: evnt.clientX - 100,
          posY: evnt.clientY - 25,
          isCurrentlyMoving: this.state.settings.isCurrentlyMoving,
          resize: {
            top: this.state.settings.resize.top,
            right: this.state.settings.resize.right,
            bottom: this.state.settings.resize.bottom,
            left: false
          }
        }
      });
    }
  }

  render() {
    return (
      <div
        className="window"
        style={{
          width: this.state.settings.isFullscreen
            ? "100%"
            : this.state.settings.width + "px",
          height: this.state.settings.isFullscreen
            ? "calc(100% - 75px)"
            : this.state.settings.height + "px",
          position: "absolute",
          left: this.state.settings.isFullscreen
            ? "0"
            : this.state.settings.posX,
          top: this.state.settings.isFullscreen
            ? "-20px"
            : this.state.settings.posY,
          backgroundColor: "blue"
        }}
      >
        <div>
          {this.state.settings.isVisible && (
            <>
              <div
                className="windowHeader"
                onMouseDown={this.OnMouseDown}
                onMouseMove={this.OnMouseMove}
                onMouseUp={this.OnMouseUp}
                onMouseOut={this.OnMouseOut}
              >
                <div className="windowTitle">{this.state.settings.title}</div>

                <button
                  type="button"
                  onClick={() => this.setInvisible()}
                  style={{ position: "absolute", top: "2px", right: "40px" }}
                >
                  <MdMinimize />
                </button>
                <button
                  type="button"
                  onClick={() => this.setFullscreen()}
                  style={{ position: "absolute", top: "2px", right: "20px" }}
                >
                  {this.state.settings.isFullscreen && (
                    <MdOutlineFullscreenExit />
                  )}
                  {!this.state.settings.isFullscreen && <MdOutlineFullscreen />}
                </button>
                <button
                  type="button"
                  onClick={this.closeWindow}
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "0px",
                    backgroundColor: "#ddd"
                  }}
                >
                  <MdClose />
                </button>
              </div>
            </>
          )}
        </div>
        <div className="windowContent">{this.props.window}</div>
      </div>
    );
  }
}

export default Window;
