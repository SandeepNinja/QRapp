import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import styles from "../styles/staticQrCode.module.css";
import { toPng } from "html-to-image";

function StaticQR() {
  const logoRef = useRef(null);
  const [image, setImage] = useState("");
  const [textValue, setTextValue] = useState("");
  const [value, setValue] = useState("");
  const elementRef = useRef(null); //htmltoimage

  function handleChange(e) {
    setValue(e.target.value);
  }

  const handleLogoChange = () => {
    logoRef.current.click();
  };

  const handleSetLogoChange = (e) => {
    const file = e.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setImage(urlImage);
  };

  const handeTitleChange = (e) => {
    setTextValue(e.target.value);
  };

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

  return (
    <div className={styles.basicQRBage}>
      <div className={styles.basicQRLeft}>
        <div className={`${styles.logo} ${styles.miniContainer}`}>
          <label>Logo</label>
          <input
            type="file"
            ref={logoRef}
            onChange={handleSetLogoChange}
            style={{ display: "none" }}
          />
          <span onClick={handleLogoChange}>Upload</span>
        </div>
        <div className={`${styles.logo} ${styles.miniContainer}`}>
          <label>Title</label>
          <input type="text" value={textValue} onChange={handeTitleChange} />
        </div>
        <div className={`${styles.logo} ${styles.miniContainer}`}>
          <label>Text</label>
          <textarea type="text" onChange={handleChange} />
          <h4>Scanning the QR code will show this text.</h4>
        </div>
      </div>
      <div className={styles.basicQRRight}>
        <div
          id="printContainers"
          className={styles.printContainer}
          ref={elementRef}
        >
          <div>{image && <img src={image} className={styles.logoImage} />}</div>
          <div
            style={{
              fontSize: "bold",
              fontWeight: "700",
              textAlign: "center",
              margin: "10px",
            }}
          >
            {textValue}
          </div>
          <QRCode value={value} className={styles.QRCodeImage} />
        {/* {value && <h6 style={{ color: "gray" }}>{value}</h6>} */}
        </div>
        <button onClick={htmlToImageConvert}>Download Image</button>
      </div>
    </div>
  );
}

export default StaticQR;

