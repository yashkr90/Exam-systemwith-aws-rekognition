import Navbar from "../global/Navbar";
import { useEffect, useState } from "react";
import { Popup } from "../global/popUp";
import { useNavigate } from "react-router-dom";
import { userData } from '../global/atom.js';
import { useAtom } from 'jotai';
import { jwtDecode } from 'jwt-decode';

function ExamDashboard1() {
    const [openAddClass, setOpenAddClass] = useState(false);
    const [examItems, setExamItems] = useState([
        { name: 'AWS', trainer: 'Bharath' },
        { name: 'AWS', trainer: 'Bharath' },
        { name: 'AWS', trainer: 'Bharath' },
        { name: 'AWS', trainer: 'Bharath' },
        { name: 'AWS', trainer: 'Bharath' },
        { name: 'AWS', trainer: 'Bharath' },
    ]);
    const [userdata,setUserData] = useAtom(userData);

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/');
    };

    const toggleAddClass = () => {
        setOpenAddClass(!openAddClass);
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if(jwtToken){
            const currentTime = Date.now() / 1000;
            const decodedToken = jwtDecode(jwtToken);
            if (decodedToken.exp < currentTime){
                navigateToLogin();
            }
            setUserData({
                email: decodedToken.email,
            })
        }else{
            navigateToLogin();
        }
    }, [])

    return (
        <div>
            <Navbar width={"20vw"} />
            <div className="ml-[20vw] h-screen overflow-hidden font-serif relative">
                <div className="mt-12 mx-4 flex flex-row">
                    <div className="flex flex-row w-full h-20">
                        <p className="inline-block bg-transparent border-0 my-auto mx-8 text-2xl text-black">
                            Your Classes
                        </p>
                        <div className="group cursor-pointer flex my-auto mr-12 ml-auto justify-center">
                            <button className="menu-hover h-12 transition duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-200" onClick={toggleAddClass}>Add +</button>
                        </div>
                        <div>
                            {openAddClass && <Popup
                                handleClose={toggleAddClass}
                                content={
                                    <div>
                                        Hello
                                    </div>
                                }
                            />
                            }
                        </div>
                    </div>
                </div>
                <hr className="border-t-2 border-black w-[95%] mx-auto" />
                <div className="overflow-auto max-h-[80vh] mx-4">
                    <div className="m-4">
                        {examItems.map((item, index) => (
                            <a href="">
                                <div className="p-4 my-4 mx-2 inline-block rounded-xl border-solid border-black border-2 w-48 transition duration-300 ease-in-out hover:scale-110">
                                    <p className="text-2xl">{item.name}</p>
                                    <p className="text-sm">{item.trainer}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ExamDashboard1;