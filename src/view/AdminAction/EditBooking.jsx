import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
// import { HotelForm } from './HotelForm'

export const EditBooking = ({isOpen, onClose, hotel }) => {
  return (
    <>
    <Modal size={"5xl"} onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <HotelForm onClose={onClose} hotel={hotel} /> */}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}
