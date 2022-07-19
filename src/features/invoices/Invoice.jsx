import React from "react";
import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  Badge,
  Heading,
  Button,
  Flex,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import ModalWindow from "./modal/ModalWindow";

const Invoice = ({ date, name, payStatus, orderValue, totalPrice }) => {
  let badgeColor;
  switch (payStatus) {
    case "paid":
      badgeColor = "green";
      break;
    case "pending":
      badgeColor = "orange";
      break;
    case "draft":
      badgeColor = "gray";
      break;
    default:
      badgeColor = "green";
  }

  // capitalizing every word in a string
  const titleCase = (str) => {
    if (typeof str !== "string") {
      return;
    }
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    // bgGradient="linear(to-l, #a84361, #b5db5c)"
    <Box borderWidth="1px" borderRadius="md" m="2" p="3">
      <StatGroup>
        <Stat>
          <Flex align="center" justify="space-between">
            <Heading align="center" fontSize="4xl">
              #{orderValue}
            </Heading>
            <StatHelpText align="center">{date}</StatHelpText>
            <StatLabel>{titleCase(name)}</StatLabel>
          </Flex>
        </Stat>
        <Stat>
          <Flex align="center" justify="space-around">
            <StatNumber>
              ${totalPrice}
            </StatNumber>
            <Badge colorScheme={badgeColor}>{payStatus}</Badge>

            <Button onClick={onOpen} variant="none">
              &#62;
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalWindow badgeColor={badgeColor} invoiceIndex={orderValue - 1} />
            </Modal>
          </Flex>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Invoice;
