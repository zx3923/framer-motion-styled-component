import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  goalState,
  isRunningState,
  minutesState,
  roundState,
  secondsState,
} from "./atoms";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #e34336;
`;

const Clock = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 600px;
`;

const Minute = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 400px;
  width: 250px;
  background-color: white;
  border-radius: 15px;
  font-size: 100px;
  color: #e34336;
`;

const Second = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 400px;
  width: 250px;
  background-color: white;
  border-radius: 15px;
  font-size: 100px;
  color: #e34336;
`;

const Colon = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  justify-content: space-between;
`;

const Circle = styled.div`
  background-color: white;
  height: 16px;
  width: 16px;
  border-radius: 8px;
`;

const Btn = styled(motion.div)`
  background-color: #b0362b;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Svg = styled.svg`
  height: 80px;
  width: 80px;
  color: white;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  div {
    font-size: 25px;
  }
  div:first-child {
    color: #ffbeb5;
    margin-bottom: 10px;
  }
`;

export default function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [seconds, setSeconds] = useRecoilState(secondsState);
  const [goal, setGoal] = useRecoilState(goalState);
  const [round, setRound] = useRecoilState(roundState);
  const [isRunning, setIsRunning] = useRecoilState(isRunningState);
  const minuteControls = useAnimation();
  const secondControls = useAnimation();

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          clearInterval(interval);
          setMinutes(25);
          setSeconds(0);
          setRound((prev) => prev + 1);
          setIsRunning(false);
        } else if (seconds === 0 && minutes > 0) {
          setSeconds(59);
          setMinutes((prev) => prev - 1);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, setMinutes, setSeconds]);

  useEffect(() => {
    minuteControls.start({
      scale: [0.5, 1],
      opacity: [0.5, 1],
      transition: { duration: 0.3 },
    });
  }, [minutes, minuteControls]);

  useEffect(() => {
    secondControls.start({
      scale: [0.5, 1],
      opacity: [0.5, 1],
      transition: { duration: 0.3 },
    });
  }, [seconds, secondControls]);

  useEffect(() => {
    if (round === 4) {
      setGoal((prev) => prev + 1);
      setRound(0);
    }
  }, [round, setRound]);

  useEffect(() => {
    if (goal === 12) {
      setGoal(0);
      setRound(0);
    }
  }, [goal, setGoal]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <Wrapper>
      <Clock>
        <Minute animate={minuteControls}>
          {minutes.toString().padStart(2, "0")}
        </Minute>
        <Colon>
          <Circle />
          <Circle />
        </Colon>
        <Second animate={secondControls}>
          {seconds.toString().padStart(2, "0")}
        </Second>
      </Clock>
      <Btn
        onClick={handleStartStop}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.7 }}
      >
        {isRunning ? (
          <Svg
            dataSlot="icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
          </Svg>
        ) : (
          <Svg
            dataSlot="icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
          </Svg>
        )}
      </Btn>
      <Box>
        <Board>
          <div>{round}/4</div>
          <div>ROUND</div>
        </Board>
        <Board>
          <div>{goal}/12</div>
          <div>GOAL</div>
        </Board>
      </Box>
    </Wrapper>
  );
}
