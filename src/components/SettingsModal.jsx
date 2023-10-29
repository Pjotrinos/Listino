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
import { Divider } from "@nextui-org/react";

import Icon from "@mdi/react";
import { mdiCog } from "@mdi/js";


function SettingsModal({ inputSettings, ReflectChanges }) {
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

  return (
    <>
      <div>
        <Button onPress={() => handleOpen()}> <Icon path={mdiCog} size={1} /> List Settings </Button>
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
                <Icon path={mdiCog} size={1} /> Setings
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Name of list"
                  placeholder="Enter name of list"
                  isRequired
                  name="listName"
                  value={formData.listName}
                  onChange={handleInputChange}
                />
                <Textarea
                  isRequired
                  variant="flat"
                  label="Description"
                  labelPlacement="inside"
                  placeholder="Enter your description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <Input
                  type="link"
                  label="Link to image"
                  placeholder="Enter link"
                  isRequired
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleInputChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleFormSubmit}>
                  Save Changes
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
