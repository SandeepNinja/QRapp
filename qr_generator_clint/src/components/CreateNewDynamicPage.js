import { useRef, useState } from "react";
import styles from "../styles/CreateNewDynamicPageStyle.module.css";
import { useAuth } from "../hooks";
import {createNewDirectory} from "../api"
import { useToasts } from "react-toast-notifications";

const CreateNewDynamicPage = () => {
  const logoRef= useRef(null);
  const [image, setImage] = useState("");
  const [directoryName, setDirectoryName] =  useState("");
  const [submitting,setSubmitting ] = useState(false);
  const auth = useAuth();
  const { addToast } = useToasts();

  const handleLogoChange = () => {
    logoRef.current.click();
  };

  const handleDirectoryNameChange = (e) => {
    setDirectoryName(e.target.value);
  }
  
  const handleSetLogoChange = (e) => {
    const file = e.target.files[0];
    // const urlImage = URL.createObjectURL(file);
    // console.log("image url:: ",urlImage)
    // setImage(urlImage);
    // -------base64 --------------
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =() => {
      // console.log("render onload:: ",reader.result);
      setImage(reader.result);
    }
    reader.onerror = error => {
      console.log("render error:: ",error)
    }
  };

  const handleDirectorySubmit = async() => {
    setSubmitting(true);
    try{

      // console.log("name: ",directoryName, " userId._id :",auth.user._id," userId.id :",auth.user.id, "image: ",image );
      const response = await createNewDirectory(auth.user._id?auth.user._id:auth.user.id, directoryName, image);
      // console.log("newDirectory response: ",response)
      setDirectoryName("");
      setImage("");
      if(response.data.status){
        addToast(response.data.message, {
          appearance: 'success',
        });
      }else{
        addToast(response.data.message, {
          appearance: 'error',
        });
      }
    }catch(error){
      addToast(error, {
        appearance: 'error',
      });
    }
    setSubmitting(false);
  }

  return (
    <>
    <div className={styles.createDynamicOuterContainer}>
      <div className={styles.containerHeading}>Create new directory</div>
       <div className={styles.containerContentForResult}>
         <label >{image && <img src={image} className={styles.logoImage} />}</label>
         <h1 className={styles.overFlowWrap}>{directoryName}</h1>
      </div>
    </div>
    {/* --------------------------------------------- */}
    <div className={styles.createDynamicOuterContainer}>
      <div className={styles.containerHeading}>Fill directory details</div>
      <div className={styles.containerOfAll}>

      <div className={styles.containerContent}>
         <label htmlFor="directoryName">Name</label>
         <input id="directoryName" type="text" className={styles.inputcss} value={directoryName} onChange={handleDirectoryNameChange}/>
      </div>
      <div className={styles.containerContent}>
         <label >Logo</label>
         <input 
          type="file"
          ref={logoRef}
          accept="image/*"
          onChange={handleSetLogoChange}
          style={{ display: "none" }}
         />
         {/* <div>{image && <img src={image} className={styles.logoImage} />}</div> */}
         <button className={styles.upload} onClick={handleLogoChange}>Upload</button>
      </div>
      </div>
         <button className={styles.containerButton} onClick={handleDirectorySubmit}>{submitting?"submitting":"Submit"}</button>
    </div>
    </>
  )
};

export default CreateNewDynamicPage;
