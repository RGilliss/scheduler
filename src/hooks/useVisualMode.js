import { useState } from "react";


export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = function (newMode, replace = false) {
    if(!replace) {
      setHistory(prev => ([...prev, newMode]))
    }  
    setMode(newMode);
  };
  const back = function () {
    if (history.length < 2) {
      return;
    }
    setHistory(history.slice(0, history.length - 1));
    setMode(history[history.length -2]);
  }

  return { mode, transition, back };
}