import PropTypes from 'prop-types';
import stylesContainer from "../styles/signup.module.css";
import styles from "../styles/Directory.module.css"
import {useState, useRef, useEffect} from "react";
import { useParams } from 'react-router-dom';
import {useAuth} from "../hooks";
import {addLinkInDirectory, fetchDirectory,deleteLink,deleteDirectory} from "../api"
import ExternalEachLinkContainer from "./ExternalEachLinkContainer"

const ExternalDirectory = () => {
    const {dictoryId} = useParams();
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState("");
    const logoRef= useRef(null);
    const auth = useAuth();
    const [directory, setDirectory] = useState("");

    useEffect(()=> {
        getDirectoryDetails();
    },[])

    const getDirectoryDetails = async() =>{
        try{
            // console.log("data.data:",data.data);
            const DirectoryDetails= await fetchDirectory(dictoryId); 
            console.log("fetchDirectory:",DirectoryDetails)
            if(DirectoryDetails.data.status){
                setDirectory(DirectoryDetails.data.data);
            }

        }catch(error){
            console.log("error",error)
        }
        
    }

    const handleLogoChange = () => {
        logoRef.current.click();
      };
    
      const handleSetLogoChange = (e) => {
        const file = e.target.files[0];
        // -------base64 --------------
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload =() => {
        //   console.log("render onload:: ",reader.result);
          setImage(reader.result);
        }
        reader.onerror = error => {
          console.log("render error:: ",error)
        }
      };

     
    return (
        <div className={styles.leftDirectoryContainer}>
            <div className={stylesContainer.OuterContainer}>
            {directory?(
                <>
            <div className={styles.headingContainer}>
                    <img src={directory.logo} />
                    <div className={styles.directoryName}>{directory.name}</div>
            </div>
            {/* list vidible here */}
            
                <div className={styles.listContainer}>
                    {   directory.listOfLinks.map((eachLink)=>(
                    <ExternalEachLinkContainer data={eachLink}/>
                    ))}
                </div></>
            ):""}
            </div>
        </div>
    )
}



export default ExternalDirectory;