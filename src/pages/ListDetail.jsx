import React from "react";
import { useState, useEffect } from "react";
import ListOfTasks from "../components/ListOfTasks";
import ListChar from "../components/ListChar";


import { Button, Tooltip } from "@nextui-org/react";
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

import 'ldrs/ring'

import { leangueBookAtom, langueSelectAtom }  from '../../state-managment';

// react router
import { useParams } from "react-router-dom";

// state managment
import { useAtom } from "jotai";
import { ListsAtom } from "../../state-managment";
import { useWindowSize } from "@uidotdev/usehooks";
import { mdiPlusBox } from '@mdi/js';

function ListDetail() {
  const { id } = useParams();

  const [listId, setlistId] = useState(id);

  const [lists, setLists] = useAtom(ListsAtom);
  
  const [IsShowChecked, setIsShowChecked] = useState(false);
  
  
  const [fetchList, setfetchList] = useState({});
  const [fetchState,setFetchState] = useState("pending");

  
  useEffect(()=>{
    fetch("/api/list/"+id)
      .then(res => res.json())
      .then(json =>{ 
        setfetchList(json.listino)
        setFetchState("sucess")
      })
      .catch(e =>{ 
        console.error(e.message)
        setFetchState("error")
      })
  },[])
  
  //task methods
  async function CreateNewTask() {
    console.log("heloo");
    let helper = fetchList
    helper.tasks = [
      {
        taskText: "",
        isDone: false,
        id: Math.random().toString(36).substring(2),
      },
      ... fetchList.tasks,
    ]

    const response = await fetch("/api/list/"+id+"/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helper),
    });


    setfetchList({...helper})
  }

  async function DeleteTask(id) { 
    let helper = fetchList;
    const RemoveOnIndex = helper.tasks.findIndex((element) => element.id === id);

    helper.tasks = [
      ... helper.tasks.slice(0, RemoveOnIndex),
      ... helper.tasks.slice(RemoveOnIndex + 1),
    ]

    const response = await fetch("/api/list/"+listId+"/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helper),
    });

    setfetchList({...helper})
  }

  async function ChangeTask(id, value) {
    let helper = fetchList;
    const Index = helper.tasks.findIndex((element) => element.id === id);
    helper.tasks[Index] = { ...helper.tasks[Index], ...value };

    const response = await fetch("/api/list/"+listId+"/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helper),
    });

    setLists({...helper})
  }

  async function Updatesettings(data){
    let helper = lists;
    helper[inextino] = {
      ... helper[inextino],
      ... data
    }

    const NewList = {
        ... helper[inextino],
        ... data
      }
    

    const response = await fetch("/api/list/"+id+"/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewList),
    });


    setLists([...helper])
  }

  async function UpdatePeople(data){
    let helper = fetchList;
    helper.sharedUsers = [
      ... data
    ]
    const response = await fetch("/api/list/"+listId+"/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helper),
    });

    setLists({...helper})
  }

  const size = useWindowSize();
  
  function setSizePrefix(sizeNow){
    if(sizeNow<=640){
      return "sm"
    }
    else if(sizeNow<=768){
      return "md"
    }
    else if(sizeNow<=1024){
      return "lg"
    }
  }

  const sizePrefix = setSizePrefix(size.width)

  const [leangueBook] = useAtom(leangueBookAtom)
  const [langueSelect] = useAtom(langueSelectAtom)


  return (
    <div className="flex flex-col gap-4 sm:mx-8 md:mx-10 lg:mx-20 ">
    { fetchState === "pending" ? <div className="flex flex-row justify-center"> <l-ring className="absolute inset-0" size="60" /> </div> :   
      <><div
        className="max-h-20 sm:max-h-20 md:max-h-40 lg:max-h-30 relative overflow-hidden"
        style={{ borderRadius: "var(--nextui-radius-large)" }}
      > 
        <Image
          // removeWrapper={true}
          src={fetchList.imageLink}
          alt="Cropped Image"
          layout="fill"
        />
      </div>

      <div className="flex flex-row justify-between">
        <p className="font-bold sm:text-2xl md:text-2xl lg:text-3xl">{fetchList.listName}</p>
        <SettingsModal
          inputSettings={fetchList}
          ReflectChanges={Updatesettings}
          AcceptButtonText={leangueBook[langueSelect].text_setting_acceptButton}
          Text={sizePrefix=="sm"? null : leangueBook[langueSelect].text_setting_list}
          isIconOnly= {sizePrefix=="sm"? true : false}
        />
        
      </div>  

      <p> {fetchList.description}</p>

      <div className="flex justify-between">
        <AvatarGroup
          max={sizePrefix=="sm"? 1 : 5}
          total={fetchList.sharedUsers.length}
          renderCount={(count) => (
            <p className="text-small text-foreground font-medium ml-2">
              +{count} {leangueBook[langueSelect].text_otherPeople}
            </p>
          )}
        >
          {fetchList.sharedUsers.slice(0, sizePrefix=="sm"? 0 : fetchList.sharedUsers.length-1 ).map((element) => (
            <Avatar key={element.avatar} src={element.avatar} />
          ))}

          <Button color="default" isIconOnly radius="full">
            <UserSettingsModal
              people={fetchList.sharedUsers}
              setPeople={UpdatePeople}
            ></UserSettingsModal>
          </Button>

        </AvatarGroup>

        <div className="flex flex-row gap-x-2.5">
          
          <ListChar data={fetchList.tasks}></ListChar>
          
          <Button
            color={"default"}
            variant={IsShowChecked ? "solid" : "light"}
            onClick={() => setIsShowChecked((prev) => !prev)}
            isIconOnly= {sizePrefix=="sm"? true : false}
          >
            {" "}
            {IsShowChecked ? (
              <Icon path={mdiCheckCircle} size={1} />
            ) : (
              <Icon path={mdiCircleOutline} size={1} />
            )}{" "}
            {sizePrefix=="sm"? null : leangueBook[langueSelect].text_showTasks}
          </Button>

          <Button color="primary" onClick={CreateNewTask} isIconOnly= {sizePrefix=="sm"? true : false}>
            {sizePrefix=="sm"? <Icon path={mdiPlusBox} size={1} /> : leangueBook[langueSelect].text_addTask}
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-y-2.5">
        {fetchList.tasks.map((task) => (
          <ListOfTasks
            data={task}
            showChecked={IsShowChecked}
            key={task.id}
            DeleteTask={DeleteTask}
            ChangeTask={ChangeTask}
          />
        ))}
      </div>
      </>
    }
    </div>
  );
}

export default ListDetail;
