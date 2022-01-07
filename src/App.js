import "./App.css";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

function App() {
  const [preState, setPreState] = useState("");
  const [currState, setCurrState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const allClear = () => {
    setPreState("");
    setCurrState("");
    setInput("0");
  };

  const plusMinus = () => {
    if (currState.charAt(0) === "-") {
      setCurrState(currState.substring(1));
    } else {
      setCurrState("-" + currState);
    }
  };

  const percentage = () => {
    preState
      ? setCurrState(String((parseFloat(currState) / 100) * preState))
      : setCurrState(String(parseFloat(currState) / 100));
  };

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (currState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(currState);
      setCurrState("");
    }
  };

  const inputNum = (e) => {
    if (currState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }
    currState
      ? setCurrState((prev) => prev + e.target.innerText)
      : setCurrState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(currState);
  }, [currState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const equals = (e) => {
    if (e.target.innerText === "=") {
      setTotal(true);
    }

    let totalNum;
    switch (operator) {
      case "÷":
        totalNum = String(parseFloat(preState) / parseFloat(currState));
        break;
      case "X":
        totalNum = String(parseFloat(preState) * parseFloat(currState));
        break;
      case "-":
        totalNum = String(parseFloat(preState) - parseFloat(currState));
        break;
      case "+":
        totalNum = String(parseFloat(preState) + parseFloat(currState));
        break;
      default:
        return;
    }
    setPreState(totalNum);
    setCurrState("");
    setInput("");
  };
  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {input !== "" || input === "0" ? (
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="btn-gray" onClick={allClear}>
          AC
        </div>
        <div className="btn-gray" onClick={plusMinus}>
          +/-
        </div>
        <div className="btn-gray" onClick={percentage}>
          %
        </div>
        <div className="btn-orange" onClick={operatorType}>
          ÷
        </div>
        <div className="btn-num" onClick={inputNum}>
          7
        </div>
        <div className="btn-num" onClick={inputNum}>
          8
        </div>
        <div className="btn-num" onClick={inputNum}>
          9
        </div>
        <div className="btn-orange" onClick={operatorType}>
          X
        </div>
        <div className="btn-num" onClick={inputNum}>
          4
        </div>
        <div className="btn-num" onClick={inputNum}>
          5
        </div>
        <div className="btn-num" onClick={inputNum}>
          6
        </div>
        <div className="btn-orange" onClick={operatorType}>
          -
        </div>
        <div className="btn-num" onClick={inputNum}>
          1
        </div>
        <div className="btn-num" onClick={inputNum}>
          2
        </div>
        <div className="btn-num" onClick={inputNum}>
          3
        </div>
        <div className="btn-orange" onClick={operatorType}>
          +
        </div>
        <div className="btn-num zero" onClick={inputNum}>
          0
        </div>
        <div className="btn-num" onClick={inputNum}>
          .
        </div>
        <div className="btn-orange" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
