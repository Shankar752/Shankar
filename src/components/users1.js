import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Row, Col, Form, InputGroup } from 'react-bootstrap'

const AddEditDelete = () => {

    const [state, setState] = useState({
        list: [],
    })
    useEffect(() => {
        axios.get('https://reqres.in/api/users')
            .then(function (response) {
                setState({ ...state, list: response.data.data })
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    // Form Functionality
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

    };
    // end the form fucntionalty   

    // Modal for add user
    const [add, setAdd] = useState(false)
    const handleAdd = () => {
        setModal({ ...modal, first_name: '', last_name: '', email: '' })
        setIsAdd(true)
        setAdd(true);
    }
    const handleCloseAdd = () => setAdd(false)

    //Add Functionality
    const [modal, setModal] = useState({
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
    })
    const handleInputChange = (e) => {
        setModal({ ...modal, [e.target.name]: e.target.value })
    }

    const addFn = () => {
        if (isAdd) {
            console.log("add the values")
            const { list } = state;
            list.push(modal)
            setState({ ...state, list: list });
            const obj = {
                first_name: '',
                last_name: '',
                email: '',
                avatar: ''
            }
            setModal(obj);
            handleCloseAdd(false);
        }
        else {
            const getEdit = list.findIndex((each) => each.id === modal.id)
            console.log("getEdit", getEdit);
            list[getEdit] = modal
            setState({ ...state, list: list })
            handleCloseAdd();

        }
    }

    // Edit functionality
    const [isAdd, setIsAdd] = useState(false)
    const editUser = (user) => {
        console.log("user", user);
        setModal(user);
        setAdd(true)
        setIsAdd(false)
    }
    // end the Edit functionality 


    // Delete Functionality
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [Deleteuser, setDeleteuser] = useState({})
    const { list } = state

    const deleteList = (user) => {
        setShow(true)
        setDeleteuser(user)
    }

    const deleteFn = (user) => {
        const getIndex = list.indexOf(Deleteuser);
        list.splice(getIndex, 1)
        console.log("newlist", list);
        setState({ ...state, list: list });
        handleClose();
    }
    // End the Delete Functionality


    // profile pic
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name) {
            console.log(file)
            console.log(URL.createObjectURL(file))
            setState({ ...state, profilePic: file, profilePicUrl: URL.createObjectURL(file) })
        }
        console.log(file)
    }

    const handleRemoveProfile = () => {
        setState({ ...state, profilePic: '', profilePicUrl: '' })
    }

    const handleUpload = () => {
        document.getElementById("profile-pic").click();
    }


    return (
        <div className='container'>

            <Button variant="success" onClick={handleAdd}>
                Add New User
            </Button>

            <Table striped bordered hover variant="dark">
                <thead >
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>ProfilePic</th>
                        <th>Actions Edit</th>
                        <th>Actions Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.list.map((each, index) => {
                            return (
                                <tr key={index}>
                                    <td>{each.first_name}</td>
                                    <td>{each.last_name}</td>
                                    <td>{each.email}</td>
                                    <td><img className='rounded-circle' src={each.avatar} alt="image" width="90" height="90" /></td>
                                    <td>
                                        <Button onClick={() => editUser(each)}>Edit</Button>
                                    </td>
                                    <td>
                                        <Button variant='danger' onClick={() => deleteList(each)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>





            {/* This is a modal of Adduser function */}

            <Modal show={add} onHide={handleCloseAdd} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            isAdd ? "Add New User" : "Edit user"
                        }

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate validated={validated} onSubmit={handleSubmit} >
                        <Form.Group>
                            <Form.Label>First name</Form.Label>
                            <Form.Control required type="text" name="first_name" value={modal.first_name} onChange={handleInputChange} placeholder="First name" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="text" name="last_name" value={modal.last_name} onChange={handleInputChange} placeholder="Last name" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" value={modal.email} onChange={handleInputChange} placeholder="Enter Email" aria-describedby="inputGroupPrepend" required />
                        </Form.Group>

                        <Form.Group>

                            <Form.Label>Profile Pic</Form.Label>

                            {
                                state.profilePicUrl ?
                                    <div>
                                        <img src={state.profilePicUrl} height="100" />
                                        <div onClick={handleUpload}> <u> Select Another ProfilePic </u></div>
                                        <Button onClick={handleRemoveProfile}>Remove</Button>
                                    </div>
                                    :
                                    <div className='border text-success' onClick={handleUpload}><u> Add your Profilepic</u></div>
                            }


                            <Form.Control type="file" hidden name="profilePic" id="profile-pic" onChange={handleFileChange} aria-describedby="inputGroupPrepend" required />
                        </Form.Group>

                        <div className='m-3 text-center'> <Button variant="secondary" onClick={handleCloseAdd}>Close</Button> <Button variant='success' type="submit" onClick={addFn}>Save Changes</Button></div>
                    </Form>
                </Modal.Body>

            </Modal>



            {/* This is a modal of Delete function */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body> <b> Are you sure want to delete</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        cancel
                    </Button>
                    <Button variant="danger" onClick={deleteFn} >
                        Delete
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddEditDelete;