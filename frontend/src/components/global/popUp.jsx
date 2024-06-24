// import React from "react";

const Popup = props => {
    window.onclick = function(e) {
        e.preventDefault();
        if(e.target === document.getElementById("overlay")){
            props.handleClose();
        }
}

    return (
        <div id="overlay" className="fixed left-0 top-0 bg-black/50 w-screen h-screen" >
            <div className="relative mt-36 p-4 h-fit w-[30%] mx-auto bg-white border-2 border-solid border-[#999] rounded-xl">
                {props.content}
            </div>
        </div>
    );
}

export { Popup };