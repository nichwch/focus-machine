import { useEffect, useState } from "react";
import styled from "styled-components";

function FocusMachine(props: any) {
  const [goal, setGoal] = useState("");
  const [intervalValue, setIntervalValue] = useState("");
  const [intervalObject, setIntervalObject] = useState(null as any);

  // clear interval on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalObject);
    };
  }, [intervalObject]);

  const createInterval = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification.");
    } else if (Notification.permission !== "granted") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
        } else {
          return;
        }
      });
    }

    new Notification(
      `goal set: ${goal}; will ping you every ${intervalValue} seconds`,
      {
        body: "body test\nbody test",
      }
    );
    // clearInterval(intervalObject);
    var newInterval = setInterval(() => {
      new Notification(`${goal}`);
    }, parseInt(intervalValue) * 1000);
    setIntervalObject(newInterval);
  };

  const deleteInterval = () => {
    setIntervalObject(null);
  };
  return (
    <MachineContainer>
      <MachineHeader>Focus Machine</MachineHeader>
      {intervalObject ? "activate" : "not active"}
      <MachineInput
        placeholder="What do you want to work on?"
        onChange={(e) => {
          setGoal(e.target.value);
        }}
        value={goal}
      ></MachineInput>
      <MachineInput
        placeholder="Remind me every x seconds"
        onChange={(e) => {
          setIntervalValue(e.target.value);
        }}
        value={intervalValue}
      ></MachineInput>
      {intervalObject ? (
        <MachineButton onClick={deleteInterval}>Stop</MachineButton>
      ) : (
        <MachineButton onClick={createInterval}>Start</MachineButton>
      )}
    </MachineContainer>
  );
}

const MachineHeader = styled.h1`
  text-align: center;
`;

const MachineInput = styled.input`
  display: block;
  margin: auto;
  width: 200px;
`;

const MachineButton = styled.button`
  width: 100px;
  margin: auto;
  display: block;
`;

const MachineContainer = styled.div`
  margin: 10vh auto 10vh auto;
  padding: 20px;
  width: 300px;
  height: 300px;

  border: 2px solid black;
  border-radius: 30px;
  /* box-shadow: 0px 0px 10px 10px #aaaaaa inset, 5px 10px 10px 10px #aaaaaa; */
  box-shadow: 0px 0px 10px 7.5px #e4e4e4;

  @media only screen and (max-width: 600px) {
    margin: 0px;
    width: calc(100% - 40px);
    height: 100%;
    border: none;
    box-shadow: none;
  }
`;
export default FocusMachine;
