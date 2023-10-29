import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { User } from "@nextui-org/react";

import Icon from "@mdi/react";
import { mdiAccountCog } from "@mdi/js";
import { mdiDotsHorizontal } from "@mdi/js";
import { Divider } from "@nextui-org/react";

import { Input } from "@nextui-org/react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { mdiAlertOutline } from '@mdi/js'
import { Card, CardBody, CardHeader } from "@nextui-org/react";

function UserSettingsModal({people, setPeople }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [addInput, setAddInput] = useState("");

  function addUser() {
    let i = Math.floor(Math.random() * 10);
    const RandomAvatar = `https://i.pravatar.cc/150?u=a04258${i}4e29026${i}2d`;

    setPeople([
      {
        avatar: RandomAvatar,
        name: addInput,
      },
      ...people,
    ]);
  }

  function removeUser(id) {
    const filter = people.filter((element) => id !== element.avatar)
    console.log(filter)
    setPeople(filter)
  }

  return (
    <>
      <Button color="default" isIconOnly radius="full" onPress={onOpen}>
        <Icon path={mdiAccountCog} size={1} />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User Settings
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row justify-between">
                  <User
                    name="Jane Doe"
                    description="List Owner"
                    avatarProps={{
                      src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                  />
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
                      >
                        remove user
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <Input
                  type="link"
                  label="Add user"
                  placeholder="Enter user"
                  value={addInput}
                  labelPlacement="outside"
                  onChange={(e) => setAddInput(e.target.value)}
                  name="imageLink"
                  endContent={
                    <Button variant="light" color="primary" onClick={addUser}>
                      {" "}
                      Add user
                    </Button>
                  }
                />
                <Card shadow="sm">
                  <CardHeader className="flex flex-row pb-0 gap-2 px-4 items-start">
                  <Icon path={mdiAlertOutline}  size={1} /> <h1 className="text-base font-bold text-foreground-600 text-tiny cursor-text"> Danger zone (only for users)</h1>
                  </CardHeader>
                  <CardBody>
                    <Button color="danger" variant="bordered">
                    Leave Group
                    </Button>
                  </CardBody>
                </Card>

                <Divider className="my-4" />

                <div className="flex flex-col gap-4">
                  {people.map((human) => (
                    <div
                      key={human.name}
                      className="flex flex-row justify-between"
                    >
                      <User
                        name={human.name}
                        description="User"
                        avatarProps={{
                          src: human.avatar,
                        }}
                      />
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
                            onClick={() => removeUser(human.avatar)}
                          >
                            remove user
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Apply settings
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserSettingsModal;
