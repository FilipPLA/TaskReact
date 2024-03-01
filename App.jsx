import { useEffect, useState } from "react";
import rawData from "./programersData.json";
import PageContainer from "./components/PageContainer/PageContainer";
import ProgrammerList from "./components/ProgrammerList/ProgrammerList";
import ProgrammerForm from "./components/ProgrammerForm/ProgrammerForm";
import Toggler from "./components/Toggler/Toggler";
import TasksList from "./components/TasksList/TasksList";

function App() {
  const [listOfProgrammers, setListOfProgrammers] = useState(
    rawData.programmers
  );
  const [newProgrammer, setNewProgrammer] = useState({
    id:
      listOfProgrammers.length > 0
        ? Math.max(...listOfProgrammers.map((programmer) => programmer.id)) + 1
        : 1,
    name: "",
    skill: "",
  });

  const [valid, setValid] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  const [taskList, setTaskList] = useState({
    lines: 0,
    days: 0,
  });

  const validateData = (programmer) => {
    if (programmer.skill === "" || programmer.name.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleChange = (event) => {
    const updatedProgrammer = {
      ...newProgrammer,
      [event.target.name]: event.target.value,
    };
    validateData(updatedProgrammer);
    setNewProgrammer(updatedProgrammer);
  };

  const handleAdd = () => {
    setListOfProgrammers((listOfProgrammers) => {
      return [...listOfProgrammers, newProgrammer];
    });

    const newProgrammerId = newProgrammer.id + 1;
    const updatedProgrammer = {
      id: newProgrammerId,
      lines: "",
      days: "",
    };

    setNewProgrammer(updatedProgrammer);
  };

  const handleDelete = (idToDelete) => {
    setListOfProgrammers(
      listOfProgrammers.filter((programmer) => programmer.id !== idToDelete)
    );
  };

  const handleChoose = (source) => {
    switch (source) {
      case "list-of-programmers": {
        setActiveTab(1);
        break;
      }
      case "tasks-list": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };

  const handleAddToTasks = (temp) => {
    const temporaryTasks = {
      lines: taskList.lines + temp.lines,
      days: taskList.days + temp.days,
    };
    setTaskList(temporaryTasks);
  };

  return (
    <div className="App">
      <PageContainer>
        <Toggler active={activeTab} onChoose={handleChoose} />
        {activeTab === 1 && (
          <>
            <ProgrammerList data={listOfProgrammers} onDelete={handleDelete} />
            <ProgrammerForm
              data={newProgrammer}
              validation={valid}
              onChange={handleChange}
              onAdd={handleAdd}
            />
          </>
        )}
        {activeTab === 2 && (
          <>
            <TasksList
              listOfProgrammers={listOfProgrammers}
              onAddToTasks={handleAddToTasks}
            />
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default App;
