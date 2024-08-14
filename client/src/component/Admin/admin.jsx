import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.scss";
import { useBanner } from "../../context/bannercontext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [btext, setAnchorText] = useState("");
  const [blink, setAnchorLink] = useState("");
  const { visible, setVisible } = useBanner();
  // console.log(visible)
  const [error,setError] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  


  const handleSubmitbutton=async()=>{
    console.log('clicked')
   
    if(typeof(title)!=='string' || title ==="" || typeof(description)!=='string' || description==="" || typeof(btext)!=='string' || btext==="" || typeof(blink)!=='string' || blink===""|| isNaN(days) || days>=5 || isNaN(hours) || hours>24|| isNaN(minutes) ||minutes>60 || seconds>60 || isNaN(seconds)){
      console.log('error');
      setError(true);
    }else{
      setError(false);
      try{
        let result = await fetch(process.env.REACT_APP_UPDATE_BANNER_DETAILS,{
          method:"POST",
          headers: {
            "content-type": "application/json"
         },
          body:JSON.stringify({title,description,btext,blink,days,hours,minutes,seconds})
        }
        )
        result = await result.json();
        if(result.status){
          navigate('/');
        console.log(result);
        }
        
      }catch(error){
        console.log(error)
      }
     
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <Link to="/">Home</Link>
          <h2>Admin Portal</h2>
          {
            error && <span  style={{color:'red'}}>Enter all fields correclty</span>
          }
        </div>

        <div className={styles.bannerEditingContainer}>
          <div className={styles.editingBlockLeft}>
            <div className={styles.topsection}>
              <h3>Edit Banner</h3>
              <button type="button" onClick={() => setVisible(!visible)}>
                {visible ? "Hide" : "Visible"}
              </button>

              <button type="button" onClick={handleSubmitbutton}>Update</button>
            </div>

            <div className={styles.bannercontext}>
              <div className={styles.leftTitleSection}>
                <div className={styles.titleContainer}>
                  <span>
                    <h5>Title</h5>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Banner Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>

                <div className={styles.DescriptionContainer}>
                  <span>
                    <h5>Description</h5>
                  </span>
                  <textarea
                    placeholder="Enter Banner Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  {/* <input type="text" placeholder="Enter Banner Description" /> */}
                </div>

                <div className={styles.counterContainer}>
                  <span>
                    <h5>Counter</h5>
                  </span>
                  <span className={styles.counterContent}>
                    <input
                      type="number"
                      max="5"
                      placeholder="Select Days"
                      onChange={(e)=>setDays(e.target.value)}
                      value={days}
                    />
                    <input
                      type="number"
                      max="24"
                      placeholder="Select Hours"
                      onChange={(e)=>setHours(e.target.value)}
                      value={hours}
                    />
                    <input
                      type="number"
                      max="60"
                      placeholder="Select Minutes"
                      onChange={(e)=>setMinutes(e.target.value)}
                      value={minutes}
                    />
                    <input
                      type="number"
                      max="60"
                      placeholder="Select Seconds"
                      onChange={(e)=>setSeconds(e.target.value)}
                      value={seconds}
                    />
                  </span>
                </div>

                <div className={styles.ButtonContainer}>
                  <span>
                    <h5>Button</h5>
                  </span>
                  <span className={styles.buttonContent}>
                    <input
                      type="text"
                      placeholder="Enter Button Text"
                      onChange={(e) => setAnchorText(e.target.value)}
                      value={btext}
                    />
                    <input
                      type="text"
                      className={styles.link}
                      placeholder="Enter your link"
                      onChange={(e) => setAnchorLink(e.target.value)}
                      value={blink}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bannerDisplayBlock}>
            <div className={styles.displaywrapper}>
              <div className={styles.topsection}>
                <h2>{!title ? "Banner Title" : title}</h2>
              </div>
              <div className={styles.description}>
                <p>
                  {!description
                    ? `Design a simple, clean one-page website that can optionally
                display a banner. The banner's visibility should be
                controllable. - Frontend Countdown Display**: **Implement a
                countdown timer on the banner, displayed as a reverse clock,
                that shows the remaining time before the banner disappears`
                    : description}
                </p>
              </div>
              <div className={styles.bottomsection}>
                <a href={blink} target="_blank">
                  {!btext ? "Click Here" : btext}
                </a>
                <div className={styles.counter}>
                  <span>
                    {days}Days {hours}Hours {minutes}Min {seconds}sec Left !
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
