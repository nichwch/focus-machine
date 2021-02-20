import { useEffect, useState } from "react";
import styled from "styled-components";
import mech from "./mech.png";
import flare from "./flare.png";

function FocusMachine(props: any) {
  const [goal, setGoal] = useState("");
  const [intervalValue, setIntervalValue] = useState("");
  const [intervalObject, setIntervalObject] = useState(null as any);

  //   // clear interval on unmount
  //   useEffect(() => {
  //     return () => {
  //       clearInterval(intervalObject);
  //     };
  //   }, [intervalObject]);

  const createInterval = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
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

    var newInterval = setInterval(() => {
      new Notification(`${goal}`);
    }, parseInt(intervalValue) * 1000);
    clearInterval(intervalObject);
    setIntervalObject(newInterval);
  };

  const deleteInterval = () => {
    clearInterval(intervalObject);
    setIntervalObject(null);
  };
  return (
    <MachineContainer>
      <MachineHeader>Focus Machine</MachineHeader>
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
      <TargetAcquiredText visible={intervalObject}>
        TARGET ACQUIRED
      </TargetAcquiredText>
      <MechImage src={mech} />
      <FlareImage src={flare} visible={intervalObject} />
    </MachineContainer>
  );
}

const TargetAcquiredText = styled.h3<{ visible: boolean }>`
  color: red;
  text-align: center;
  margin: 20px 0px 0px 0px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const MechImage = styled.img`
  height: 400px;
  width: 400px;
  display: block;
  margin: auto;
`;

const FlareImage = styled.img<{ visible: boolean }>`
  height: 400px;
  width: 400px;
  display: block;
  margin: auto;

  position: relative;
  top: -400px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.1s;
`;

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
  margin: auto;
  padding: 20px;
  width: 400px;
  height: 400px;

  /* box-shadow: 0px 0px 10px 10px #aaaaaa inset, 5px 10px 10px 10px #aaaaaa; */

  @media only screen and (max-width: 400px) {
    margin: 0px;
    width: calc(100% - 40px);
    height: 100%;
  }
`;
export default FocusMachine;
