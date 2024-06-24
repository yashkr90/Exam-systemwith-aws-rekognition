import  { useEffect, useRef, useState } from 'react';
// import './LoginForm.css';
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { userData } from '../global/atom.js';
import { useAtom } from 'jotai';
import { jwtDecode } from 'jwt-decode';

const API_URL=import.meta.env.VITE_API_URL
const apiURL_dept = `${API_URL}/department`;
const apiURL_signin = `${API_URL}/v1/auth/signInPhase1`;
const LoginForm = () => {
    const [done, setDone] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [departmentError, setDepartmentError] = useState(false);
    const [department, setDepartment] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useAtom(userData);

    const navigateToCameraAuth = () => {
        navigate('/cameraauth');
    };

    const navigateToHome = () => {
        navigate('/exam_dashboard');
    }

    const handleChangeEmail = () => {
        if (document.getElementById("email").value == "")
            setEmailError(true);
        else
            setEmailError(false);
    }

    const handleChangePassword = () => {
        if (document.getElementById("password").value == "")
            setPasswordError(true);
        else
            setPasswordError(false);
    }

    const handleChangeDepartment = () => {
        if (document.getElementById("department").value == "")
            setDepartmentError(true);
        else
            setDepartmentError(false);
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken !== null) {
            const currentTime = Date.now() / 1000;
            const decodedToken = jwtDecode(jwtToken);
            if (decodedToken.exp > currentTime) {
                navigateToHome();
            } else {
                localStorage.removeItem('jwtToken');
            }
        }
        if (done == false) {
            axios.get(apiURL_dept).then((response) => {
                setDepartment(response.data);
            }).then((json) => setDone(true));
        }
    })

    const signIn = async (e) => {
        e.preventDefault();
        let signindata = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            department: document.getElementById("department").value,
        }
        axios.post(apiURL_signin, signindata).then(response => {
            console.log(response.data.content.data);
            setData(response.data.content.data);
            navigateToCameraAuth();
        }).catch(error => {
            console.log(error);
            alert(error.response.data.errors.message);
        })
    }

    return (
        <div className="m-0 p-0 bg-[#243C5A] h-screen w-screen flex items-center">
            <div className="w-full">
                <div className='wrapper w-3/4 max-w-md mx-auto backdrop-blur-xl border-solid border-black border-2 text-white rounded-xl p-10'>
                    <form action="" method="post">
                        <h1 className='text-4xl text-center'>Login</h1>
                        <div className="credential flex flex-wrap items-center justify-around p-15">
                            <div className="left-box w-3/4">
                                <div className="input-box relative w-full h-50 my-5">
                                    <input className='w-full h-full bg-transparent border-[#FFF]/.4 border-4 border-solid rounded-md text-sm text-white p-2 placeholder-shown:text-white' type="email" placeholder="Email" name="" id="email" onChange={handleChangeEmail} />
                                    <MdEmail className='icon absolute right-5 top-1/2 -translate-y-1/2 text-base' />
                                </div>
                                {emailError && <p className='text-red-500'>Please provide a email</p>}
                                <div className="input-box relative w-full h-50 my-5">
                                    <input className='w-full h-full bg-transparent border-[#FFF]/.4 border-4 border-solid rounded-md text-sm text-white p-2 placeholder-shown:text-white' type="password" placeholder="Password" name="" id="password" onChange={handleChangePassword} />
                                    <FaKey className='icon absolute right-5 top-1/2 -translate-y-1/2 text-base' />
                                </div>
                                {passwordError && <p className='text-red-500'>Please provide a password</p>}
                                <div className='input-box relative w-full h-50 my-5'>
                                    <select id="department" required name="department" className='w-full h-full bg-transparent border-[#FFF]/.4 border-4 border-solid rounded-md text-sm text-white p-2 placeholder-shown:text-white' onChange={handleChangeDepartment}>
                                        <option key="" value="" className='w-full h-full bg-transparent border-[#FFF]/.4 border-4 border-solid rounded-md text-sm text-black p-2 placeholder-shown:text-white'>Select Department</option>
                                        {department.map((item, index) => (
                                            <option key={item._id} value={item.DepartmentName} className="text-black">{item.DepartmentName}</option>
                                        ))}
                                    </select>
                                </div>
                                {departmentError && <p className='text-red-500'>Please provide a department</p>}
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button className='w-1/2 h-11 bg-white rounded-3xl cursor-pointer text-black font-bold' type="submit" onClick={signIn}>Login</button>
                        </div>
                        <div className="register-link text-sm text-center my-5">
                            <p>Don't have an account? <a className='text-white no-underline font-semibold hover:underline hover:font-bold' href="#">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default LoginForm;