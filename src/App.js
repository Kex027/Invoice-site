import React from 'react';
import InvoicesList from "../src/features/invoices/InvoicesList"
import Header from './features/invoices/header/Header';
import { Container, Flex } from '@chakra-ui/react'
import Sidebar from './features/invoices/sidebar/Sidebar';

function App() {
  return (
    <Flex>
      <Sidebar />
      <Container minW="3xl">
        <Header />
        <InvoicesList />
      </Container>
    </Flex>
  );
}

export default App;
