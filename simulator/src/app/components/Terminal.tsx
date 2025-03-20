"use client";
import React from "react";
import Terminal from "terminal-in-react";
import { ReactTerminal } from "react-terminal";
type Props = {};

const Xterm = (props: Props) => {
  const defaultHandler = () => {

    };
  const commands = {
    whoami: "jackharper",
    cd: (directory: string) => `changed path to ${directory}`,
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "40vh",
      }}
    >
      <ReactTerminal
        prompt="zkplatoon"
        style={{ width: "100%" }}
        themes={{
          "my-custom-theme": {
            themeBGColor: "#272B36",
            themeToolbarColor: "#DBDBDB",
            themeColor: "#FFFEFC",
            themePromptColor: "#a917a8",
          },
        }}
        showControlBar={false}
        theme="my-custom-theme"
        commands={commands}
        defaultHandler={defaultHandler}
      />
    </div>
  );
};

export default Xterm;
