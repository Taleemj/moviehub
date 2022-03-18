import React , { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Trending from './Pages/Trending/Trending'
import Movies from './Pages/Movies/Movies'
import Tv from './Pages/Tv/Tv'
import Search from './Pages/Search/Search'
import Footer from './components/Footer/Footer'

const App = () => {
  const [pink, setPink] = useState(false)
  const [pinkOn, setPinkOn] = useState(false)
  const [menu, setMenu] = useState(false)


  const toggleMenu = () => { 
      menu ? setMenu(false) : setMenu(true)
  }

  const changeTheme = () => {
      pink ? setPink(false) : setPink(true)
      pinkOn ? setPinkOn(false) : setPinkOn(true)
  }
  return (
    <div className={ pinkOn ?'pink':'App'}>
      <Header changeTheme={changeTheme} toggleMenu={toggleMenu} pink={pink} setMenu={setMenu} menu={menu}/>
        <Routes>
          <Route path='/' element={<Trending />} />
          <Route path='/movies' element={<Movies pinkOn={pinkOn} />} />
          <Route path='tv' element={<Tv pinkOn={pinkOn} />} />
          <Route path='/search' element={<Search pinkOn={pinkOn}/>} />
        </Routes>
      <Footer pinkOn={pinkOn} />
    </div>
  )
}

export default App