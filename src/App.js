//TODO: STEP 1 - Import the useState hook.
import React, { useState, useRef, useEffect } from 'react';
import "./App.css";
import BottomRow from "./BottomRow";





function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.

  const [homeScore, setHomeScore] = React.useState(0);
  const [awayScore, setAwayScore] = React.useState(0);

  

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
        <ScoreBoardHome dataFromParent={homeScore}/>
        <Timer />
        <ScoreBoardAway dataFromParent={awayScore} /> 
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <HomeTouchdown dataFromParent={homeScore} callbackFromParent={setHomeScore(0)} />
          <HomeFieldGoal dataFromParent={homeScore} callbackFromParent={setHomeScore(0)} />         
        </div>
        <div className="awayButtons">
          <AwayTouchdown dataFromParent={awayScore} callbackFromParent={setAwayScore(0)}/>
          <AwayFieldGoal dataFromParent={awayScore} callbackFromParent={setAwayScore(0)}/>   
         
        </div>
      </section>
    </div>
  );
}

function ScoreBoardHome(props) {

  return(
    <div className="home">
      <h2 className="home__name">Lions</h2>

      {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

      <div className="home__score">{props.dataFromParent}</div>
  </div>
  );
}

function ScoreBoardAway(props) {

return (
  <div className="away">
    <h2 className="away__name">Tigers</h2>
    <div className="away__score">{props.dataFromParent}</div>
  </div>

);
}

function Timer () {

  let [count, setCount] = useState(0);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, 1000);

  function transformToSeconds(count) {
    if (count % 60 < 10)
    return ("0" + (count % 60).toString());
    else
    return count % 60;
  }

  function transformToMinutes(count) {
    return parseInt(count / 60);
  }

return(
<div className="timer">{transformToMinutes(count) + ":" + transformToSeconds(count)}</div>
);
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


function HomeTouchdown (props){

   return (<button className="homeButtons__touchdown" onClick={() =>{
    props.callbackFromParent(props.dataFromParent + 7)
  }}>Home Touchdown</button>);
}

function HomeFieldGoal (props){
  
  return( <button className="homeButtons__fieldGoal" onClick={() =>{
    props.callbackFromParent(props.dataFromParent + 3);
  }}>Home Field Goal</button>);
}

function AwayTouchdown (props){
  
  return(<button className="awayButtons__touchdown" onClick={() =>{
    props.callbackFromParent(props.dataFromParent + 7);
  }}>Away Touchdown</button>);
}

function AwayFieldGoal (props){
  
  return (<button className="awayButtons__fieldGoal" onClick={() =>{
    props.callbackFromParent(props.dataFromParent + 3);
  }}>Away Field Goal</button>);
}

export default App;
