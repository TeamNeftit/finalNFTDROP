import './Home.css'
import { useState, useEffect } from 'react';
import { Info, Copy } from 'lucide-react';

function Home() {
  // Helper to call legacy globals safely
  const call = (fn) => () => {
    if (typeof window[fn] === 'function') {
      window[fn]();
    } else {
      console.warn(`Global function ${fn} is not available yet.`);
    }
  };

  const [rulesPopup, setRulesPopup] = useState(false);

    useEffect(() => {
  if (rulesPopup) {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // lock html as well
  } else {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  };
}, [rulesPopup]);

 return (
    <main className="home-main">

    <div className="logoContainer">
      <img src="./images/logo.png" alt="LOGO" />
    </div>

        <div className="strip">
          <img className="stripImage" src="./images/launchingSoon.gif" alt="launchingsoon" />
        </div>

    </main>
  )
}

export default Home;
