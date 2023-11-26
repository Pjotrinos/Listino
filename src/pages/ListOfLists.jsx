import React from "react";
import { useState } from "react";

import ListAsCard from "../components/ListAsCard";
import SettingsModal from "../components/SettingsModal";

import { Button } from "@nextui-org/react";
import Icon from "@mdi/react";
import { mdiCircleOutline } from "@mdi/js";
import { mdiCheckCircle } from "@mdi/js";

import { useAtom } from 'jotai'
import { ListsAtom }  from '../../state-managment';

function ListOfLists() {
  const [IsShowChecked, setIsShowChecked] = useState(false);
  const [lists, setLists] = useAtom(ListsAtom)

  function CreateNewList(data){
    const NewList = {
        ...data,
        id: Math.random().toString(36).substring(2),
        owner: {
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            name: "František Hodný",
        },
        tasks: [],
        sharedUsers:[],
        archived: false
    }
    
    setLists([
        ... lists,
        NewList
    ])
  }

  function DeleteList(id){
    const indext = lists.findIndex((element)=> element.id === id)
    let helper = lists
    helper[indext].archived = !lists[indext].archived
    
    setLists([... helper])
  }

  return (
    <div class="mx-20">
      {/* <h1 className="font-bold text-4xl my-8">Heloo Peter</h1> */}
      <div className="flex flex-row gap-x-2.5 my-8 justify-end">
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
          Show archived
        </Button>

        <SettingsModal
          inputSettings={{}}
          ReflectChanges={CreateNewList}
          AcceptButtonText={"Create list"}
          Text={"Create new list"}
          buttonColor = {"primary"}
          noIcon
        />

      </div>

      <div class="grid grid-cols-3 gap-4 ">
      {lists.map((oneList)=> {return <ListAsCard id={oneList.id} key={oneList.id} name={oneList.listName} imageUrl={oneList.imageLink} DeleteList={DeleteList} showArchived={IsShowChecked} isArchived={oneList.archived}/>
        })}
      </div>
    </div>
  );
}

export default ListOfLists;
