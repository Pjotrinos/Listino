import React from "react";
import { useState } from "react";
import ListOfTasks from "../components/ListOfTasks";

import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import Icon from "@mdi/react";
// import { mdiCog } from "@mdi/js";
// import { mdiEarth } from "@mdi/js";
// import { mdiEarthOff } from "@mdi/js";
// import { mdiAccountCog } from "@mdi/js";
import { mdiCircleOutline } from "@mdi/js";
import { mdiCheckCircle } from "@mdi/js";
import SettingsModal from "../components/SettingsModal";
import UserSettingsModal from "../components/UserSettingsModal";

function ListDetail() {
  const [tasks, setTasks] = useState([
    {taskText: 'Mléko', isDone: false, id: "1"},
    {taskText: 'Dort', isDone: false, id: "2"},
    {taskText: 'Štafle', isDone: true, id: "3"},
    {taskText: 'Provaz', isDone: false, id: "4"},
    {taskText: 'Konfety', isDone: false, id: "5"},
    {taskText: 'Plyšák', isDone: true, id: "6"}
  ]);

  const [taskListInfos, setTaskListInfos] = useState({
    listName: "Nákupní seznam pro oslavu",
    description: "seznam věcích potřebných na oslavu",
    imageLink:
      "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?auto=format&fit=crop&q=80&w=3537&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shareStatust: false,
  });

  let MockupPeople = [
    {
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      name: "Janus Veliky",
    },
    {
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      name: "Venuše Zákaznicá",
    },
    {
      avatar: "https://i.pravatar.cc/150?u=a04258b2462d826712e",
      name: "Lukáš Novák",
    },
    {
      avatar: "https://i.pravatar.cc/150?u=a04258c2462d826712f",
      name: "Eva Pospíšilová",
    },
    {
      avatar: "https://i.pravatar.cc/150?u=a04258d2462d826712g",
      name: "Martin Novotný",
    },
    {
      avatar: "https://i.pravatar.cc/150?u=a04258e2462d826712h",
      name: "Anna Kovářová",
    }
  ];
  const [people, setPeople] = useState(MockupPeople);

  const [IsShowChecked, setIsShowChecked] = useState(false);

  //task methods
  function CreateNewTask() {
    setTasks([
      {
        taskText: "",
        isDone: false,
        id: Math.random().toString(36).substring(2),
      },
      ...tasks,
    ]);
  }

  function DeleteTask(id) {
    const RemoveOnIndex = tasks.findIndex((element) => element.id === id);
    setTasks([
      ...tasks.slice(0, RemoveOnIndex),
      ...tasks.slice(RemoveOnIndex + 1),
    ]);
  }

  function ChangeTask(id, value) {
    const Index = tasks.findIndex((element) => element.id === id);
    tasks[Index] = { ...tasks[Index], ...value };
    setTasks([...tasks]);
  }

  return (
    <div class="flex flex-col gap-4 mx-20 ">
      <div class="flex justify-end"></div>

      <div
        className="h-56 relative overflow-hidden"
        style={{ borderRadius: "var(--nextui-radius-large)" }}
      >
        <Image
          // removeWrapper={true}
          src={taskListInfos.imageLink}
          alt="Cropped Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-row justify-between">
      <p className="font-bold text-3xl">{taskListInfos.listName}</p>
      <SettingsModal
        inputSettings={taskListInfos}
        ReflectChanges={setTaskListInfos}
      />
      </div>

      <p> {taskListInfos.description}</p>

      <div className="flex justify-between">
        <AvatarGroup
          max={5}
          total={people.length}
          renderCount={(count) => (
            <p className="text-small text-foreground font-medium ml-2">
              +{count} others
            </p>
          )}
        >
            {people.slice(0, 4).map(element => <Avatar src={element.avatar} />)}
          <Button color="default" isIconOnly radius="full">
            <UserSettingsModal people={people} setPeople={setPeople}></UserSettingsModal>
          </Button>
        </AvatarGroup>

        <div className="flex flex-row gap-x-2.5">
          <Button
            color={"default"}
            variant={IsShowChecked ? "solid" : "light"}
            onClick={() => setIsShowChecked((prev) => !prev)}
          >
            {" "}
            {IsShowChecked ? (
              <Icon path={mdiCheckCircle} size={1} />
            ) : (
              <Icon path={mdiCircleOutline} size={1} />
            )}{" "}
            Show checked tasks
          </Button>

          <Button color="primary" onClick={CreateNewTask}>
            Add task
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-y-2.5">
        {tasks.map((task) => (
          <ListOfTasks
            data={task}
            showChecked={IsShowChecked}
            key={task.id}
            DeleteTask={DeleteTask}
            ChangeTask={ChangeTask}
          />
        ))}
      </div>
    </div>
  );
}

export default ListDetail;
