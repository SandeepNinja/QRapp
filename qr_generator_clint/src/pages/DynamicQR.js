import {CreateNewDynamicPage, DefaultDynamicQrPage, ListOfMyQrs} from "../components";
import styles from "../styles/dynamicQR.module.css";
import {useState} from "react";

const DynamicQR= () => {
	const [page, setPage] = useState("DefaultDynamicQrPage");

	return(
		<div className={styles.dynamicQRBody} >
		{/* <button onClick={()=> {setPage("DefaultDynamicQrPage")}}>Default Page</button>
		<button onClick={()=> {setPage("CreateNewDynamicPage")}}>Create new Directory Page</button>
		<button onClick={()=> {setPage("ListOfMyQrs")}}>List of Directory Page</button>
		{page === "DefaultDynamicQrPage" && <DefaultDynamicQrPage />}
      	{page === "CreateNewDynamicPage" && <CreateNewDynamicPage />}
      	{page === "ListOfMyQrs" && <ListOfMyQrs />} */}
			<div className={styles.leftVerticleBar}>
				<div className={styles.btn} onClick={()=> {setPage("DefaultDynamicQrPage")}}> 
					<img src="https://www.svgrepo.com/show/474867/home.svg" />
					<div className={styles.onHoverVisible}>Default</div>
				</div>
				<div className={styles.btn} onClick={()=> {setPage("CreateNewDynamicPage")}}> 
					{/* <img src="https://www.svgrepo.com/show/509388/plus-circle.svg" /> */}
					<img src="https://www.svgrepo.com/show/499786/add-to.svg" />
					<div className={styles.onHoverVisible}>Create new Directory</div>
				</div>
				<div className={styles.btn} onClick={()=> {setPage("ListOfMyQrs")}}> 
					{/* <img src="https://www.svgrepo.com/show/532198/list-ul-alt.svg" /> */}
					<img src="https://www.svgrepo.com/show/489916/folder.svg" />
					<div className={styles.onHoverVisible}>List of Directory</div>
				</div>
			</div>
			<div className={styles.rightBody}>
					{page === "DefaultDynamicQrPage" && <DefaultDynamicQrPage />}
					{page === "CreateNewDynamicPage" && <CreateNewDynamicPage />}
					{page === "ListOfMyQrs" && <ListOfMyQrs />} 
			</div>
		</div>
	) 
}

export default DynamicQR;