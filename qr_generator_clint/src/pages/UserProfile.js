import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchUser,updateProfile, fetchResetPassword } from "../api";
import { useAuth } from "../hooks";
import styles from "../styles/userProfile.module.css"
import { useToasts } from "react-toast-notifications";

const UserProfile = () => {
    const {userId} = useParams();
    const auth = useAuth()
    const [data, setData] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState("");
    const logoRef= useRef(null);
    const [resetPasswordToggle,setResetPasswordToggle ] = useState(false);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const { addToast } = useToasts();

    // referesh data start
    useEffect( () => {
        getUserData();
    },[])

    const getUserData = async() =>{
        try {
            // console.log("started get user")
            setLoading(true);
            const response = await fetchUser(userId?userId:auth.user.id);
            if(response.data.status){
                // console.log("getUserData:",response.data.data);
                setData(response.data.data);
                setName(response.data.data.name);
                setEmail(response.data.data.email)
                setImage(response.data.data.avatar?response.data.data.avatar:"")
                // console.log(auth);
            }
        } catch (error) {
            // console.log("getUserData:",error)
                            
                addToast(error, {
                    appearance: 'error',
                });

        }
        setLoading(false);
        // console.log("ended get user")
    }
//  referesh data end
//  logo handle start
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
        //   console.log("render error:: ",error)
        
                addToast(error, {
                    appearance: 'error',
                });
        }
      };
// logo handle end
// Save profile Change Start
    const handleProfileChange = async() => {
        setLoading(true);
        try {
            const response = await updateProfile(userId?userId:auth.user.id,name, image);
            // console.log("profile response:::",response)
            if(response.data.status){
                // console.log("status")
                
                    addToast(response.data.message, {
                        appearance: 'success',
                    });
                    const path = `/dynamicqr/${userId?userId:auth.user.id}`
                    window.location.reload(); 
                }else{
                addToast(response.data.message, {
                    appearance: 'error',
                });

            }
        } catch (error) {
                                
                    addToast(error, {
                        appearance: 'error',
                    });
        }
        
        setEdit(false);
        
       
        setLoading(false);
    }
// Save profile change end
// handle reset password start
const handleResetPassword = async() => {
    try {
        if(!oldPassword || !newPassword || !confirmPassword){
            // console.log("Enter old and new Password");
            
                addToast("Enter old and new Password", {
                    appearance: 'error',
                });
        }else if(newPassword !== confirmPassword){
            // console.log("pasword did'nt match")
            
                addToast("pasword did not match", {
                    appearance: 'error',
                });
        }else{
            // console.log("Reset Password::", oldPassword,"::",newPassword,"::",confirmPassword);
            const response = await fetchResetPassword(userId?userId:auth.user.id,oldPassword, newPassword);
            // console.log("fetchResetPassword::", response)
                if(response.data.status){
                    addToast(response.data.message, {
                        appearance: 'success',
                    });
                }else{
                    addToast(response.data.message, {
                        appearance: 'error',
                    });

                }

        }   
    } catch (error) {
        
                addToast(error, {
                    appearance: 'error',
                });
    }
    setResetPasswordToggle(false)
}
// handle reset password end
    
    return (
        <div className={styles.backGround}>
        <div className={styles.outerContainer}>
        
                <img src={image} className={styles.avatar} onClick={edit?handleLogoChange:()=>{}} />
                <input 
                        type="file"
                        ref={logoRef}
                        accept="image/*"
                        onChange={handleSetLogoChange}
                        style={{ display: "none" }}
                    />
                    <div className={styles.contentContainer}>
                                {!edit?(
                                <div className={styles.miniContainer}>
                                    <label>Name :</label>
                                    <div >{name}</div>
                                </div>
                            ):(
                                <div className={styles.miniContainer}>
                                    <label>Name :</label>
                                    <input defaultValue={name} className={styles.inputcss} onChange={(e)=> {setName(e.target.value)}} placeholder="Enter your name"/>
                                </div>
                            )}
                            
                                <div className={styles.miniContainer}>
                                    <label>Email :</label>
                                    <div>{email}</div>
                                </div>
                    </div>
                
                    {!edit?(
                        <button onClick={()=>setEdit(true)}>Edit</button>
                    ):(
                        <>
                        {!loading?(
                            <button onClick={handleProfileChange}>Save</button>
                        ):(
                            <button>Saving</button>
                        )}
                        </>
                    )}
            
        </div>
{/* ---------------Reset Password----------------- */}
                    <div  className={styles.outerContainer}>
                        {!resetPasswordToggle?(
                            <button onClick={()=>setResetPasswordToggle(true)}>Reset Password</button>
                        ):(
                            <>
                            <div className={styles.contentContainer}>
                                <div  className={styles.miniContainer}> 
                                    <label htmlFor="oldPassword">Old Password</label>
                                    <input id="oldPassword" className={styles.inputcss} onChange={(e)=>setOldPassword(e.target.value)}/>
                                </div>
                                <div  className={styles.miniContainer}> 
                                    <label htmlFor="Password">New Password</label>
                                    <input id="Password" className={styles.inputcss} onChange={(e)=> setNewPassword(e.target.value)}/>
                                </div>
                                <div  className={styles.miniContainer}> 
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input id="confirmPassword" className={styles.inputcss} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                                </div>
                            </div>
                            <button onClick={handleResetPassword}>Reset</button>
                            </>
                        )}
                    </div>
        </div>
    )
}

export default UserProfile;