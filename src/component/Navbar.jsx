
import React,{useEffect,useRef} from "react"
import { Logout } from "@mui/icons-material"
import axios from "axios";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { Link } from "react-router-dom";
function Navbar(props){
    const baseUrl= "https://news-backend-sj97.onrender.com"

   axios.get(baseUrl +"/home",{withCredentials: true})
         .then(res=>{
            console.log(res.data)
         })


    // for logout tooltip


    const buttonRef = useRef(null);
     useEffect(() => {
    // Initialize tooltip
     const tooltip = new window.bootstrap.Tooltip(buttonRef.current);
   // Cleanup
    return () => {
      tooltip.dispose();
    };
   }, []);



    return(
    <div className="container navbarSec" >
        <nav className="navbar bg-body-tertiary fixed-top navSec container">
            <div className="container-fluid">
                <Link to="/home" style={{textDecoration:"none",fontFamily:"Montserrat"}}>   <img className="navbar-brand" src="images/logo.png" alt="Logo" /> News Aggregator</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="offcanvas offcanvas-end "
                    tabindex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header offcanvas-nav">
                        <h6 className="offcanvas-title" id="offcanvasNavbarLabel"><AccountCircleRoundedIcon /> {props.name}</h6>
                        
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-header offcanvas-nav">
                        
                        <p className="offcanvas-title" id="offcanvasNavbarLabel"><FingerprintIcon /> {props.id}</p>
                       
                    </div>
                    <div className="offcanvas-body ">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 offcanvas-nav ">
                            <li className="nav-item">
                                <Link className="nav-link " role="button" to="/"><FirstPageIcon />First Page</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" role="button" to="/h-history"><HistoryIcon />History</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" role="button" to="/home"><HomeIcon />Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" role="button" to="/headlines"><ArticleIcon />Headlines</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" role="button" to="/everything"><ArticleIcon />Everything</Link>
                            </li>

                            <li className="nav-item">
                            <a className="nav-link "  ref={buttonRef} onClick={props.onLogout} role="button" href={`${baseUrl}/logout`} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="LogOut">
                             <Logout />Logout
                            </a>
                            </li>

                            </ul>
                           
                        </div>
                     </div>
                    </div>
                </nav>
    </div>
    )
}

export default Navbar