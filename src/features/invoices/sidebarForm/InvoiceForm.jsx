import React from "react";
import {
  DrawerBody,
  Flex,
  Button,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormField from "./FormField";
import ItemToPay from "./ItemToPay";
import {
  addInvoice,
  modifyUser,
  getUserData,
  setUserData,
  getAddUserFlag,
} from "../InvoicesSlice";

const InvoiceForm = ({ onClose, invoiceId }) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const addUser = useSelector(getAddUserFlag);
  const {
    handleSubmit,
    register,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues:
      // {
      //   streetAddress: userData.from.streetAddress,
      //   city: userData.from.city,
      //   postCode: userData.from.postCode,
      //   country: userData.from.country,
      //   clientName: userData.to.name,
      //   clientEmail: userData.to.email,
      //   clientStreetAddress: userData.to.address.streetAddress,
      //   clientCity: userData.to.address.city,
      //   clientPostCode: userData.to.address.postCode,
      //   clientCountry: userData.to.address.country,
      //   invoiceDate: userData.invoiceDate,
      //   paymentTerms: userData.paymentTerms,
      // },
      {
        streetAddress: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom",
        clientName: "Thomas Wayne",
        clientEmail: "thomas@dc.com",
        clientStreetAddress: "3964 Queens Lane",
        clientCity: "Gotham",
        clientPostCode: "60457",
        clientCountry: "United States of America",
        invoiceDate: "2021-08-01",
        paymentTerms: "2022-08-31",
      },
  });

  // streetAddress: "19 Union Terrace",
  // city: "London",
  // postCode: "E1 3EZ",
  // country: "United Kingdom",
  // clientName: "Thomas Wayne",
  // clientEmail: "thomas@dc.com",
  // clientStreetAddress: "3964 Queens Lane",
  // clientCity: "Gotham",
  // clientPostCode: "60457",
  // clientCountry: "United States of America",
  // invoiceDate: "2021-08-01",
  // paymentTerms: "2022-08-31",
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "payList",
    // defaultValues: userData.payList,
  });

  const formFields = [
    "streetAddress",
    "city",
    "postCode",
    "country",
    "clientName",
    "clientEmail",
    "clientStreetAddress",
    "clientCity",
    "clientPostCode",
    "clientCountry",
    "invoiceDate",
    "paymentTerms",
  ];

  function onSubmit(values) {
    if (!fields.length) {
      console.log("there is 0 bought items");
      return;
    }
    if (addUser) {
      dispatch(addInvoice(values));
    } else {
      dispatch(modifyUser({ values: values, id: invoiceId }));
    }
    dispatch(setUserData({}));
  }

  return (
    <DrawerBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <FormField
            key={field}
            register={register}
            errors={errors}
            formField={field}
          />
        ))}

        {!!fields?.length && (
          <Grid templateColumns="5fr 1fr 2fr 1fr 1fr" gap={6}>
            <GridItem w="100%" h="10">
              <Text>Item Name</Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text>Qty.</Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text>Price</Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text>Total</Text>
            </GridItem>
            <GridItem w="100%" h="10">
              <Text></Text>
            </GridItem>
          </Grid>
        )}

        {fields?.map((field, index) => (
          <ItemToPay
            field={field}
            update={update}
            register={register}
            errors={errors}
            key={`${field}.${index}`}
            {...{ control, index, field }}
            remove={remove}
            name={fields[index].name}
            watch={watch}
            index={index}
          />
        ))}

        <Button
          bg="#3f89"
          onClick={() => {
            append({
              name: "",
              quantity: 0,
              price: 0,
              total: 0,
            });
          }}
          mt="3"
        >
          + Add new item
        </Button>

        <Flex justify="space-between" align="center" mb="3" mt="3">
          <Button
            variant="outline"
            onClick={() => {
              dispatch(setUserData({}));
              console.log("userdata: ", userData);
              reset();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
            Save &amp; Send
          </Button>
        </Flex>
      </form>
    </DrawerBody>
  );
};

export default InvoiceForm;
