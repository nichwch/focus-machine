import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mech from "./mech.png";
import flare from "./flare.png";

const SECONDS = "seconds";
const MINUTES = "minutes";

function FocusMachine(props: any) {
  const [goal, setGoal] = useState("");
  const [intervalValue, setIntervalValue] = useState("60");
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

      <InputContainer>
        <Prompt>I want to focus on...</Prompt>
        <TopicInput
          placeholder="my goal"
          onChange={(e) => {
            setGoal(e.target.value);
          }}
          value={goal}
        ></TopicInput>
      </InputContainer>

      <InputContainer>
        <Prompt>Remind me every...</Prompt>
        <IntervalInput
          placeholder="reminder interval"
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
      </InputContainer>

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

const Prompt = styled.p`
  margin: 0px;
`;
const InputContainer = styled.div`
  display: block;
  margin: 7px auto 7px auto;
  width: 208px;
`;

const TargetAcquiredText = styled.p<{ visible: boolean }>`
  color: red;
  font-weight: bold;
  text-align: center;
  margin: 20px 0px 0px 0px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const MechImage = styled.img`
  height: 300px;
  width: 300px;
  display: block;
  margin: auto;
`;

const FlareImage = styled.img<{ visible: boolean }>`
  height: 300px;
  width: 300px;
  display: block;
  margin: auto;

  position: relative;
  top: -300px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.1s;
`;

const MachineHeader = styled.h1`
  text-align: center;
  margin: 10px auto 10px auto;
`;

const TopicInput = styled.input`
  display: block;
  margin: auto;
  width: 200px;
  border: 1px solid black;
`;

const IntervalInput = styled.input`
  width: 100px;
  margin: 2.5px 5px 2.5px auto;
  border: 1px solid black;
`;

const IntervalInputContainer = styled.div`
  display: block;
  margin: auto;
  width: 208px;
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
  height: calc(100vh - 40px);

  /* box-shadow: 0px 0px 10px 10px #aaaaaa inset, 5px 10px 10px 10px #aaaaaa; */

  @media only screen and (max-width: 400px) {
    margin: 0px;
    width: calc(100% - 40px);
  }
`;
export default FocusMachine;
