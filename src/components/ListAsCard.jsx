import React from "react";
import { useState } from "react";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";

import { Chip } from "@nextui-org/react";

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
}) {
  const navigate = useNavigate();

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
                className="h-56 relative overflow-hidden"
                style={{ borderRadius: "var(--nextui-radius-large)" }}
              >
                <Image
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
                    <Chip className="mb-4">Archived list</Chip>
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
                          ? "Rebirth list form archive"
                          : "Archive list"}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
          

            <CardHeader className="pb-0 flex-col items-start">
              <h4 className="font-bold text-large">{name}</h4>
            </CardHeader>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default ListAsCard;
