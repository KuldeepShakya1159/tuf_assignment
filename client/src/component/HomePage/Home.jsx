import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import { useBanner } from "../../context/bannercontext";

const Home = () => {
  const { visible } = useBanner();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [btntext,setBtnText] = useState('');
  const [btnLink,setBtnLink] = useState('');

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        let result = await fetch(process.env.REACT_APP_GET_BANNER_DETAILS);
        result = await result.json();
        if (result) {
          setTimeLeft({
            days: result.btime_days,
            hours: result.btime_hours,
            minutes: result.btime_minutes,
            seconds: result.btime_seconds,
          });
          setTitle(result.btitle);
          setDescription(result.bdescription);
          setBtnText(result.buttontext);
          setBtnLink(result.buttonlink);
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };
    fetchBannerData();
  }, []);

  useEffect(() => {
    const targetTime = new Date();
    targetTime.setDate(targetTime.getDate() + timeLeft.days);
    targetTime.setHours(targetTime.getHours() + timeLeft.hours);
    targetTime.setMinutes(targetTime.getMinutes() + timeLeft.minutes);
    targetTime.setSeconds(targetTime.getSeconds() + timeLeft.seconds);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]); // Include timeLeft as a dependency

  return (
    <div className={styles.home}>
      <div className={styles.navbar}>
        <h3>Home Page</h3>
        <h3>
          <Link to="/admin" className={styles.link}>
            Admin
          </Link>
        </h3>
      </div>

      <div className={styles.herosection}>
        <div className={styles.leftsection}>
          <h2>Hire Me</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            consequuntur reprehenderit necessitatibus cum porro eos debitis,
            perferendis saepe voluptatibus ad illo, aliquid, illum recusandae.
            Itaque unde numquam delectus reprehenderit veniam.
          </p>
        </div>

        <div className={styles.rightsection}>
          {visible && (
            <div className={styles.bannersection}>
              <div className={styles.heading}>
                <h3>{!title ? 'Banner Heading':title}</h3>
              </div>
              <div className={styles.description}>
                <p>
                  {!description ?`Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident ratione sequi quae dolorem unde optio, tenetur atque
                  animi aut. Saepe labore repellendus impedit est ratione minima
                  velit aliquam ducimus officiis.`:description}
                </p>
              </div>
              <div className={styles.bottomsection}>
                <div className={styles.button}>
                  <a
                    href={!btnLink?"#":btnLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {!btntext ? "Click Here":btntext}
                  </a>
                </div>
                <div className={styles.counter}>
                  {timeLeft.days} Days {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s Left!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
