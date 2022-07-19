import React from 'react';
import InvoicesList from "../src/features/invoices/InvoicesList"
import Header from './features/invoices/header/Header';
import { Container, Flex } from '@chakra-ui/react'
import Sidebar from './features/invoices/sidebar/Sidebar';

function App() {
  const btnRef = React.useRef();
  return (
    <Flex>
      <Sidebar />
      <Container minW="3xl">
        <Header btnRef={btnRef} />
        <InvoicesList btnRef={btnRef} />
      </Container>
    </Flex>
  );
}

export default App;
