import React,{useState} from "react";
import {Link} from 'react-router-dom';
import styles from "./Admin.module.scss";
import { useBanner } from "../../context/bannercontext";


const Admin = () => {
  const[title,setTitle] = useState('');
  const[description,setDescription] = useState('');
  const[anchorText,setAnchorText] = useState('');
  const[anchorLink,setAnchorLink] = useState('');
  const { visible, setVisible } = useBanner();
  // console.log(visible)
  const[days,setDays] = useState(0);
  const[hours,setHours] = useState(0);
  const[minutes,setMinutes] = useState(0);
  const[seconds,setSeconds] = useState(0);

  

  



  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <Link to ='/'>Home</Link>
          <h2>Admin Portal</h2>
        </div>

        <div className={styles.bannerEditingContainer}>
          <div className={styles.editingBlockLeft}>
            <div className={styles.topsection}>
              <h3>Edit Banner</h3>
              <button type="button" onClick={() => setVisible(!visible)}>
              {visible ? 'Hide' : 'Visible'}

              </button>

              <button type="button">Update</button>
            </div>

            <div className={styles.bannercontext}>
              <div className={styles.leftTitleSection}>
                <div className={styles.titleContainer}>
                  <span>
                    <h5>Title</h5>
                  </span>
                  <input type="text" placeholder="Enter Banner Title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                </div>

                <div className={styles.DescriptionContainer}>
                  <span>
                    <h5>Description</h5>
                  </span>
                  <textarea placeholder="Enter Banner Description" onChange={(e)=>setDescription(e.target.value)} />
                  {/* <input type="text" placeholder="Enter Banner Description" /> */}
                </div>

                <div className={styles.counterContainer}>
                  <span>
                    <h5>Counter</h5>
                  </span>
                  <span className={styles.counterContent}>
                    <input type="number" max="5" placeholder="Select Days" />
                    <input type="number" max="24" placeholder="Select Hours" />
                    <input
                      type="number"
                      max="60"
                      placeholder="Select Minutes"
                    />
                    <input
                      type="number"
                      max="60"
                      placeholder="Select Seconds"
                    />
                  </span>
                </div>

                <div className={styles.ButtonContainer}>
                  <span>
                    <h5>Button</h5>
                  </span>
                  <span className={styles.buttonContent}>
                    <input type="text" placeholder="Enter Button Text"  onChange={(e)=>setAnchorText(e.target.value)}/>
                    <input
                      type="text"
                      className={styles.link}
                      placeholder="Enter your link"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bannerDisplayBlock}>
            <div className={styles.displaywrapper}>
            <div className={styles.topsection}>
              <h2>{!title ? 'Banner Title':title}</h2>
            </div>
            <div className={styles.description}>
              <p>
                {!description ? `Design a simple, clean one-page website that can optionally
                display a banner. The banner's visibility should be
                controllable. - Frontend Countdown Display**: **Implement a
                countdown timer on the banner, displayed as a reverse clock,
                that shows the remaining time before the banner disappears`:description}
              </p>
            </div>
            <div className={styles.bottomsection}>
              <a href={anchorLink}>{!anchorText ? "Click Here" : anchorText}</a>
              <div className={styles.counter}>
                <span>4Days 5Hours 12Min 30sec Left !</span>
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
