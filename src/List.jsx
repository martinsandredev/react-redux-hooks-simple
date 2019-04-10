import React from "react";
import { actionRemove, actionComplete, actionIncomplete } from "./reducer";
import connect from "./connect";

const List = ({ list, remove, complete, incomplete }) => {
  return (
    <ul className="list">
      {list.map(item => (
        <li className="list__item" key={item.id}>
          <div className="list__label">
            {(item.checked && <strike>{item.text}</strike>) || item.text}
          </div>
          <div className="list__actions">
            <button className="button" onClick={() => remove(item.id)}>
              Remover
            </button>
            <button className="button" onClick={() => complete(item.id)}>
              Completo
            </button>
            <button className="button" onClick={() => incomplete(item.id)}>
              Incompleto
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  list: state.list
});
const mapActionsToProps = {
  remove: actionRemove,
  complete: actionComplete,
  incomplete: actionIncomplete
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(List);
