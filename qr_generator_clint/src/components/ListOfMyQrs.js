import stylesContainer from "../styles/signup.module.css";
import Directory from "./Directory";
import {useAuth} from "../hooks"
import styles from "../styles/listOfMyQrs.module.css"
import {useEffect, useState} from "react"
import {fetchUser} from "../api"
import DirectoryList from "./DirectoryList"
import QrOfDirectory from "./QrOfDirectory";

const ListOfMyQrs = () => {
  const auth = useAuth();
  const [openDirectory, setOpenDirectory] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [dataStore, setDataStore] = useState("");
  const [userDirectoryList, setUserDirectoryList] = useState("");
  
  // console.log("list qr ::", auth.user);

  useEffect(()=>{
    // console.log("ListOfMyQrs start")
    getUserDirectory();
    // console.log("ListOfMyQrs end")
  },[])
  
  const getUserDirectory = async() => {
      try {
        // console.log("getUserDirectory auth: ",auth.user)
        const DirectoryList = await fetchUser(auth.user._id?auth.user._id:auth.user.id);
        if(!DirectoryList){
          // console.log("DirectoryList not found")
        }
        // console.log("DirectoryList::",DirectoryList.data.data.listOfDynamicQRs)
        setUserDirectoryList(DirectoryList.data.data.listOfDynamicQRs)
      } catch (error) {
        console.log(error)
      }
  }
  
  const routeToDirectory = (data) => {
    setOpenDirectory(true);
    setDataStore(data);
    // console.log("routeToDirectory ::", data);
  }
  const routeToQR = (data) => {
    setOpenQR(true);
    setDataStore(data);
    // console.log("routeToDirectory ::", data);
  }

  const closeRouteToDirectory = () => {
    setOpenDirectory(false);
  }
  const closeRouteToQR = () => {
    setOpenQR(false);
  }


 
  
  return (
    <>
    {!openDirectory && !openQR?(
      <> 
        <div className={styles.OuterContainer}>
          <div className={styles.heading}>Directories</div>
        {userDirectoryList?(
          <div className={styles.listContainer}>
          {userDirectoryList.map((directory) => (
            <div> 
            <DirectoryList directory={directory} routeToDirectory={routeToDirectory} routeToQR={routeToQR}  getUserDirectory={getUserDirectory} key={`directoryslist-${directory._id}`}/>
            </div>
      ))}
          </div>
        ):(
          <div>Loading</div>
        )}          
    </div>
      </>
    ):""}
    
    {/* after click on any id */}
    {openDirectory?(
    <div>
       {/* {console.log("openDirectory",dataStore)} */}
       <Directory data={dataStore} tab={closeRouteToDirectory}/>
    </div>
   
    ):""}

    {/* After clik on QR id */}
    {openQR?(<>
      <QrOfDirectory data={dataStore} tab={closeRouteToQR}/>
    </>):(<></>)}
    </>
    
  )
};

// ListOfMyQrs.prototype = {
//   directory: PropTypes.array.isRequired,
// };

export default ListOfMyQrs;
