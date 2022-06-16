import './users.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

function App() {

    const fetchData = () => {
        axios.get("https://reqres.in/api/users").then((response) => {
            console.log(response.data.data)
            // setTabledata(response.data)
            setTabledata({ ...tabledata, data: response.data.data })
        });
    }
    useEffect(() => {
        fetchData()
    }, []);


    const [addusermodel, setaddusermodel] = useState(false);
    
    

    const handleClose = () => setaddusermodel(false);
    const handleaddusermodel = () => setaddusermodel(true);


    
    
    const [tabledata, setTabledata] = useState({
        data: []
    }
    );

    const deleteUser = (index) => {
        console.log(index)

        const filterlist = tabledata.data.filter((each) => each.id !== index.id);
        console.log(filterlist)
        setTabledata({ ...tabledata, data: filterlist })
    }

    const [addUser, setaddUser] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
        avatarUrl: '',

        errors: {
            first_nameError: false,
            first_nameMessage: '',
            last_nameError: false,
            last_nameMessage: '',
            emailError: '',
            emailMessage: '',
        },

    })

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setaddUser({ ...addUser, [name]: value })
        
    }

    // const editUser=(user)=>{
    //     setaddUser(user)
    //     setaddusermodel(true)
        
    // }

    // const [isaddmodel,setisaddmodel]=useState()

    // if(isaddmodel){
    //     const newList=[...tabledata.data];
    //     newList.push(addUser);
    //     setTabledata({...tabledata,data:newList})
    // }
  



    const addUserFn = (e) => {
        e.preventDefault();
        handleClose(true);



        let newList = tabledata.data.push(addUser);

        console.log(newList);

        setTabledata({ ...tabledata, tabledata: newList })




        const { errors } = addUser;
        //If first_name is null, show the error message
        if (!addUser.first_name) {
            errors['first_nameError'] = true;
            errors['first_nameMessage'] = "Please enter first name.";
        } else {
            errors['first_nameError'] = false;
            errors['first_nameMessage'] = "";
        }

        //If last name is null, show the error message
        if (!addUser.last_name) {
            errors['last_nameError'] = true;
            errors['last_nameMessage'] = "Please enter last name.";
        } else {
            errors['last_nameError'] = false;
            errors['last_nameMessage'] = "";
        }

        setaddUser({ ...addUser, errors: errors })

        

    }

    const allowOnlyNumbers = (evt) => {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        console.log(charCode)
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            evt.preventDefault()

        return true;
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name) {
            console.log(file)
            console.log(URL.createObjectURL(file))
            setaddUser({ ...addUser, avatar: file, avatarUrl: URL.createObjectURL(file) })
        }
        console.log(file)
    }

    const handleRemoveProfile = () => {
        setaddUser({ ...addUser, avatar: '', avatarUrl: '' })
    }

    const handleUpload = () => {
        document.getElementById("avatar").click();
    }





    return (
        <div>



            <Button variant="primary" onClick={handleaddusermodel}>
                addUser
            </Button>


            <div className='innerdiv'>

                <table className="table table-striped border border-dark">

                    <thead className="thead-dark text-center">



                        <tr>
                            <th>Id</th>
                            <th>First_Name</th>
                            <th>Last_Name</th>
                            <th>Email</th>
                            <th>avatar</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            tabledata.data.map((each, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{each.id}</td>
                                        <td>{each.first_name}</td>
                                        <td>{each.last_name}</td>
                                        <td>{each.email}</td>
                                        <td>
                                            <img src={each.avatar} alt="image" />
                                        </td>
                                        <td><Button variant="primary" onClick={addUserFn}>
                                            Edit
                                        </Button></td>
                                        <td><Button variant="primary" onClick={() => deleteUser(each)}>Delete</Button></td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>







                <Modal show={addusermodel} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>addUser</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <form>

                            <div>

                                <div className="col-5">
                                    <label>Id</label>
                                    <input type="text" name="id" placeholder="Enter id" value={addUser.id} onKeyPress={allowOnlyNumbers} onChange={handleInputChange} />
                                </div>
                                <div className="col-6">
                                    <label>First Name</label>
                                    <input type="text" name="first_name" className={addUser.errors.first_nameError ? "borderRed" : ""}  placeholder="Enter first name" value={addUser.first_name} onChange={handleInputChange} />
                                    {addUser.errors.first_nameError && <div className="fntRed">{addUser.errors.first_nameMessage}</div>}
                                    
                                </div>
                                <div className="col-6">
                                    <label>Last Name</label>
                                    <input type="text" name="last_name" className={addUser.errors.last_nameError ? "borderRed" : ""} placeholder="Enter last name" value={addUser.last_name} onChange={handleInputChange} />
                                    {addUser.errors.last_nameError && <div className="fntRed">{addUser.errors.last_nameMessage}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <label>Email</label>
                                    <input type="text" name="email" className={addUser.errors.emailError ? "borderRed" : ""} placeholder="Enter email" value={addUser.email} onChange={handleInputChange} />
                                    {addUser.errors.emailError && <div className="fntRed">{addUser.errors.emailError}</div>}
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-6">
                                    <label>Upload Image label:</label>

                                    {
                                        addUser.avatarUrl ?
                                            <div>
                                                <img src={addUser.avatarUrl} height="50" />
                                                <div onClick={handleUpload}>Upload new image</div>
                                                <button onClick={handleRemoveProfile}>Remove</button>
                                            </div>
                                            :
                                            <div onClick={handleUpload}>Upload new image</div>
                                    }
                                    <input type="file" hidden name="avatar" id="avatar" onChange={handleFileChange} accept="image/png" />
                                </div>
                            </div>
                        </form>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={addUserFn}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
export default App;