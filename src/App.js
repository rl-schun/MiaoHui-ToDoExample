import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import ToDoGroup from "./components/ToDoGroup/ToDoGroup";
import { readGroups } from "./service/firestore";

function App() {
  const [todosGroup, setTodosGroup] = useState([]);

  useEffect(() => {
    (async () => {
      console.log(1);
      setTodosGroup(await readGroups());
      console.log(2);
    })();
  }, []);

  return (
    <div className="App">
      <Card>
        {todosGroup &&
          todosGroup.map((object) => {
            return (
              <ToDoGroup
                id={object.id}
                key={object.id}
                title={object.title}
                toDoItems={object.items}
              />
            );
          })}
      </Card>
    </div>
  );
}

export default App;
