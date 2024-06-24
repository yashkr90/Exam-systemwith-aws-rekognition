import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { PiExam } from "react-icons/pi";

function Navbar(props) {
    const [navItems, setNavItems] = useState([
        { name: 'Classes', href: './exam_dashboard' ,icon: FaBook},
        { name: 'Results', href: './' ,icon: PiExam},
        { name: 'Feedback', href: './tables.html' ,icon: MdOutlineFeedback}
    ]);

    return (
        <div>
            <div className={`fixed inset-y-0 left-0 p-2 w-[${props.width}] z-50 font-serif`}>
                <div className="bg-[#2A2A2A] border-solid border-gray-700 h-full overflow-y-auto w-full rounded-2xl items-center">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-white my-3 text-xl">Dashboard</span>
                    </div>
                    <hr className="border-t-2 border-white w-full" />
                    <div className="mt-4 flex flex-col">
                        <ul className="mx-6">
                            {navItems.map((item, index) => (
                                <li key={index} className="my-4 h-8">
                                    <a href={item.href} className="text-white text-lg">
                                        <item.icon className="mr-2 inline h-full w-[20%]" />
                                        <span className="">{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>)
}

export default Navbar;