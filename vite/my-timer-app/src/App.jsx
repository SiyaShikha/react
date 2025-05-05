import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("increment");

      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log("interval stopped");
    };
  }, []);

  return (
    <div>
      <p>Seconds: {seconds}</p>
    </div>
  );
}

const App = () => {
  const [show, setState] = useState(true);

  return (
    <>
      <button onClick={() => setState(false)}>STOP</button>
      {show && <Timer />}
    </>
  );
};

export default App;
