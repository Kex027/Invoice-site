import React from "react";
import InvoicesFilter from "./InvoicesFilter";
import HeadingInvoice from "./HeadingInvoice";
import { Flex, Spacer } from "@chakra-ui/react"
import DrawerAddInvoice from "../sidebarForm/DrawerAddInvoice";

const Header = ({btnRef}) => {
  return (
    <Flex>
      <HeadingInvoice />
      <Spacer />
      <Flex>
        <InvoicesFilter />
        <DrawerAddInvoice btnRef={btnRef} />
      </Flex>
    </Flex>
  );
};

export default Header;
