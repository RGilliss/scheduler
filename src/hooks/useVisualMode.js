import { useState } from "react";

export default function useVisualMode(init) {
  const [history, setHistory] = useState([init]);
  const transition = function (newMode, replace = false) {
    if (!replace) {
      const newHistory = [...history];
      newHistory.push(newMode);
      setHistory(newHistory);
    }
    if (replace) {
      setHistory(prev => {
        const newHistory = [...prev];
        const start = newHistory.length -1;
        newHistory.splice(start, 1, newMode);   
        return newHistory;
      })

    }

  };
  const back = function () {
    if (history.length < 2) {
      return;
    }
    
    setHistory(prev => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    })
  };
  const mode = history.slice(-1)[0];
  return { mode, transition, back };
}