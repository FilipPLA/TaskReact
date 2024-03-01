import React from "react";
import "./ProgrammerForm.css";

function ProgrammerForm({ data, onChange, validation, onAdd }) {
  return (
    <div className="programmer-form">
      <input
        type="text"
        placeholder="jméno programátora"
        name="name"
        value={data.name}
        onChange={onChange}
      />

      <div>
        <label>
          <input
            type="radio"
            value="Junior"
            checked={data.skill === "Junior"}
            onChange={onChange}
            name="skill"
          />
          Junior
        </label>
        <label>
          <input
            type="radio"
            value="Senior"
            checked={data.skill === "Senior"}
            onChange={onChange}
            name="skill"
          />
          Senior
        </label>
      </div>
      <button disabled={!validation} onClick={onAdd}>
        Přidat
      </button>
    </div>
  );
}

export default ProgrammerForm;
