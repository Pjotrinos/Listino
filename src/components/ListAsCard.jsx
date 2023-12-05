import React from "react";
import { useState } from "react";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";

import { Chip, Badge } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";

import { useAtom } from "jotai";
import { leangueBookAtom, langueSelectAtom }  from '../../state-managment';


import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

function ListAsCard({
  id,
  name,
  imageUrl,
  DeleteList,
  showArchived,
  isArchived,
  taskNumber
}) {
  const navigate = useNavigate();
  
  const size = useWindowSize();
  const sizePrefix = setSizePrefix(size)
  
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

  const [leangueBook] = useAtom(leangueBookAtom)
  const [langueSelect] = useAtom(langueSelectAtom)

  return (
    <>
      {isArchived === true && showArchived === false ? null : (
        <Card
          className="py-4"
          isPressable={!isArchived}
          isHoverable={!isArchived}
          onPress={() => navigate("/list/" + id)}
        >
          <CardBody className="overflow-visible py-2">
              <div
                className="max-h-20 sm:max-h-20 md:max-h-40 lg:max-h-30 bg-cover relative overflow-hidden"
                style={{ borderRadius: "var(--nextui-radius-large)" }}
              >
                  <Image
                    className="wm-min-full h-min-full"
                    src={imageUrl}
                    alt="Cropped Image"
                    layout="fill"
                    objectFit="cover"
                    style={
                      isArchived === true ? { filter: "grayscale(100%)" } : null
                    }
                  />

                <div className="absolute top-0 left-0 p-3 z-10">
                  {isArchived === true ? (
                    <Chip className="mb-4">{leangueBook[langueSelect].text_archiveState}</Chip>
                  ) : null}
                </div>
                <div className="absolute top-0 right-0 p-3">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className="text-tiny text-white bg-black/20 backdrop-blur-lg"
                        size="md"
                        isIconOnly
                      >
                        <Icon path={mdiDotsHorizontal} size={1} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => DeleteList(id)}
                      >
                        {isArchived === true
                          ? leangueBook[langueSelect].text_unArchiveList
                          : leangueBook[langueSelect].text_archiveList}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
          

            <CardHeader className="pb-0 flex-col items-start">
            <h4 className="font-bold text-large">{name} <Chip size="sm">{taskNumber}</Chip></h4>
            </CardHeader>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default ListAsCard;
