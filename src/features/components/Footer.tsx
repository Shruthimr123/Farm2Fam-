import React from 'react'
import '../../styles/Footer.css'
import { Link } from 'react-router-dom'
function Footer() {
  return (
   
<footer>
<div className='footer'>
  <div className='footer-section'>
     <div className='one'>
        <h3>Farm2Fam</h3>
       <Link to="/about">About Us</Link>
        <a href='/'>In News</a>
        <a href='/'>Privacy Policy</a>
        <a href='/'>Terms and Conditions</a>

     </div>
     <div className='two'>
        <h3>Help</h3>
        <a href='/'>FAQs</a>
       <Link to="/contact">Contact Us</Link>
        <a href='/'>Vendor Connect</a>
     </div>
     <div className='three'>
     <h3>Farm2Fam</h3>
      <div className='download'>
      <a href='https://play.google.com'><img className='playstore' src='playstore-icon.png' alt="playstore"></img></a>
      <a href='https://www.apple.com'><img className='appstore' src='appstore-icon.png' alt='appstore'></img></a>
      </div>
    <div className='socialmedia'>
     <a href='https://facebook.com'><i className="fab fa-facebook"></i></a>
     <a href='https://twitter.com'><i className="fab fa-twitter"></i></a>
     <a href='https://instagram.com'><i className="fab fa-instagram"></i></a>
     <a href='https://pinterest.com'><i className="fab fa-pinterest"></i></a>
     </div>
     </div>
     
     </div>
     <p>&copy; 2025 Farm2Fam. All rights reserved.</p>
     </div>
    </footer>

   
  )
}

export default Footer