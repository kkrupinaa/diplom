import default_photo from "./components/album.png"
import { useEffect, useState } from 'react';
import './css/App.css';
import Footer from './components/Footer';
import Accordion from './components/Accordion';
import Content from './components/Content';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Welcome from './components/Welcome';
import Media from './components/Media';
import { IFooter, ISection } from './components/interfaces';
import { FooterContext, CommonContext, SectionContext, TokenContext } from './Context'
import NotFound from "./components/NotFound";

function App() {
  const [footerStyle, setFooterStyle] = useState<IFooter>({ firstTitle: 'Наведите на трэк', secondTitle: 'Нажмите Play', photo: default_photo, liked: false })
  const [curTrack, setCurtrack] = useState<HTMLImageElement>(new Image())
  const [mediaSections, setMediaSections] = useState<ISection[]>([])
  const [token, setToken] = useState<string | null>('')
  useEffect(() => {
    const savedFooterStyle = localStorage.getItem('footerStyle')
    if (savedFooterStyle !== null) {
      setFooterStyle(JSON.parse(savedFooterStyle))
    }
  }, [])
  return (
    <div className='app'>
      <Accordion />
      <TokenContext.Provider value={[token, setToken]}>
        <FooterContext.Provider value={setFooterStyle}>
          <CommonContext.Provider value={[curTrack, setCurtrack]}>
            <SectionContext.Provider value={[mediaSections, setMediaSections]}>
              <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path="/callback" element={<Content />} />
                <Route path="/search" element={<Search />} />
                <Route path="/media" element={<Media />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SectionContext.Provider>
          </CommonContext.Provider>
        </FooterContext.Provider>
      </TokenContext.Provider>
      <Footer footerStyle={footerStyle} />
    </div>
  );
}

export default App;
