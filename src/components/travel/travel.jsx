import React, { useEffect, useRef, useState } from "react";

import styles from "./travel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendar,
  faCamera,
  faPaperclip,
  faStar,
  faTimes,
  faEye,
  faAssistiveListeningSystems,
  faHandSpock,
  faTeethOpen,
  faAirFreshener,
  faExclamation,
  faComment,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const Travel = ({
  updateDiary,
  openPopup,
  detailId,
  userId,
  readDetailData,
  fileUploader
}) => {
  const formRef = useRef();
  const fileUploadRef = useRef();
  const [checkedSlide, setCheckedSlide] = useState(0);
  const [travelDtl, setTravelDtl] = useState({});
  const [clickEdit, setClickEdit] = useState(false);

  useEffect(() => {
    const stopSync = readDetailData(userId, detailId, (data) => {
      setTravelDtl(data);
    });
    return () => stopSync();
  }, [readDetailData, detailId, userId]);


  const setImageStatus = (imgFile) =>{

    let fileInfo = imgFile;
    for(let i = 0; i<fileInfo.length; i++){
      if(fileInfo[i].flag === "I"){
        //Flag 값이 I인 파일
        //Use : Y, Flag : S 세팅
        fileInfo[i].use = "Y";
        fileInfo[i].flag = "S";
      } else if(fileInfo[i].flag === "D"){
        //Flag 값이 D인 파일
        //Use : N
        fileInfo[i].use = "N";
      }
    }
    return fileInfo;
  }

  const cancelImageUpload = (imgFile) =>{
    let fileInfo = imgFile
    for(let i = 0; i<fileInfo.length; i++){
      if(fileInfo[i].flag === "I"){
        fileInfo[i].use = "N";
        fileInfo[i].flag = "D";
      } else if(fileInfo[i].flag === "D"){
        if(fileInfo[i].use  ==="Y"){
          fileInfo[i].flag = "S";
        }else{
          fileInfo[i].flag = "D";
        }
      }
    }
    const diary = {
      ...travelDtl,
      imgInfo: fileInfo,
    }

    updateDiary(diary);
  }

  const deleteImage = (fileUrl) =>{
    let fileInfo = travelDtl.imgInfo;
    for(let i = 0; i<fileInfo.length; i++){
      if(fileInfo[i].url === fileUrl){
        fileInfo[i].flag = "D";
      }
    }
    const diary = {
      ...travelDtl,
      imgInfo: fileInfo,
    }
    updateDiary(diary);
  }

  const closeWindow = () => {
    if(clickEdit) {
      cancelImageUpload(travelDtl.imgInfo);
    }
    openPopup(false);
  }

  const setEditBtn = () => {
    if (clickEdit) {
      return;
    }
    setClickEdit(true);
    formRef.current[0].value = travelDtl.title || "";
    formRef.current[1].value = travelDtl.location || "";
    formRef.current[2].value = travelDtl.startDate || "";
    formRef.current[3].value = travelDtl.endDate   || "";

    formRef.current[5].value = travelDtl.sight     || "";
    formRef.current[6].value = travelDtl.smell     || "";
    formRef.current[7].value = travelDtl.taste   || "";
    formRef.current[8].value = travelDtl.hearing     || "";
    formRef.current[9].value = travelDtl.touch    || "";
    formRef.current[10].value = travelDtl.comment ||"";


  };
  const fileChange = async() =>{

    if(!travelDtl.imgInfo){
      if(fileUploadRef.current.files.length>5){
        alert("You can select up to 5 files.");
        fileUploadRef.current.value = '';
        return false;
      }
    }else if(fileUploadRef.current.files.length + travelDtl.imgInfo.filter(item=> item.flag==="I"||item.flag==="S").length>5){
      alert("You can select up to 5 files.");
      fileUploadRef.current.value = '';
      return false;
    }

    // Use 값 : Y 사용, N 삭제
    // Flag 값 : I 추가, D 삭제, S 조회
    let fileInfo = travelDtl.imgInfo;
    for(const item of fileUploadRef.current.files){
      const uploadedImg = await fileUploader.upload(item);
      fileInfo = fileInfo.length?[...fileInfo, {"url": uploadedImg.secure_url, "name" : uploadedImg.original_filename, "flag" : "I"}]:[{"url": uploadedImg.secure_url, "name" : uploadedImg.original_filename, "flag" : "I"}];
    }

    const diary = {
      ...travelDtl,
      imgInfo: fileInfo,
    }
    updateDiary(diary);
    fileUploadRef.current.value = '';

    readDetailData(userId, detailId, (data) => {
      setTravelDtl(data);
    });

  }
  const saveData = async(e) => {
    e.preventDefault();

    if (!clickEdit) {
      alert("Please click this button after editing.");
      return;
    }

    let fileInfo = setImageStatus(travelDtl.imgInfo);

    const diary = {
      ...travelDtl,
      title:     e.target[0].value || "",
      location:  e.target[1].value || "",
      startDate: e.target[2].value || "",
      endDate:   e.target[3].value || "",
      sight:     e.target[5].value || "",
      smell:     e.target[6].value || "",
      hearing:   e.target[7].value || "",
      touch:     e.target[8].value || "",
      taste:     e.target[9].value || "",
      comment:   e.target[10].value || "",
      imgInfo: fileInfo,
    };

    updateDiary(diary);
    setClickEdit(false);

    readDetailData(userId, detailId, (data) => {
      setTravelDtl(data);
    });
  };
  const slideChange = (e) =>{
    setCheckedSlide(parseInt(e.target.value));

  }

   return (
    <>
      <header className={styles.header}>
        <FontAwesomeIcon
          icon={faTimes}
          size="lg"
          className={styles.close__icon}
          onClick={closeWindow}
        />
      </header>
      <section className={styles.section}>
        <div className={clickEdit ? styles.hide : styles.travel}>
          <div className={styles.textArea}>
            <div className={styles.title}>
              <FontAwesomeIcon icon={faStar} className={styles.title__icon} />
              <span>{travelDtl.title}</span>
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <span className={styles.text}> {travelDtl.location}</span>
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
              <span className={styles.text}>
                {travelDtl.startDate} ~ {travelDtl.endDate}
              </span>
            </div>
          </div>
          <div className={styles.photo}>
          {travelDtl.imgInfo ? (
              travelDtl.imgInfo.filter((item)=> item.use==="Y").map((item, idx) => <input type="radio" key={`slide${idx}`} name="slide" id={`slide${idx}`} value={idx} onChange={slideChange} checked={checkedSlide===idx}/>)
            ) : null}
            <ul>
            {travelDtl.imgInfo?.filter((item)=> item.use==="Y").length ? (
              travelDtl.imgInfo.filter((item)=> item.use==="Y").map((item, idx) => <li key={idx}><label htmlFor={`slide${idx!==0?idx-1:travelDtl.imgInfo.length-1}`} className={styles.leftBtn}><FontAwesomeIcon icon={faChevronLeft} /></label><img src={item.url} className={styles.img} alt="main" /><label htmlFor={`slide${idx!==travelDtl.imgInfo.length-1? idx+1 : 0}`} className={styles.rightBtn}><FontAwesomeIcon icon={faChevronRight} /></label></li>)
            ) : (
              <div className={styles.noImage}>
                <FontAwesomeIcon
                  icon={faExclamation}
                  className={styles.exclamation}
                />
                <div>
                  No Image <br /> Available
                </div>
              </div>
            )}
            </ul>

          </div>
          <div className={styles.sense}>
            {travelDtl.sight && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon icon={faEye} className={styles.icon} />
                  Sight
                </div>
                <span>{travelDtl.sight}</span>
              </div>
            )}
            {travelDtl.smell && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon
                    icon={faAirFreshener}
                    className={styles.icon}
                  />
                  Smell
                </div>
                <span>{travelDtl.smell}</span>
              </div>
            )}
            {travelDtl.taste && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon icon={faTeethOpen} className={styles.icon} />
                  Taste
                </div>
                <span>{travelDtl.taste}</span>
              </div>
            )}
            {travelDtl.hearing && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon
                    icon={faAssistiveListeningSystems}
                    className={styles.icon}
                  />
                  Hearing
                </div>
                <span>{travelDtl.hearing}</span>
              </div>
            )}
            {travelDtl.touch && (
              <div>
                <div className={styles.sense__name}>
                  <FontAwesomeIcon icon={faHandSpock} className={styles.icon} />
                  Touch
                </div>
                <span>{travelDtl.touch}</span>
              </div>
            )}
            {travelDtl.comment && (
              <div>
                <div className={styles.comment}>
                  <FontAwesomeIcon
                    icon={faComment}
                    className={styles.icon}
                    size="1x"
                  />
                  General Comment
                </div>
                <br />
                <div>{travelDtl.comment}</div>
              </div>
            )}

          </div>
          <button className={styles.button} onClick={setEditBtn}>
              Edit
            </button>
        </div>

        <form className={clickEdit ? styles.travel : styles.hide} onSubmit={saveData} ref={formRef} onKeyPress={e=> {if(e.key==='Enter'){e.preventDefault();}}} >
          <div className={styles.textArea}>
            <div className={styles.title}>
              <FontAwesomeIcon icon={faStar} className={styles.title__icon} />
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.schedule}>
              <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
              <input
                type="date"
                className={[styles.input, styles.date].join(" ")}
              />
              ~
              <input
                type="date"
                className={[styles.input, styles.date].join(" ")}
              />
            </div>
          </div>

          <div className={styles.sense}>
          <div className={styles.sense__name}>
              <FontAwesomeIcon icon={faCamera} className={styles.icon} />
              Photo
            </div>
            <input type="file" ref={fileUploadRef} className={styles.input} multiple="multiple" onChange={fileChange}/>
            {travelDtl.imgInfo && travelDtl.imgInfo.filter(item => item.flag==="S"||item.flag==="I").length ? (
              travelDtl.imgInfo.filter(item => item.flag==="S"||item.flag==="I").map((item, idx) =>
                <div key={idx} className={styles.uploaded} onClick={() => deleteImage(item.url)}>
                  <FontAwesomeIcon icon={faPaperclip} className={styles.paper_clip}/>
                  <span id={item.url}>{item.name}</span>
                  <FontAwesomeIcon icon={faTimes} className={styles.delete_img}/>
                </div>
              )
            ) :
              null
            }
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faEye} className={styles.icon} />
                Sight
              </div>
              <input type="text" className={styles.input} />
            </div>

            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon
                  icon={faAirFreshener}
                  className={styles.icon}
                />
                Smell
              </div>
              <input type="text" className={styles.input} />
            </div>
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faTeethOpen} className={styles.icon} />
                Taste
              </div>
              <input type="text" className={styles.input} />
            </div>
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon
                  icon={faAssistiveListeningSystems}
                  className={styles.icon}
                />
                Hearing
              </div>
              <input type="text" className={styles.input} />
            </div>
            <div>
              <div className={styles.sense__name}>
                <FontAwesomeIcon icon={faHandSpock} className={styles.icon} />
                Touch
              </div>
              <input type="text" className={styles.input} />
            </div>

            <div>
              <div className={styles.comment}>
                <FontAwesomeIcon
                  icon={faComment}
                  className={styles.icon}
                  size="1x"
                />
                General Comment
              </div>
              <br />
              <textarea className={styles.textarea}></textarea>
            </div>
          </div>
          <button className={styles.button}>
            Save
          </button>
        </form>
      </section>
    </>
  );
};

export default Travel;
