import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getInvoicesLength } from "../InvoicesSlice";

const HeadingInvoice = () => {
  // const totalVaule = 0;
  const totalVaule = useSelector(getInvoicesLength);
  return (
    <div>
      <Heading>Invoices</Heading>
      <Text>There are {totalVaule} total invoices.</Text>
    </div>
  );
};

export default HeadingInvoice;
