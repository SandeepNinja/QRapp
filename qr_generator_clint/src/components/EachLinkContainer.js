import stylesContainer from "../styles/signup.module.css";
import styles from "../styles/Directory.module.css"
import {deleteLink} from "../api"
import {useState, useRef} from "react";
import {linkUpdate} from "../api"
import { useToasts } from "react-toast-notifications";

const EachLinkContainer = (data) => {

    const eachLink = data.data;
    const [editOn, setEditOn] = useState(false);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState("");
    const logoRef= useRef(null);
    const { addToast } = useToasts();
   const getDirectoryDetails = data.getDirectoryDetails;
   
// ----------------------start-------------------------------
    const handleLinkDelete = async(link_id) => {
                try{
                    const response = await deleteLink(link_id);
                    // console.log("response",response);
                    if(response.data.status){
                          addToast(response.data.message, {
                            appearance: 'success',
                          });
                        getDirectoryDetails()
                    }
                }catch(error){
                    addToast(error, {
                      appearance: 'error',
                    });
                }
      }
      // -----------------End---------------------
      const handleClickEditButtton= ()=>{
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
          console.log("render error:: ",error)
        }
      };
      const handleLinkUpdate = async() =>{
        if(!name & !link & !image){
            // console.log("no changes made",name,link,image);
            addToast("no changes made", {
              appearance: 'error',
            });
        }else{
            // console.log("change made")
            try{
                  const response = await linkUpdate(eachLink._id,name?name:eachLink.name, link?link:eachLink.link,image?image:eachLink.linkLogo);
                  // console.log("linkUpdate response:",response.data);
                  if(response.data.status){      
                        addToast(response.data.message, {
                          appearance: 'success',
                        });
                      getDirectoryDetails();
                      handleClickEditButtton();
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
            
        }
      }
    return(
            <div className={styles.directoryContainer} key={`directory-link-${eachLink._id}`}>
                {/* {console.log("eachLink::",eachLink)} */}
                <div className={styles.leftDirectoryContainer}>
                {!editOn?(
                    <>
                    <img src={eachLink.linkLogo} className={styles.listLogo} />
                    <div style={{textAlign:"left"}}>
                       <div className={styles.directoryName}>{eachLink.name}</div>
                       <div className={styles.eackDirectoryLink}>{eachLink.link}</div>
                    </div>
                    </>
                ):(
                    <>
                    <img src={image?image:eachLink.linkLogo} className={styles.createLinkContainerImg} onClick={handleLogoChange} />
                    <input 
                        type="file"
                        ref={logoRef}
                        accept="image/*"
                        onChange={handleSetLogoChange}
                        style={{ display: "none" }}
                        />
                        <div style={{display: "flex",paddingLeft:"10px",flexDirection:"column",width:"-webkit-fill-available"}}>
                    <textarea defaultValue={name?name:eachLink.name} className={styles.input}  placeholder='Enter link name' onChange={(e)=> setName(e.target.value)}/>
                    <textarea defaultValue={link?link:eachLink.link} className={styles.input} placeholder='Enter link' onChange={(e)=> setLink(e.target.value)}/>
                        </div>
                    </>
                )
                }
                          </div>
                    <div className={styles.rightDirectoryContainer}>
                        {editOn?(
                            <img src='https://www.svgrepo.com/show/446364/tick.svg' className={styles.EditButton} onClick={handleLinkUpdate} />
                        ):(
                            <img src='https://www.svgrepo.com/show/473945/edit.svg' className={styles.EditButton} onClick={handleClickEditButtton}/>
                        )}
                         
                         
                         <img src='https://www.svgrepo.com/show/21045/delete-button.svg' className={styles.deleteButton} onClick={()=>{handleLinkDelete(eachLink._id)}}/>
                    </div>
               
              </div>
    )
}

export default EachLinkContainer;

