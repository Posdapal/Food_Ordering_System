import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='image' src={assets.redfood} alt="" />
                <p>This system streamlines food ordering, tracking, and management, with your admin focusing on the admin’s perspective for monitoring and updating orders.</p>
                <div className="footer-social-icons">
                    <a href='https://web.facebook.com/'>
                    <img src={assets.facebook_icon} alt="" />
                    </a>
                    {/* <img src={assets.facebook_icon} alt="" /> */}
                    {/* <img src={assets.twitter_icon} alt="" /> */}
                    <a href='https://x.com/?lang=en'>
                    <img src={assets.twitter_icon} alt="" />
                    </a>
                    <a href='https://www.linkedin.com/'>
                    <img src={assets.linkedin_icon} alt="" />
                    </a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Order</li>
                <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+855 011227702</li>
                    <li>contact@food.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright © 2025 - 2026 Food®. All rights reserved.</p>
    </div>
  )
}

export default Footer