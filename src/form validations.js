import React, { useEffect, useState } from "react";

const Signup = () => {

    const [signupForm, setSignupForm] = useState({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: '',
        country: '',
        gender: '',
        profilePic: '',
        profilePicUrl: '',
        termsAndConditions: '',
        errors: {
            firstNameError: false,
            firstNameMessage: '',
            lastNameError: false,
            lastNameMessage: '',
            passwordError: false,
            passwordMessage: '',
            confirmPasswordError: false,
            confirmPasswordMessage: ''
        }
    })

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setSignupForm({ ...signupForm, [name]: value })
    }
    const handleCBoxChange = (e) => {
        const value = e.target.checked;
        const name = e.target.name;
        setSignupForm({ ...signupForm, [name]: value })
    }

    const signupFn = (e) => {
        e.preventDefault();
        const { errors } = signupForm;
        //If firstName is null, show the error message
        if (!signupForm.firstName) {
            errors['firstNameError'] = true;
            errors['firstNameMessage'] = "Please enter first name.";
        } else {
            errors['firstNameError'] = false;
            errors['firstNameMessage'] = "";
        }

        //If last name is null, show the error message
        if (!signupForm.lastName) {
            errors['lastNameError'] = true;
            errors['lastNameMessage'] = "Please enter last name.";
        } else {
            errors['lastNameError'] = false;
            errors['lastNameMessage'] = "";
        }

        //If password is null, show the error message
        if (!signupForm.password) {
            errors['passwordError'] = true;
            errors['passwordMessage'] = "Please enter password.";
        }
        //Password should contain minimum 8 letters if not show the error message.
        else if (signupForm.password.length < 8) {
            errors['passwordError'] = true;
            errors['passwordMessage'] = "Password should contain minimum 8 letters.";
        }
        else {
            errors['passwordError'] = false;
            errors['passwordMessage'] = "";
        }

        //If confirm password is null, show the error message
        if (!signupForm.confirmPassword) {
            errors['confirmPasswordError'] = true;
            errors['confirmPasswordMessage'] = "Please enter confirm password.";
        }
        //Confirm should contain minimum 8 letters if not show the error message.
        else if (signupForm.confirmPassword.length < 8) {
            errors['confirmPasswordError'] = true;
            errors['confirmPasswordMessage'] = "Confirm Password should contain minimum 8 letters.";
        }
        else {
            errors['confirmPasswordError'] = false;
            errors['confirmPasswordMessage'] = "";
        }

        //Password and confirm password should be same
        if(signupForm.password && signupForm.confirmPassword && signupForm.password.length >=8 && signupForm.confirmPassword.length >=8) {
            if(signupForm.password !== signupForm.confirmPassword) {
                errors['passwordError'] = true;
                errors['passwordMessage'] = "Password and confirm password should be same.";
            }
        }

        setSignupForm({ ...signupForm, errors: errors })
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
        if(file && file.name) {
            console.log(file)
            console.log(URL.createObjectURL(file))
            setSignupForm({...signupForm, profilePic: file, profilePicUrl: URL.createObjectURL(file)})
        }
        console.log(file)
    }

    const handleRemoveProfile = () => {
        setSignupForm({...signupForm, profilePic: '', profilePicUrl: ''})
    }

    const handleUpload = () => {
        document.getElementById("profile-pic").click();
    }

    return (
        <React.Fragment>
            <form>

                <div className="row">
                    <div className="col-6">
                        <label>First Name</label>
                        <input type="text" name="firstName" className={signupForm.errors.firstNameError ? "borderRed" : ""} placeholder="Enter first name" value={signupForm.firstName} onChange={handleInputChange} />
                        {signupForm.errors.firstNameError && <div className="fntRed">{signupForm.errors.firstNameMessage}</div>}
                    </div>
                    <div className="col-6">
                        <label>Last Name</label>
                        <input type="text" name="lastName" className={signupForm.errors.lastNameError ? "borderRed" : ""} placeholder="Enter last name" onChange={handleInputChange} />
                        {signupForm.errors.lastNameError && <div className="fntRed">{signupForm.errors.lastNameMessage}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label>Password</label>
                        <input type="password" name="password" className={signupForm.errors.passwordError ? "borderRed" : ""} placeholder="Enter password" onChange={handleInputChange} />
                        {signupForm.errors.passwordError && <div className="fntRed">{signupForm.errors.passwordMessage}</div>}
                    </div>
                    <div className="col-6">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" className={signupForm.errors.confirmPasswordError ? "borderRed" : ""} placeholder="Enter confirm password" onChange={handleInputChange} />
                        {signupForm.errors.confirmPasswordError && <div className="fntRed">{signupForm.errors.confirmPasswordMessage}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Enter email" onChange={handleInputChange} />
                    </div>
                    <div className="col-6">
                        <label>Phone number</label>
                        <input type="text" name="phoneNumber" placeholder="Enter phone number" onKeyPress={allowOnlyNumbers} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label>Select Country</label>
                        <select name="country" onChange={handleInputChange}>
                            <option value="">Select country</option>
                            <option value="India">India</option>
                            <option value="US">US</option>
                            <option value="UK">UK</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label>Gender</label>
                        <div onChange={handleInputChange}>
                            <input type="radio" name="gender" value="Male" />Male
                            <input type="radio" name="gender" value="FeMale" />FeMale
                            <input type="radio" name="gender" value="other" />Other
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <label>Upload Image label:</label>

                        {
                            signupForm.profilePicUrl ?
                            <div>
                                <img src={signupForm.profilePicUrl} height="50" />
                                <div onClick={handleUpload}>Upload new image</div>
                                <button onClick={handleRemoveProfile}>Remove</button>
                            </div>
                            :
                            <div onClick={handleUpload}>Upload new image</div>
                        }
                        <input type="file" hidden name="profilePic" id="profile-pic" onChange={handleFileChange}/>
                    </div>
                    <div className="col-6">
                        <input type="checkbox" name="termsAndConditions" checked={signupForm.termsAndConditions} onChange={handleCBoxChange} />
                        <label>Terms and conditions</label>
                    </div>
                </div>

                <div>
                    <button onClick={signupFn}>SignUp</button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default Signup;