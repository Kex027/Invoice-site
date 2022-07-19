import React from "react";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import InvoiceForm from "./InvoiceForm";
import { setUserData, setUserFlag } from "../InvoicesSlice";
import { useDispatch } from "react-redux";

const DrawerAddInvoice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const btnRef = React.useRef();
  
  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="blue"
        onClick={() => {
          onOpen();
          dispatch(setUserFlag(true));
        }}
        m="2"
      >
        New invoice
      </Button>
      <Drawer
        size="md"
        isOpen={isOpen}
        placement="left"
        onClose={() => {
          dispatch(setUserData({}));
          onClose();
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create invoice</DrawerHeader>
            <InvoiceForm onClose={onClose} />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default DrawerAddInvoice;
