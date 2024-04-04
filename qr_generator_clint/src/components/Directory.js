import PropTypes from 'prop-types';
import stylesContainer from "../styles/signup.module.css";
import styles from "../styles/Directory.module.css"
import {useState, useRef, useEffect} from "react";
import {useAuth} from "../hooks";
import {addLinkInDirectory, fetchDirectory,deleteLink,deleteDirectory} from "../api"
import EachLinkContainer from "./EachLinkContainer"

const Directory = (data) => {
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
            const DirectoryDetails= await fetchDirectory(data.data._id); 
            setDirectory(DirectoryDetails.data.data);
            // console.log("fetchDirectory:",directory)

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

      const handleAddLinkSubmit = async() => {
        // console.log("handleAddLinkSubmit:: ",auth.user._id,data.data._id,name,link,image);
        const response = await addLinkInDirectory(auth.user._id,data.data._id,name,link,image);
        // console.log("response:",response);
        if(response.data.status){
            getDirectoryDetails();
            setName("");
            setLink("");
            setImage("")
        }
      }
    return (
        <div>
            <div className={stylesContainer.OuterContainer}>
            
            <button className={styles.closeButton} onClick={data.tab}>x</button>
            <div className={styles.headingContainer}>
                    <img src={data.data.logo} />
                    <div>{data.data.name}</div>
            </div>
            {/* list vidible here */}
            {directory?(
                <div className={styles.listContainer}>
                    {   directory.listOfLinks.map((eachLink)=>(
                    <EachLinkContainer data={eachLink} getDirectoryDetails={getDirectoryDetails}/>
                    ))}
                </div>
            ):""}
            </div>
                {/* add new list in current directory */}
                <div className={stylesContainer.OuterContainer}>
                <div className={styles.createLinkContainer}>
                    <img src={image?image:'https://www.svgrepo.com/show/530408/upload.svg'} className={styles.createLinkContainerImg} onClick={handleLogoChange} />
                    <input 
                        type="file"
                        ref={logoRef}
                        accept="image/*"
                        onChange={handleSetLogoChange}
                        style={{ display: "none" }}
                        />
                    <input value={name} className={styles.input} placeholder='Enter link name' onChange={(e)=> setName(e.target.value)}/>
                    <input value={link} className={styles.input} placeholder='Enter link' onChange={(e)=> setLink(e.target.value)}/>
                </div>
                <button className={styles.containerButton} onClick={handleAddLinkSubmit}> Add new Link</button>
            </div>
        </div>
    )
}



export default Directory;