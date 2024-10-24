import "./Navbar.css"; 
import myLogo from "../assets/myLogo.jpg"; 
import instagramIcon from "../assets/insta.png"; 

function Navbar() {

  return (
    <nav className="navbar">
      <div className="logos">
      <div className="navbar-logo">
        <img src={myLogo} alt="Lets Code" className="logo" />
      </div>
      <div className="hamburger" onClick={() => window.open("https://www.instagram.com/code_helowrld/profilecard/?igsh=bnp1ZXppc3pyaHhn", "_blank")}>
        <img src={instagramIcon} alt="Menu" className="hamburger-logo" />
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
