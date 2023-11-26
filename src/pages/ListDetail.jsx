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

// react router
import { useParams } from "react-router-dom";

// state managment
import { useAtom } from "jotai";
import { ListsAtom } from "../../state-managment";

function ListDetail() {
  const { id } = useParams();

  const [lists, setLists] = useAtom(ListsAtom);
  const [inextino, setInextino] = useState(lists.findIndex((element) => element.id === id));
  const [IsShowChecked, setIsShowChecked] = useState(false);     
  
  //task methods
  function CreateNewTask() {

    let helper = lists;
    helper[inextino].tasks = [
      {
        taskText: "",
        isDone: false,
        id: Math.random().toString(36).substring(2),
      },
      ... helper[inextino].tasks,
    ]
    setLists([...helper])
  }

  function DeleteTask(id) { 
    let helper = lists;
    const RemoveOnIndex = helper[inextino].tasks.findIndex((element) => element.id === id);

    helper[inextino].tasks = [
      ... helper[inextino].tasks.slice(0, RemoveOnIndex),
      ... helper[inextino].tasks.slice(RemoveOnIndex + 1),
    ]
    console.log(helper[inextino].tasks,RemoveOnIndex);
    setLists([...helper])
  }

  function ChangeTask(id, value) {
    let helper = lists;
    const Index = helper[inextino].tasks.findIndex((element) => element.id === id);
    helper[inextino].tasks[Index] = { ...helper[inextino].tasks[Index], ...value };
    setLists([...helper])
  }

  function Updatesettings(data){
    let helper = lists;
    helper[inextino] = {
      ... helper[inextino],
      ... data
    }
    setLists([...helper])
  }

  function UpdatePeople(data){
    let helper = lists;
    helper[inextino].sharedUsers = [
      ... data
    ]
    console.log(helper[inextino].sharedUsers)
    setLists([...helper])
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
          src={lists[inextino].imageLink}
          alt="Cropped Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-row justify-between">
        <p className="font-bold text-3xl">{lists[inextino].listName}</p>
        <SettingsModal
          inputSettings={lists[inextino]}
          ReflectChanges={Updatesettings}
          AcceptButtonText={"Save Changes"}
          Text={"Settings"}
        />
      </div>

      <p> {lists[inextino].description}</p>

      <div className="flex justify-between">
        <AvatarGroup
          max={5}
          total={lists[inextino].sharedUsers.length}
          renderCount={(count) => (
            <p className="text-small text-foreground font-medium ml-2">
              +{count} others
            </p>
          )}
        >
          {lists[inextino].sharedUsers.slice(0, 4).map((element) => (
            <Avatar src={element.avatar} />
          ))}
          <Button color="default" isIconOnly radius="full">
            <UserSettingsModal
              people={lists[inextino].sharedUsers}
              setPeople={UpdatePeople}
            ></UserSettingsModal>
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
        {lists[inextino].tasks.map((task) => (
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
