import React, { useState, useRef } from 'react'
import styles from './css modules/ChangeProfilePic.module.css'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useMutation , useQueryClient} from 'react-query'
import api from '../interceptors/axios.js'
import dataURLtoBlob from 'dataurl-to-blob'
import { SquareX } from 'lucide-react'
import {Riple} from "react-loading-indicators"
import chatVector from '../assets/chatVector.jpg'

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

function ChangeProfilePic({ onChangeProfilePicClose }) {
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState();

  const imageRef = useRef(null);

  const onImageInputHandler = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const onImageLoad = (e) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
      setError("Image must be at least 150 x 150 pixels.");
      setImage("");
      return;

    }
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent
      },
      ASPECT_RATIO,
      width,
      height
    );

    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }

  // CANVAS FOR GETTING URL OF CROPPED IMAGE 
  function setCanvasForImage(
    imageElm, //HtmlImageElement
    // canvas, //HtmlCanvasElement
    pixelCrop //pixelCrop
  ) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    const pixelRatio = window.devicePixelRatio;
    const scaleX = imageElm.naturalWidth / imageElm.width;
    const scaleY = imageElm.naturalHeight / imageElm.height;

    canvas.width = Math.floor(pixelCrop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(pixelCrop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothQuality = "high";
    ctx.save();

    const cropX = pixelCrop.x * scaleX;
    const cropY = pixelCrop.y * scaleY;

    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      imageElm,
      0,
      0,
      imageElm.naturalWidth,
      imageElm.naturalHeight,
      0,
      0,
      imageElm.naturalWidth,
      imageElm.naturalHeight
    );

    const dataUrl = canvas.toDataURL()
    ctx.restore();

    // console.log(dataURLtoBlob(dataUrl))
    return dataURLtoBlob(dataUrl);
  }

  const queryClient = useQueryClient();

  const profileImageMutation = useMutation({
    mutationFn: async (newData) => {
      return await api.post('/user/uploadProfileImage', newData)
    },
    onSuccess:(res) => {
      // console.log(res);
      onChangeProfilePicClose();

      queryClient.invalidateQueries('currUser');
    },
    onError: (err) => {
      console.log(err);
    }
  })

  const onChangeBtnClick = () => {
    const dataUrl = setCanvasForImage(
      imageRef.current,
      convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height)
    )

    const formData = new FormData();
    formData.append('profileImage', dataUrl)

    profileImageMutation.mutate(formData)

  }


  return (
    <div className={styles.changeProfilePic}>
      <p className={styles.changeProfilePicClose}><SquareX onClick={onChangeProfilePicClose} /></p>
      {profileImageMutation.isLoading && <div style={{textAlign:'center'}}><Riple  color="#ffffff" size="small" text="" textColor="#ffd7d7" /></div>}
      <div className={styles.changeProfilePicUploadBtnDiv}>
        <input type="file" accept="image/*" className={styles.changeProfilePicUploadBtn} onChange={onImageInputHandler} />
      </div>
      {image && <div className={styles.changeProfilePicArea}>
        <ReactCrop
          crop={crop}
          onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          circularCrop
          keepSelection
          aspect={ASPECT_RATIO}
          minWidth={MIN_DIMENSION}
        >
          <img ref={imageRef} src={image} alt="upload" onLoad={onImageLoad} />
        </ReactCrop>
      </div>}
      <div className={styles.changeProfilePicBtnDiv}>
        <button onClick={onChangeBtnClick} className={styles.changeProfilePicBtn}>Change</button>
      </div>
    </div>
  )
}

export default ChangeProfilePic