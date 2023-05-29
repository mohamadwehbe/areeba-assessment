import React, { useState, useEffect } from 'react';
import './App.css'
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide,
    TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as services from './services.proxy'

const getAllCustomers = services.getAllCustomers;
const createCustomer = services.createCustomer;
const updateCustomer = services.updateCustomer;
const deleteCustomer = services.deleteCustomer;
const getCustomerById = services.getCustomerById;


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicTable() {

    const [customers, setCustomers] = useState([])
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [loading, setLoading] = useState(false)
    const [modify, setModify] = useState(false);
    const [message, setMessage] = useState("")

    useEffect(() => {
        let apiTest = true;
        getAllCustomers().then(x => {
            if (apiTest && x) {
                setCustomers(x.response)
            }
        })
        return () => {
            apiTest = false;
        }
    }, [modify])

    useEffect(() => {
        let apiTest = true;
        if (id)
            getCustomerById(id).then(x => {
                if (apiTest && x) {
                    setName(x.response.name)
                    setAddress(x.response.address)
                    setMobileNumber(x.response.mobileNumber)
                }
            })
        else {
            setName("")
            setAddress("")
            setMobileNumber("")
        }
        return () => {
            apiTest = false;
        }
    }, [id])

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setMessage("");
        setId("");
        setName("");
        setAddress("");
        setMobileNumber("");
        setOpen(false);
    };

    const data = {
        customerID: id,
        name: name,
        address: address,
        mobileNumber: mobileNumber
    }

    return (
        <Grid container alignItems='center' justifyContent='center' direction='column' padding={5} gap={5}>
            <Grid item><Button variant="outlined" onClick={() => { setId(""); handleClickOpen() }}>Add Customer</Button></Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell >Address</TableCell>
                                <TableCell >Mobile Number</TableCell>
                                <TableCell>Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers?.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell >{row.address}</TableCell>
                                    <TableCell >{row.mobileNumber}</TableCell>
                                    <TableCell>
                                        <Grid container alignItems='center'>
                                            <Grid item><EditIcon sx={{ cursor: 'pointer' }} onClick={() => {
                                                setId(row._id);
                                                handleClickOpen();
                                            }} /></Grid>
                                            <Grid item><DeleteIcon sx={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    deleteCustomer(row.id).then(() => {
                                                        setTimeout(() => {
                                                            setModify(!modify)
                                                        }, 500);
                                                    })
                                                }} /></Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{id ? "Edit" : "Add"} Customer</DialogTitle>
                <DialogContent>
                    <Grid container direction='column' alignItems='center' padding={5} gap={2}>
                        <Grid item>
                            <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                        </Grid>
                        <Grid item>
                            <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                }} />
                        </Grid>
                        <Grid item>
                            <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined"
                                value={mobileNumber}
                                onChange={(e) => {
                                    setMobileNumber(e.target.value)
                                }} />
                        </Grid>
                        <Grid item>
                            {message}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button disabled={!name || !address || !mobileNumber} onClick={() => {
                        if (id) {
                            updateCustomer(data).then((x) => {
                                setModify(!modify);
                                setMessage(x.message);
                                setTimeout(() => {
                                    handleClose();
                                }, 1500);
                            })
                        }
                        else {
                            createCustomer(data).then((x) => {
                                setModify(!modify);
                                setMessage(x.message);
                                setTimeout(() => {
                                    handleClose();
                                }, 1500);
                            })
                        }
                    }}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}