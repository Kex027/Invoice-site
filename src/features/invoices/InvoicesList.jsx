import React from "react";

import Invoice from "./Invoice";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getInvoicesList, getFilteredValue } from "./InvoicesSlice";

const InvoicesList = () => {
  const invoices = useSelector(getInvoicesList);
  const filteredInvoicesStatus = useSelector(getFilteredValue);

  const filteredInvoices = () => {
    if (!filteredInvoicesStatus.length) {
      return invoices;
    }
    return invoices.filter((invoice) =>
      filteredInvoicesStatus.includes(invoice.payStatus)
    );
  };
  return (
    <Box borderWidth="1px" borderRadius="lg">
      {filteredInvoices().map(
        ({ id, invoiceDate, payList, payStatus, totalPrice, to: { name } }, index) => {
          return (
            <Invoice
              id={id}
              date={invoiceDate}
              payList={payList}
              name={name}
              payStatus={payStatus}
              totalPrice={totalPrice}
              orderValue={index + 1}
              key={`${id}-${index}`}
            />
          );
        }
      )}
    </Box>
  );
};

export default InvoicesList;

// modal
// slice dla modala
