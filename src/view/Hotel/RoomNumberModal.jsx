import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { AlertToastMessage } from "../../Element/Alert";

export function RoomNumberModal({
  isOpen,
  onClose,
  setSelectNumberOfRoom,
  actualRoom,
  name,
  setSelectedRoom,
  price,
}) {
  const initialRef = React.useRef(null);

  const finalRef = React.useRef(null);
  const [roomNumber, setRoomNumber] = useState(1);
  const { showToast } = AlertToastMessage();
  const handleSaveRoom = () => {
    if (roomNumber === 0) {
      showToast(
        "Number of room warning",
        "Please select at least one room",
        "warning"
      );
      return;
    }
    if (roomNumber > actualRoom) {
      showToast(
        "Number of room warning",
        `We have only ${actualRoom} please enter room less than ${actualRoom}`,
        "warning"
      );
      return;
    }
    setSelectNumberOfRoom(roomNumber);

    setSelectedRoom((prev) => [
      ...prev,
      { roomType: name, numberOfRoom: roomNumber,price: +(roomNumber*price) },
    ]);
    onClose();
  };
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Inter number of room you need</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Number of room</FormLabel>
            <Input
              value={roomNumber}
              type="Number"
              onChange={(e) => setRoomNumber(+e.target.value)}
              ref={initialRef}
              placeholder="Number of room"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSaveRoom} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
