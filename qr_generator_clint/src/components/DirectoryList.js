import styles from "../styles/listOfMyQrs.module.css"
import{useState, useRef} from "react"
import {updateDirectory, deleteDirectory} from "../api"
import { useToasts } from "react-toast-notifications";
// import { response } from "express";

const DirectoryList = (data) =>{
    const directory = data.directory;
    const routeToDirectory = data.routeToDirectory;
    const getUserDirectory= data.getUserDirectory;
    const [editOn, setEditOn] = useState(false);
    const [image,setImage] = useState("");
    const logoRef= useRef(null);
    const [name, setName] = useState("");
    const { addToast } = useToasts();

    const handleEditButton = () => {
        setEditOn(!editOn);
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
          // console.log("render onload:: ",reader.result);
          setImage(reader.result);
        }
        reader.onerror = error => {
          // console.log("render error:: ",error)
          addToast(error, {
            appearance: 'error',
          });
        }
      };

      const handleDirectorySubmit = async() =>{
        if(!name && !image){
            // console.log("No change made in directory");
            addToast("No change made in directory", {
              appearance: 'error',
            });
        }else{
            // console.log("updateDirectory:", directory._id, name?name:directory.name, image?image:directory.logo);
            try{
              const response = await updateDirectory(directory._id, name?name:directory.name, image?image:directory.logo)
              // console.log("update directory response:",response);
              if(response.data.status){
                addToast(response.data.message, {
                  appearance: 'success',
                });
                  handleEditButton();
                  getUserDirectory();
              }
            }catch(error){
              addToast(error, {
                appearance: 'error',
              });
            }
            
        }
      }

      const handleDeleteDirectory = async() => {
        try {
          const response = await deleteDirectory(directory._id);
          // console.log("responses",response.data);
          if(response.data.status){
            addToast(response.data.message, {
              appearance: 'success',
            });
          }
          getUserDirectory();
        } catch (error) {
          console.log(error)
          addToast(error, {
            appearance: 'error',
          });
        }
      }

    return(
        <div className={styles.outerDirectoryContainer} >
                  <div className={styles.leftDirectoryContainer}>
                      {!editOn?(
                            <div className={styles.directoryContainer} onClick={()=> {routeToDirectory(directory)} }>
                                <img src={directory.logo} className={styles.listLogo} />
                                {/* {console.log("directory::::",directory)} */}
                                <div className={styles.directoryName}>{directory.name}</div>
                            </div>
                      ):(
                        <div className={styles.directoryContainer} >
                        <img src={image?image:directory.logo} className={styles.listLogo} onClick={handleLogoChange} />
                        <input 
                        type="file"
                        ref={logoRef}
                        accept="image/*"
                        onChange={handleSetLogoChange}
                        style={{ display: "none" }}
                    />
                        {/* {console.log("directory::::",directory)} */}
                        <textarea defaultValue={name?name:directory.name} className={styles.input} placeholder="Enter directory name" onChange={(e)=> setName(e.target.value)} />
                    </div>
                      )}
                  </div>
                  <div className={styles.rightDirectoryContainer}>
                        {/* <button className={styles.QRstyle} onClick={()=>{data.routeToQR(directory)}}>QR</button> */}
                        <img src='https://www.svgrepo.com/show/491890/qr-code.svg' className={styles.EditButton}onClick={()=>{data.routeToQR(directory)}} />
                        {editOn?(
                            <img src='https://www.svgrepo.com/show/446364/tick.svg' className={styles.EditButton} onClick={handleDirectorySubmit} />
                        ):(
                            <img src='https://www.svgrepo.com/show/473945/edit.svg' className={styles.EditButton} onClick={handleEditButton}/>
                        )}
                         
                         
                         <img src='https://www.svgrepo.com/show/21045/delete-button.svg' className={styles.deleteButton} onClick={handleDeleteDirectory} />
                    </div>
            </div>
    )
}

export default DirectoryList;