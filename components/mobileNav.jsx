import { useState } from "react";
import AuthLinks from "./authlinks";
import Image from "next/image";



const MobileNav = ({ scrollToCardList,scrollToContact,scrollToAbout,scrollToHome }) => {

    const [showMenu, setShowMenu] = useState(false);
    const [imageRotation, setImageRotation] = useState(0);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setImageRotation(showMenu ? 0 : -90);
    };

    const menuItems = [
        <div key="home" className="menu-item" style={{paddingLeft:'22px'}} onClick={scrollToHome}>
            Home
        </div>,
        <div key="about" className="menu-item" style={{paddingLeft:'22px'}} onClick={scrollToAbout}>
            About
        </div>,
        <div key="blogs" className="menu-item" style={{paddingLeft:'23px'}} onClick={scrollToCardList}>
            Blogs
        </div>,
        <AuthLinks key="auth" className="menu-item" />,
        <div key="contact" className="menu-item" style={{paddingLeft:'18px'}} onClick={scrollToContact}>
            Contact
        </div>,
    ];

    return (

        <div className="fixed w-full bg-transparant z-50">
            <button onClick={toggleMenu}>
                <Image
                    src="/images/menu.png"
                    alt=""
                    width={40}
                    height={40}
                    style={{
                        transform: `rotate(${imageRotation}deg)`,
                        transition: "transform 0.3s ease", // Added transition property
                    }}
                />
            </button>
            {showMenu && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg flex flex-col gap-4" style={{paddingTop:'10px',paddingBottom:'10px',paddingRight:'13px'}}>
                    {menuItems.map((item, index) => (
                            <div key={index}>
                                {item}
                                
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    );
}
 
export default MobileNav;