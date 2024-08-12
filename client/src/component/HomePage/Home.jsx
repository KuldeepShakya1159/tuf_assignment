import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import { useBanner } from "../../context/bannercontext";

const Home = () => {
    const {visible} = useBanner();
    const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 1,
    seconds: 1,
  });

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
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
            { visible &&
                <div className={styles.bannersection}>
                <div className={styles.heading}>
                  <h3>Banner Heading</h3>
                </div>
                <div className={styles.description}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident ratione sequi quae dolorem unde optio, tenetur atque
                    animi aut. Saepe labore repellendus impedit est ratione minima
                    velit aliquam ducimus officiis.
                  </p>
                </div>
                <div className={styles.bottomsection}>
                  <div className={styles.button}>
                    <a
                      href="https://www.linkedin.com/in/kuldeep-shakya-b0b481253/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click Here
                    </a>
                  </div>
                  <div className={styles.counter}>
                    {timeLeft.days} Days {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s Left!
                  </div>
                </div>
              </div>
            }
        </div>
      </div>
    </div>
  );
};

export default Home;
