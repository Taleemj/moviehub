import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import sunPink from '../../imgs/sun-pink.png'
import sunBlue from '../../imgs/sun-blue.png'

const Header = ({ changeTheme, toggleMenu, pink, setMenu, menu }) => {

    return (
        <div>
            <div className='container'>
                <h2>MOVIEHUB <span onClick={toggleMenu}><MenuIcon /></span></h2>
                <div className='header-links'>
                    <ul>
                        <li><Link to='/'>Trending</Link></li>
                        <li><Link to='/movies'>Movies</Link></li>
                        <li><Link to='/tv'>Tv Series</Link></li>
                    </ul>
                    <div className='search-container'>
                        <p>Search</p>
                        <Link to='/search'>
                            <div className='search'><SearchIcon /></div>
                        </Link>
                        <img onClick={changeTheme} src={pink ? sunBlue : sunPink} alt='sun-icon' />
                    </div>
                </div>
                {menu && (
                    <div className='header-links2'>
                        <ul onClick={() => setMenu(false)}>
                            <li><Link to='/'>Trending</Link></li>
                            <li><Link to='/movies'>Movies</Link></li>
                            <li><Link to='/tv'>Tv Series</Link></li>
                        </ul>
                        <div className='search-container'>
                            <Link to='/search'>
                                <div className='search'><SearchIcon /></div>
                            </Link>
                            <img onClick={changeTheme} src={pink ? sunBlue : sunPink} alt='sun-icon' />
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Header