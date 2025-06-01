import '../../styles/Hero.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

function Hero() {
  const nameFromStore = useSelector((state: RootState) => state.auth.name);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (nameFromStore) {
      setUserName(nameFromStore);
    } else {
      // fallback if store empty (e.g. on reload)
      const storedName = sessionStorage.getItem('userName');
      setUserName(storedName);
    }
  }, [nameFromStore]);

  return (
    <div className='hero'>
      <div className='img'>
        <img
          src='https://th.bing.com/th/id/OIP.VmK0KEqjocx3Fxkg5xL0ZwHaEf?w=966&h=585&rs=1&pid=ImgDetMain'
          alt="product"
        />
      </div>
      <div className='content'>
        <h2>Welcome{userName ? `, ${userName}` : ""}!</h2><br />
        <h1><span>From Our Fields to Your Fork </span> – Fresh Produce for Every Family!</h1>
      </div>
    </div>
  )
}

export default Hero;
