import React, { useEffect } from "react";
import { useState } from "react";

import ListAsCard from "../components/ListAsCard";
import SettingsModal from "../components/SettingsModal";

import { Button } from "@nextui-org/react";
import Icon from "@mdi/react";
import { mdiCircleOutline } from "@mdi/js";
import { mdiCheckCircle } from "@mdi/js";
import { mdiPlusBox } from '@mdi/js';

import { useAtom } from 'jotai'
import { ListsAtom, leangueBookAtom, langueSelectAtom }  from '../../state-managment';
import { useWindowSize } from "@uidotdev/usehooks";

import 'ldrs/ring'

function ListOfLists() {
  const [IsShowChecked, setIsShowChecked] = useState(false);
  const [lists, setLists] = useAtom(ListsAtom)
  
  const [leangueBook] = useAtom(leangueBookAtom)
  const [langueSelect] = useAtom(langueSelectAtom)
  
  const [fetchState, setFetchState] = useState("pending")

  const[heloo,setHeloo] = useState("")

  useEffect(()=>{
    fetch("/api/lists")
      .then(res => res.json())
      .then(json =>{ 
        setLists(json.listinos)
        setFetchState("success")
      })
      .catch(e =>{ 
        console.error(e.message)
        setFetchState("error")
      })
  },[])

  async function CreateNewList(data){
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
    
    const response = await fetch("/api/list/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewList),
    });
    
    
    setLists([
        ... lists,
        NewList
    ])
  }

  async function DeleteList(id){
    
    const response = await fetch("/api/lists/archive/"+id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const indext = lists.findIndex((element)=> element.id === id)
    let helper = lists
    helper[indext].archived = !lists[indext].archived
    
    setLists([... helper])
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

  return (
    <div class="sm:mx-8 md:mx-10 lg:mx-20">
      <h1>{heloo}</h1>
      {/* <h1 className="font-bold text-4xl my-8">Heloo Peter</h1> */}
      <div className="flex flex-row gap-x-2.5 my-8 justify-end">
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
          {sizePrefix=="sm"? null : leangueBook[langueSelect].text_archive}
        </Button>

        <SettingsModal
          inputSettings={{}}
          ReflectChanges={CreateNewList}
          AcceptButtonText={leangueBook[langueSelect].text_create_list}
          Text={sizePrefix=="sm"? <Icon path={mdiPlusBox} size={1} /> : leangueBook[langueSelect].text_create_list}
          buttonColor = {"primary"}
          isIconOnly= {sizePrefix=="sm"? true : false}
          noIcon
        />

      </div>
      
      {fetchState === "pending" ? <div className="flex flex-row justify-center"> <l-ring className="absolute inset-0" size="60" /> </div> : null}
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {fetchState === "pending" ?<></>:lists.map((oneList)=> {return <ListAsCard id={oneList.id} key={oneList.id} name={oneList.listName} imageUrl={oneList.imageLink} DeleteList={DeleteList} showArchived={IsShowChecked} isArchived={oneList.archived}/>
        })}
      </div>
    </div>
  );
}

export default ListOfLists;
