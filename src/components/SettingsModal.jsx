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

import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

import Icon from "@mdi/react";
import { mdiCog } from "@mdi/js";

import { useAtom } from 'jotai'
import { leangueBookAtom, langueSelectAtom }  from '../../state-managment';


function SettingsModal({ inputSettings, ReflectChanges, AcceptButtonText,Text , buttonColor, noIcon, isIconOnly }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState(inputSettings);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    ReflectChanges(formData);
    console.log("Form Data:", formData);
    onClose();
  };

  const handleOpen = () => {
    onOpen();
  };

  const [leangueBook] = useAtom(leangueBookAtom)
  const [langueSelect] = useAtom(langueSelectAtom)

  return (
    <>
      <div>
        <Button color={buttonColor} isIconOnly={isIconOnly} onPress={() => handleOpen()}> {noIcon===true ? null : <Icon path={mdiCog} size={1} />} {Text} </Button>
      </div>

      <Modal
        size="lg" // Make sure to enclose 'lg' in quotes
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1">
                {" "}
                {noIcon===true ? null : <Icon path={mdiCog} size={1} />} {Text}
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label={leangueBook[langueSelect].text_setting_listName}
                  isRequired
                  name="listName"
                  value={formData.listName}
                  onChange={handleInputChange}
                />
                <Textarea
                  isRequired
                  variant="flat"
                  label={leangueBook[langueSelect].text_setting_listDescription}
                  labelPlacement="inside"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <Input
                  type="link"
                  label={leangueBook[langueSelect].text_setting_listLink}
                  isRequired
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleInputChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                {leangueBook[langueSelect].text_setting_closeButton}
                </Button>
                <Button color="primary" onPress={handleFormSubmit}>
                {AcceptButtonText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SettingsModal;
