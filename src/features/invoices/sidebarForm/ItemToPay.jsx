import React from "react";
import {
  Grid,
  GridItem,
  Input,
  Text,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

const ItemToPay = ({ update, remove, field, register, errors, index }) => {
  const inputs = ["name", "quantity", "price"];

  return (
    <div>
      <Grid templateColumns="5fr 1fr 2fr 1fr 1fr" gap={6}>
        {inputs.map((inputValue) => {
          return (
            <GridItem w="100%" h="10" key={`${index}-${inputValue}`}>
              <FormControl isInvalid={errors[inputValue]}>
                <Input
                  p="1"
                  type={inputValue === "name" ? "text" : "number"}
                  onChange={({ target: { value } }) => {
                    if (inputValue === "name") {
                      update(index, { ...field, [inputValue]: value });
                    } else {
                      update(index, {
                        ...field,
                        [inputValue]: Number(value),
                      });
                    }
                  }}
                  // {...register(inputValue, {
                  //   required: true,
                  // })}
                  isRequired
                />
                <FormErrorMessage>
                  {errors[inputValue] && errors[inputValue].message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          );
        })}

        <GridItem w="100%" h="10">
          <Flex justift="center" align="center">
            <Text fontWeight="bold">
              {!!(field.quantity * field.price) && field.quantity * field.price}
            </Text>
          </Flex>
        </GridItem>
        <GridItem w="100%" h="10">
          <Button
            variant="ghost"
            p="1"
            onClick={() => {
              remove(index);
            }}
          >
            DEL
          </Button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default ItemToPay;
