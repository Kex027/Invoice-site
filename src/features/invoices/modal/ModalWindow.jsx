import React from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  Button,
  Flex,
  Box,
  Badge,
  Text,
  GridItem,
  Heading,
  useDisclosure,
  Drawer,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  Portal,
} from "@chakra-ui/react";
import {
  getInvoicesList,
  deleteInvoice,
  togglePaid,
  setUserData,
  setUserFlag,
} from "../InvoicesSlice";
import { useDispatch, useSelector } from "react-redux";
import InvoiceForm from "../sidebarForm/InvoiceForm";

const ModalWindow = ({ invoiceIndex, badgeColor }) => {
  const invoice = useSelector(getInvoicesList)[invoiceIndex];
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnNames = ["Item name", "Quantity", "Price", "Total"];
  const portalRef = React.useRef();
  const btnRef = React.useRef();

  return (
    <div>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justify="space-between" align="center" mr="6">
            <div>
              <Button
                ref={btnRef}
                variant="ghost"
                colorScheme="blue"
                onClick={() => {
                  onOpen();
                  dispatch(setUserData(invoice));
                  dispatch(setUserFlag(false));
                }}
              >
                Edit
              </Button>

              <Button
                variant="ghost"
                colorScheme="red"
                onClick={() => {
                  dispatch(deleteInvoice(invoiceIndex));
                }}
              >
                Delete
              </Button>
              {
                <Button
                  variant="ghost"
                  colorScheme="green"
                  onClick={() => {
                    dispatch(togglePaid(invoiceIndex));
                  }}
                >
                  {invoice.payStatus !== "paid"
                    ? "Mark as paid"
                    : "Mark as unpaid"}
                </Button>
              }
            </div>
            <Badge colorScheme={badgeColor}>{invoice.payStatus}</Badge>
            <ModalCloseButton float="left" />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex justify="space-between">
            <Heading size="sm" color="orange">
              #{invoice.id}
            </Heading>
            <Flex flexDirection="column">
              {Object.values(invoice.from).map((item) => (
                <Text key={item}>{item}</Text>
              ))}
            </Flex>
          </Flex>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            m="3 "
          >
            <GridItem>
              <Flex flexDir="column" justify="center">
                <Text>Invoice Date</Text>
                <Heading size="md">{invoice.invoiceDate}</Heading>
              </Flex>
            </GridItem>
            <GridItem rowSpan={2}>
              <Flex flexDir="column" justify="center">
                <Text>Bill to</Text>
                <Heading size="md">{invoice.to.name}</Heading>
                {Object.values(invoice.to.address).map((item) => (
                  <Text key={item} size="sm">
                    {item}
                  </Text>
                ))}
              </Flex>
            </GridItem>
            <GridItem>
              <Flex flexDir="column" justify="center">
                <Text>Sent to</Text>
                <Heading size="sm">{invoice.to.email}</Heading>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex flexDir="column" justify="center">
                <Text>Payment Due</Text>
                <Heading size="md">{invoice.paymentTerms}</Heading>
              </Flex>
            </GridItem>
          </Grid>
          <Box bg="gray.500" borderRadius="5" p="3">
            <Grid templateColumns="repeat(4, 1fr)">
              {/* COLUMN NAMES */}
              {columnNames.map((name) => (
                <GridItem key={name}>
                  <Heading size="md">{name}</Heading>
                </GridItem>
              ))}
              {/* BOUGHT ITEMS */}
              {invoice.payList.map((row) =>
                Object.values(row).map((value, index) => {
                  if (value === row.id) {
                    return;
                  }
                  return <GridItem key={(value, index)}>{value}</GridItem>;
                })
              )}
              {/* TOTAL PRICE */}
              <GridItem>Amount Due</GridItem>
              <GridItem colSpan={3}>
                <Heading size="md" float="right">
                  ${invoice.totalPrice}
                </Heading>
              </GridItem>
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
      <Portal containerRef={portalRef}>
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
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create invoice</DrawerHeader>
            <InvoiceForm onClose={onClose} invoiceId={invoice.id} />
          </DrawerContent>
        </Drawer>
      </Portal>
      <Box ref={portalRef}></Box>
    </div>
  );
};

export default ModalWindow;
