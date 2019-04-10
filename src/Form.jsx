import React, { useState } from "react";
import { actionAdd } from "./reducer";
import connect from "./connect";

const Form = ({ add }) => {
  const [text, setText] = useState("");
  const handleAdd = text => {
    if (text) {
      add(text);
      setText("");
    }
  };
  return (
    <div className="form">
      <input
        className="input"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="button" onClick={() => handleAdd(text)}>
        Adicionar
      </button>
    </div>
  );
};

const mapActionsToProps = {
  add: actionAdd
};

export default connect(
  state => state,
  mapActionsToProps
)(Form);
