import * as constFile from './constData';
import axios from "axios";

const GET_CUSTOMERS = constFile.GET_CUSTOMERS;
export const getAllCustomers = () => {
    return axios
        .get(`${process.env.REACT_APP_URL + GET_CUSTOMERS}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

const CREATE_CUSTOMER = constFile.CREATE_CUSTOMER;
export const createCustomer = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + CREATE_CUSTOMER}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

const UPDATE_CUSTOMER = constFile.UPDATE_CUSTOMER;
export const updateCustomer = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + UPDATE_CUSTOMER}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

const DELETE_CUSTOMER = constFile.DELETE_CUSTOMER;
export const deleteCustomer = (id) => {
    return axios
        .post(`${process.env.REACT_APP_URL + DELETE_CUSTOMER}`, {
            customerID: id
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

const GET_CUSTOMER = constFile.GET_CUSTOMER;
export const getCustomerById = (id) => {
    return axios
        .post(`${process.env.REACT_APP_URL + GET_CUSTOMER}`, {
            customerID: id
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};