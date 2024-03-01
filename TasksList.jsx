import React, { useEffect, useState } from "react";
import "./TasksList.css";

function TasksList({ listOfProgrammers, onAddToTasks }) {
  const [tempTasks, setTempTasks] = useState({
    lines: "",
    days: "",
  });
  const [planApproved, setPlanApproved] = useState(false);

  const handleTasks = (event) => {
    const { name, value } = event.target;
    setTempTasks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const totalCodeLines = parseInt(tempTasks.lines);
    const deadlineDays = parseInt(tempTasks.days);

    // Calculate total lines coded per day based on programmers' skills
    const totalLinesCodedPerDay = listOfProgrammers.reduce(
      (total, programmer) => {
        const linesPerDay = programmer.skill === "junior" ? 100 : 200; // Adjust this based on your logic
        return total + linesPerDay;
      },
      0
    );

    const totalCodeNeeded =
      totalCodeLines / (totalLinesCodedPerDay * deadlineDays) <= 1;

    setPlanApproved(totalCodeNeeded);
  }, [tempTasks, listOfProgrammers]);

  const handleClick = () => {
    const TasksToSend = {
      lines: tempTasks.lines === "" ? 0 : parseInt(tempTasks.lines),
      days: tempTasks.days === "" ? 0 : parseInt(tempTasks.days),
    };
    onAddToTasks(TasksToSend);
    setTempTasks({
      lines: "",
      days: "",
    });
  };

  return (
    <div className="tasks-form">
      <input
        type="number"
        min="0"
        placeholder="řádků kódu"
        name="lines"
        value={tempTasks.lines}
        onChange={handleTasks}
        className="firstOne"
      />
      <input
        type="number"
        min="0"
        placeholder="Počet dnů na vývoj"
        name="days"
        value={tempTasks.days}
        onChange={handleTasks}
        className="secondInp"
      />
      <button
        onClick={handleClick}
        style={{ backgroundColor: planApproved ? "green" : "red" }}
      >
        {planApproved ? "Plán schválen" : "Nesplněné podmínky"}
      </button>
    </div>
  );
}

export default TasksList;
