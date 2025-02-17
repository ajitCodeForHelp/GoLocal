import React, { useState } from "react";
import Navbar from "./Navbar";
import Slider from "./Slider";

function MergeComponents({ getComponent }) {
    const [isSidebarHidden, setIsSidebarHidden] = useState(window.innerWidth <= 576);
   
    const toggleSidebar = () => {
        setIsSidebarHidden(!isSidebarHidden);
    };

    return (
        <>
            <Slider isSidebarHidden={isSidebarHidden}/>
            <section id="content">
                <Navbar toggleSidebar={toggleSidebar} />
                {getComponent}
            </section>
        </>
    )
}
export default MergeComponents;