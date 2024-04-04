import {useState,useRef} from "react";
import QRCode from "react-qr-code";
import styles from "../styles/QrOfDIrectory.module.css";
import { toPng } from "html-to-image";

const QrOfDirectory = (data) => {
    const directory = data.data;
    const elementRef = useRef(null); //htmltoimage
    // console.log("QrOfDirectory::",data)
    // console.log("QrOfDirectory::",data.data)

     // htmlToImage function
  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

    return(
        <>
            <button onClick={data.tab} className={styles.closeButton}>X</button>
        <div className={styles.printContainer} ref={elementRef}>
            <img src={directory.logo} className={styles.logoImage} />
            <div className={styles.DirectoryName}>{directory.name}</div>
            <QRCode value={`http://localhost:3000/dynamicqr/directorydetails/${directory._id}`} className={styles.QRCodeImage} />
        </div>
        <button className={styles.downloadBtn} onClick={htmlToImageConvert}>Download Image</button>
        </>
    )
}

export default QrOfDirectory;