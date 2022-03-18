import './Footer.css'
import blueheart from '../../imgs/blue-heart.png'
import pinkheart from '../../imgs/pink-heart.png'

const Footer = ({pinkOn}) =>{
    return(
        <div>
            <div className="footer">
                <p>Copyright @MOVIEHUB 2022 all rights reserved</p>
                <p>made with <span><img src={pinkOn? pinkheart: blueheart} alt='heart' className='footer-icon' /></span> by Taleem</p>
            </div>
        </div>
    )
}
export default Footer