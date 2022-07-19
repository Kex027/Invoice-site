import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCounterValue, incremented, decremented, addValue, reset } from "./CounterSlice";
import { Button, Input, Heading } from "@chakra-ui/react";
import "./counter.scss";

const Counter = () => {
  const counterValue = useSelector(getCounterValue);
  const dispatch = useDispatch();
  const [valueToAdd, setValueToAdd] = useState(0);

  const changeValue = event => {
    setValueToAdd(event.target.value);
  }

  return (
    <div className="container">
      <Heading>Counter: {counterValue}</Heading>
      <Input type="number" onChange={changeValue} />
      <div className="buttons">
      <Button
          onClick={() => {
            dispatch(addValue(valueToAdd));
          }}
        >
          Add {valueToAdd}
        </Button>
        <Button
          onClick={() => {
            dispatch(incremented());
          }}
        >
          +1
        </Button>
        <Button
          onClick={() => {
            dispatch(decremented());
          }}
        >
          -1
        </Button>
        <Button
          onClick={() => {
            dispatch(reset());
          }}
        >
          RESET
        </Button>
      </div>
    </div>
  );
};

export default Counter;

// modal
