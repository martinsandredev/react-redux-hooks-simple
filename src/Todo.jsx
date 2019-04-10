import React, { useState } from "react";
import connect from "./connect";
import List from "./List";
import Form from "./Form";

export default () => {
  return (
    <div className="todo">
      <List />
      <Form />
    </div>
  );
};
