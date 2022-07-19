import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    value: [
        {
            id: 'u36xSRaGYSRhQWvnSzCLw',
            invoiceDate: "2020-01-01",
            paymentTerms: "2022-07-12",
            totalPrice: 180,
            payStatus: 'pending',
            from:
            {
                streetAddress: "19 Union Terrace",
                city: "London",
                postCode: "E1 3EZ",
                country: "United Kingdom",
            },
            to:
            {
                name: "Jensen Huang",
                email: "jensen.huang@gmail.com",
                address: {
                    streetAddress: "106 Kendell Street",
                    city: "Sharrington",
                    postCode: "NR24 5WQ",
                    country: "United Kingdom",
                },
            },
            payList: [{
                name: "water",
                quantity: 3,
                price: 60,
                total: 120,
            }, {
                name: "soda",
                quantity: 1,
                price: 30,
                total: 30,
            }],
        },
    ],
    filterValues: [],
    currentUserData: {
        id: "",
        invoiceDate: "",
        paymentTerms: "",
        from:
        {
            streetAddress: "",
            city: "",
            postCode: "",
            country: "",
        },
        to:
        {
            name: "",
            email: "",
            address: {
                streetAddress: "",
                city: "",
                postCode: "",
                country: "",
            },
        },
        payList: [],
    },
    addUserFlag: true,
};

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        addInvoice(state, { payload }) {
            state.value.push({
                id: nanoid(),
                invoiceDate: payload.invoiceDate,
                paymentTerms: payload.paymentTerms,
                totalPrice: payload.payList.reduce((amountDue, { total }) => {
                    return amountDue + total;
                }, 0),
                payStatus: "pending",
                from:
                {
                    streetAddress: payload.streetAddress,
                    city: payload.city,
                    postCode: payload.postCode,
                    country: payload.country,
                },
                to:
                {
                    name: payload.clientName,
                    email: payload.clientEmail,
                    address: {
                        streetAddress: payload.clientStreetAddress,
                        city: payload.clientCity,
                        postCode: payload.clientPostCode,
                        country: payload.clientCountry,
                    },
                },
                payList: payload.payList,
            }
            );
        },
        modifyUser(state, { payload: { id, values } }) {
            console.log("id", id)
            console.log("values", values)
            const index = state.value.findIndex((invoice => invoice.id === id));
            state.value[index] = {
                id: id,
                invoiceDate: values.invoiceDate,
                paymentTerms: values.paymentTerms,
                totalPrice: values.payList.reduce((amountDue, { total }) => {
                    return amountDue + total;
                }, 0),
                payStatus: "pending",
                from:
                {
                    streetAddress: values.streetAddress,
                    city: values.city,
                    postCode: values.postCode,
                    country: values.country,
                },
                to:
                {
                    name: values.clientName,
                    email: values.clientEmail,
                    address: {
                        streetAddress: values.clientStreetAddress,
                        city: values.clientCity,
                        postCode: values.clientPostCode,
                        country: values.clientCountry,
                    },
                },
                payList: values.payList,
            }
        },
        deleteInvoice(state, { payload }) {
            state.value.splice(payload, 1);
        },
        toggleFilterValue(state, action) {
            const value = action.payload;

            if (state.filterValues.includes(value)) {
                state.filterValues = state.filterValues.filter(item => item !== value)
            } else {
                state.filterValues.push(value)
            }
        },
        togglePaid(state, { payload: index }) {
            if (state.value[index].payStatus === "paid") {
                state.value[index].payStatus = "pending"
            } else {
                state.value[index].payStatus = "paid";
            }
        },
        setUserData(state, { payload }) {
            // jak dawalem pusty obiekt to wywalalo blad 
            // a ? nic nie robil 
            if ((Object.keys(payload)).length === 0) {
                state.currentUserData = {
                    id: "",
                    invoiceDate: "",
                    paymentTerms: "",
                    from:
                    {
                        streetAddress: "",
                        city: "",
                        postCode: "",
                        country: "",
                    },
                    to:
                    {
                        name: "",
                        email: "",
                        address: {
                            streetAddress: "",
                            city: "",
                            postCode: "",
                            country: "",
                        },
                    },
                    payList: [],
                }
            } else {
                console.log("payload: ", payload);
                state.currentUserData = payload;
            }
        },
        setUserFlag(state, { payload }) {
            state.addUserFlag = payload;
        }
    }
});

export const getInvoicesList = (state) => state.invoices.value;
export const getFilteredValue = (state) => state.invoices.filterValues;
export const getInvoicesLength = (state) => state.invoices.value?.length;
export const getUserData = (state) => state.invoices.currentUserData;
export const getAddUserFlag = (state) => state.invoices.addUserFlag;
export const { addInvoice, toggleFilterValue, deleteInvoice, togglePaid, setUserData, modifyUser, setUserFlag } = invoicesSlice.actions;
export default invoicesSlice.reducer;


// TODO 
// ogarnac total 
// paylist przy edicie nie dziala