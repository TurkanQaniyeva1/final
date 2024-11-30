import './foot.css';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <div className="secial-icons">
                <a href="#"><i className=""><FaFacebookF /></i></a>
                <a href="#"><i className=""><FaTwitter /></i></a>
                <a href=""><i className=""><FaYoutube /></i></a>
            </div>
            <div className="foot-center">
                <div className="footer-links">
                    <div className="resources">
                        <h3>Resources</h3>
                        <div className="columns">
                            <ul className="first-column">
                                <li><a href="#">Support-A-Creator</a></li>
                                <li><a href="#">Distribute on Epic Games</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Company</a></li>
                            </ul>
                            <ul className="second-column">
                                <li><a href="#">Fan Art Policy</a></li>
                                <li><a href="#">UX Research</a></li>
                                <li><a href="#">Store EULA</a></li>
                            </ul>
                            <ul className="third-column">
                                <li><a href="#">Online Services</a></li>
                                <li><a href="#">Community Rules</a></li>
                                <li><a href="#">Epic Newsroom</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="resources">
                        <h3>Made By Epic Games</h3>
                        <div className="columns">
                            <ul className="first-column">
                                <li><a href="#">Battle Breakers</a></li>
                                <li><a href="#">Fortnite</a></li>
                                <li><a href="#">Infinity Blade</a></li>
                            </ul>
                            <ul className="second-column">
                                <li><a href="#">Robo Recall</a></li>
                                <li><a href="#">Shadow Complex</a></li>
                                <li><a href="#">Unreal Tournament</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="foot-copyright">
                <div className="copyright-content">
                    <p>© 2024, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere. Other brands or product names are the trademarks of their respective owners.</p>
                </div>
                <div className="copyright-content">
                    <p>Our websites may contain links to other sites and resources provided by third parties. These links are provided for your convenience only. Epic Games has no control over the contents of those sites or resources, and accepts no responsibility for them or for any loss or damage that may arise from your use of them.</p>
                </div>
            </div>

            <div className="legal">
                <ul className="legal-links">
                    <li><a href="">Teams of Service</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Store Refund Policy</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer