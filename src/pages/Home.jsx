import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Home() {
    const navigate = useNavigate();
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [userData,setUserData]=useState({})
    const baseUrl = "https://news-backend-sj97.onrender.com";

    useEffect(() => {
     const checkAuth = async () => {
    try {
        const url = `${baseUrl}/home`; // Store the URL in a variable for logging
        console.log(url);
        const res = await axios.get(url, {
            withCredentials: true,
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        
        if (res.status === 200) {
            console.log(res.data);
            setUserAuthenticated(true);
            fetchData();
        } else {
            console.error(`Error fetching: ${res.status}`);
            setUserAuthenticated(false);
            navigate("/signin");
        }
    } catch (err) {
        console.error(`Error: ${err.message}`);
        setUserAuthenticated(false);
        navigate("/signin");
    }
};

         const fetchData= async () => {
            try{
                //get the user profile from the backend
                const userProfile = await axios.get(baseUrl + "/profile", {withCredentials: true}); 
                setUserData(userProfile.data)
                console.log(userProfile.data)
                console.log(userData)
            }
            catch(err){
                console.error(err)
            }
         }

        checkAuth();
    }, [navigate]);

    return (
    <div>
             
                <Navbar 
                name={userData.username}
                id={userData.id} 

                />
              
                <div className="container" >
                  
                 <div className="homeDescription">
                  
                   <h4 >Explore the Latest News!</h4>
                  
                    <hr  />
                 
                    <p > <strong>Headlines Button:</strong> Click this to see the top trending news stories related to the subject you're interested in. These are the most popular and talked-about headlines right now!</p>

                    <p > <strong>Everything Button:</strong> If you want to dive deeper, click here to get all available news articles on that subject. This includes everything from recent reports to older stories, giving you a comprehensive view of what's happening.</p>

                    <p >Happy reading!</p> 
                   
                   <hr />
                  
                  </div> 
                    
                  <div className="homeButton">
                      
                       <Link className="btn btn-outline-info btn-lg " to="/headlines" role="button">Headlines</Link>
                       <Link className="btn btn-outline-info btn-lg " to="/everything" role="button">Everything</Link>
                  
                  </div>
                  
                </div>

                <Footer />
                     
     </div>
            );
}

export default Home;