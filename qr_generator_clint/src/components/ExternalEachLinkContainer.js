import styles from "../styles/Directory.module.css"
import { Link } from "react-router-dom";

const ExternalEachLinkContainer = (data) => {
    console.log(":::::::::",data);
    const eachLink = data.data;
    if (!eachLink || !eachLink.link) {
        console.log(null)
        return null; // or display a placeholder or loading message
    }
    return(
        <div className={styles.directoryContainer} key={`external-directory-link-${eachLink._id}`}>
                {/* {console.log("eachLink::",eachLink)} */}

            <a href={eachLink.link.startsWith('http://')||eachLink.link.startsWith('https://')?eachLink.link:"#"} target={eachLink.link.startsWith('http://')||eachLink.link.startsWith('https://')?("_blank"):""} key={`externkjal-directory-link-${eachLink._id}`} className={styles.aTag}>
                <div className={styles.leftDirectoryContainer}>
                     
                     <img src={eachLink.linkLogo} className={styles.listLogo} />
                     <div style={{textAlign:"left"}}>
                        <div className={styles.eachDirectoryName}>{eachLink.name}</div>
                        <div className={styles.eackDirectoryLink}>{eachLink.link}</div>
                     </div>
                </div>   
            </a>
                
             
              </div>
    )
}

export default ExternalEachLinkContainer;