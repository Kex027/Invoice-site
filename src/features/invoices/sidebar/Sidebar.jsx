import React from "react";
import {
  useColorMode,
  Button,
  Box,
  Text,
  Flex,
  Divider
} from "@chakra-ui/react";

const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex bg="gray.700" h="100vh" direction="column" justify="space-between" align="center">
        <Text>LOGO</Text>
        <Box>
          <Button onClick={toggleColorMode} variant="ghost" mb="5">
            {colorMode === "light" ? "Dark" : "Light"} mode
          </Button>
          <Divider orientation="horizontal" />
          <Text align="center" pt="10" pb="10">ICON</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
