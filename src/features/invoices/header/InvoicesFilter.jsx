import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { toggleFilterValue } from "../InvoicesSlice";

const InvoicesFilter = () => {
  const dispatch = useDispatch();
  
  const filtr = (value) => {
    dispatch(toggleFilterValue(value))
  };

  return (
    <div>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} colorScheme="gray" m="2">
          Filter by status
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup type="checkbox">
            <MenuItemOption value="paid" onClick={() => filtr("paid")}>
              Paid
            </MenuItemOption>
            <MenuItemOption value="pending" onClick={() => filtr("pending")}>
              Pending
            </MenuItemOption>
            <MenuItemOption value="draft" onClick={() => filtr("draft")}>
              Draft
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </div>
  );
};

export default InvoicesFilter;
