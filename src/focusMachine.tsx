import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mech from "./mech.png";
import flare from "./flare.png";

const SECONDS = "seconds";
const MINUTES = "minutes";

function FocusMachine(props: any) {
  const [goal, setGoal] = useState("");
  const [intervalValue, setIntervalValue] = useState("");
  const [intervalUnit, setIntervalUnit] = useState(SECONDS);
  const [intervalObject, setIntervalObject] = useState(null as any);

  const createInterval = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
    } else if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      // If the user accepts, let's create a notification
      if (permission === "granted") {
      } else {
        return;
      }
    }

    let intervalLength = parseFloat(intervalValue);
    if (Number.isNaN(intervalLength)) {
      alert("Please enter a valid number greater than 0");
      return;
    }
    intervalLength =
      intervalLength * 1000 * (intervalUnit === MINUTES ? 60 : 1);

    if (intervalLength < 1000) {
      alert("Please enter an interval longer than 1 second");
      return;
    }
    new Notification(
      `goal set: ${goal}; will ping you every ${parseFloat(
        intervalValue
      )} ${intervalUnit}`
    );

    var newInterval = setInterval(() => {
      new Notification(`${goal}`);
    }, intervalLength);
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
      <TopicInput
        placeholder="What do you want to work on?"
        onChange={(e) => {
          setGoal(e.target.value);
        }}
        value={goal}
      ></TopicInput>
      <IntervalInputContainer>
        <IntervalInput
          placeholder="Remind me every x seconds"
          onChange={(e) => {
            setIntervalValue(e.target.value?.trim());
          }}
          value={intervalValue}
        ></IntervalInput>
        <select
          value={intervalUnit}
          onChange={(e) => {
            setIntervalUnit(e.target.value);
          }}
        >
          <option value={SECONDS}>
            {parseInt(intervalValue) == 1 ? "second" : "seconds"}
          </option>
          <option value={MINUTES}>
            {parseInt(intervalValue) == 1 ? "minute" : "minutes"}
          </option>
        </select>
      </IntervalInputContainer>

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

const TopicInput = styled.input`
  display: block;
  margin: auto;
  width: 200px;
`;

const IntervalInputContainer = styled.div`
  display: block;
  margin: auto;
  width: 208px;
`;

const IntervalInput = styled.input`
  width: 100px;
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
