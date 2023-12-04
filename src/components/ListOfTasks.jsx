import React from "react";
import { useState } from "react";

//components from library
import { Checkbox } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Kbd} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

//icons
import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";

import { useAtom } from "jotai";
import { leangueBookAtom, langueSelectAtom }  from '../../state-managment';

function ListOfTasks({ data, DeleteTask, showChecked, ChangeTask }) {
  const [taskText, setTaskText] = useState(data.taskText);
  const [isChanging, setIsChanging] = useState(false);

  function SaveData(e){
    if (e.key === "Enter"){
        ChangeTask(data.id, {"taskText" : taskText})
        setIsChanging(false)
    }
  }

  function SaveDataOnLeave(){
        ChangeTask(data.id, {"taskText" : taskText})
        setIsChanging(false)
  }
    
  const [leangueBook] = useAtom(leangueBookAtom)
  const [langueSelect] = useAtom(langueSelectAtom)

  return (
    <div>
      {showChecked === false && data.isDone === true ? null : (
        <Card fullWidth={true}>
          <CardBody>
            <div class="flex justify-start">
              <Checkbox
                size="lg"
                isSelected={data.isDone}
                onValueChange={() => ChangeTask(data.id, {isDone : !data.isDone})}
              ></Checkbox>

              <Input
                type="text"
                defaultValue={taskText}
                onChange={event => {setTaskText(event.target.value), setIsChanging(true)}}
                onKeyDown={SaveData}
                onBlur={SaveDataOnLeave}

                isDisabled={data.isDone}
                endContent={
                    <>
                    {isChanging ? <Button variant="light" color="primary">{leangueBook[langueSelect].text_setting_acceptButton}<Kbd keys={["enter"]}></Kbd> </Button>: <></>}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="light">
                        <Icon path={mdiDotsHorizontal} size={1} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => DeleteTask(data.id)}
                      >
                        {leangueBook[langueSelect].text_deleteTask}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  </>
                }
              />
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default ListOfTasks;
