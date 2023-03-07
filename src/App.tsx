import "./styles.css";
import Taskbar from "./Taskbar";
import Window from "./Window";
import FileExplorer from "./FileExplorer";
import React, { useState } from "react";

interface window {
  id: number;
  title: string;
  isFullscreen: boolean;
  isVisible: boolean;
  width: number;
  height: number;
  posX: number;
  posY: number;
}

export default function App() {
  const windowArray: window[] = [];
  const [currentWindow, setCurrentWindow] = useState("hi");
  const [windows, setWindows] = useState(windowArray);

  const handleAddWindow = (windowTitle: string) => {
    if (windowTitle === "File Explorer") {
      console.log("Opening file explorer");
    }
    setWindows((prevWindows) => [
      ...prevWindows,
      {
        id: windows.length,
        title: windowTitle,
        isFullscreen: false,
        isVisible: true,
        width: 200,
        height: 200,
        posX: 200,
        posY: 200,
        windowComponent:
          windowTitle === "File Explorer" ? <FileExplorer /> : <FileExplorer />
      }
    ]);
  };

  const handleUpdateWindow = (
    windowID: number,
    isFullscreen: boolean,
    isVisible: boolean,
    width: number,
    height: number,
    posX: number,
    posY: number
  ) => {
    /*
    console.log("In handleUpdateWindow() - " + windowID);
    var windowArray = windows;
    windowArray.map((window, index) => {
      if (window.id === windowID) {
        window.isFullscreen = isFullscreen;
        window.isVisible = isVisible;
        window.width = width;
        window.height = height;
        window.posX = posX;
        window.posY = posY;
      }
    });*/
  };

  const handleCloseWindow = (closeWindow: number) => {
    console.log("Close Window: " + closeWindow);
    windows.map((window) => {
      if (window.id === closeWindow) {
        console.log("window ID: " + window.id);
        setWindows(windows.filter((windowFilter) => windowFilter !== window));
      } else {
        console.log("window not found");
      }
      console.log(window.width.toLocaleString());
    });
  };

  const countWindow = (closeWindow: number) => {
    windows.map((window) => {
      console.log(
        "Window title: " + window.title + " - Window ID: " + window.id
      );
    });
  };

  return (
    <div className="App">
      <div className="taskbarContainer">
        <Taskbar openWindow={handleAddWindow} />
        {windows.map((window) => (
          <Window
            id={window.id}
            title={window.title}
            isFullscreen={window.isFullscreen}
            isVisible={window.isVisible}
            width={window.width}
            height={window.height}
            posX={window.posX}
            posY={window.posY}
            closeWindow={handleCloseWindow}
            updateWindow={handleUpdateWindow}
            window={<FileExplorer />}
          />
        ))}
      </div>
    </div>
  );
}
