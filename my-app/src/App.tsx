import default_photo from "./components/album.png"
import React, { useEffect, useState } from 'react';
import './css/App.css';
import Footer from './components/Footer';
import Accordion from './components/Accordion';
import Content from './components/Content';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Welcome from './components/Welcome';
import Media from './components/Media';
import { IFooter, IMusic, ISection } from './components/interfaces';
import { FooterContext, CommonContext, SectionContext } from './Context'
import { API } from "./components/API/API";
import NotFound from "./components/NotFound";
import * as APIConst from "./components/API/consts"

function App() {
  const [footerStyle, setFooterStyle] = useState<IFooter>({ firstTitle: 'Наведите на трэк', secondTitle: 'Нажмите Play', photo: default_photo, liked: false })
  const [curTrack, setCurtrack] = useState<HTMLImageElement>(new Image())
  const [mediaSections, setMediaSections] = useState<ISection[]>([])
  const [curList, setCurList] = useState<IMusic[]>([])
  useEffect(() => {
    let savedFooterStyle = localStorage.getItem('footerStyle')
    if (savedFooterStyle != null) {
      setFooterStyle(JSON.parse(savedFooterStyle))
    }
  }, [])
  function handlePlaylistItemsResponce(this: XMLHttpRequest) {
    if (this.status === APIConst.HTTP_CODES.OK) {
      let newList: IMusic[] = []
      const data = JSON.parse(this.responseText)
      for (let i = 0; i < data.items.length; i++) {
        let elem = data.items[i]
        let newElem: IMusic = {
          photo: elem.track.album.images[1].url,
          footer_photo: elem.track.album.images[2].url,
          first_title: elem.track.name,
          second_title: elem.track.artists[0].name,
          id: elem.track.id
        }
        newList.push(newElem)
      }
      setCurList(newList)
    }
  }
  useEffect(() => {
    API.fetchApi('GET', 'https://api.spotify.com/v1/me/playlists', handlePlaylistResponce, null)
    function handlePlaylistResponce(this: XMLHttpRequest) {
      if (this.status === APIConst.HTTP_CODES.OK) {
        let newList: ISection[] = []
        const data = JSON.parse(this.responseText)
        for (let i = 0; i < data.items.length; i++) {
          let elem = data.items[i]
          API.fetchApi('GET', elem.href + '/tracks', handlePlaylistItemsResponce, API.playlistQuery())
          let newElem: ISection = {
            text: elem.name,
            musicBoxList: curList,
            id: elem.id
          }
          newList.push(newElem)
        }
        setMediaSections(newList)
      }
    }
  }, [curList])
  return (
    <div className='app'>
      <Accordion />
      <FooterContext.Provider value={setFooterStyle}>
        <CommonContext.Provider value={[curTrack, setCurtrack]}>
          <SectionContext.Provider value={mediaSections}>
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
      <Footer footerStyle={footerStyle} />
    </div>
  );
}

export default App;
