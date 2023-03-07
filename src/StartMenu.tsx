import React from "react";
import { MdPowerSettingsNew } from "react-icons/md";
import { MdOutlineFolderOpen } from "react-icons/md";
import { MdPersonOutline } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdViewHeadline } from "react-icons/md";

interface recentlyUsedList {
  id: number;
  windowName: string;
  openWindow: (windowId: number) => void;
}

class StartMenu extends React.Component<
  { list: recentlyUsedList; openWindow: (windowTitle: string) => void },
  {}
> {
  render() {
    return (
      <div className="startMenu">
        <div className="startMenuControls">
          <div className="menuSettings startMenuControl">
            <MdViewHeadline />
          </div>
          <div
            className="profile startMenuControl"
            onClick={(windowTitle) => this.props.openWindow("Profile")}
          >
            <MdPersonOutline />
          </div>
          <div
            className="fileExplorer startMenuControl"
            onClick={(windowTitle) => this.props.openWindow("File Explorer")}
          >
            <MdOutlineFolderOpen />
          </div>
          <div
            className="settings startMenuControl"
            onClick={(windowTitle) => this.props.openWindow("settings")}
          >
            <MdOutlineSettings />
          </div>
          <div className="power startMenuControl">
            <MdPowerSettingsNew />
            <div className="powerSettings">
              Restart
              <br />
              Power Off
            </div>
          </div>
        </div>
        <div className="startMenuApplications">
          <div className="recentlyUsed">
            <span>Recently used</span>
            <div onClick={() => this.props.list.openWindow}>
              {this.props.list.windowName}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartMenu;
