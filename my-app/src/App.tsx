import default_photo from "./components/album.png"
import React, { useEffect, useState } from 'react';
import './css/App.css';
import Footer from './components/Footer';
import Accordion from './components/Accordion';
import Content from './components/Content';
import { Routes,Route } from 'react-router-dom';
import Search from './components/Search';
import Welcome from './components/Welcome';
import Media from './components/Media';
import { IFooter, ISection } from './components/interfaces';
import {footerContext,commonContext, sectionContext} from './Context'
import { API } from "./components/API/API";
import NotFound from "./components/NotFound";

function App() {
  const [footerStyle,setFooterStyle]=useState<IFooter>({firstTitle:'Наведите на трэк',secondTitle:'Нажмите Play',photo:default_photo,liked:false})
  const[curTrack,setCurtrack]=useState<HTMLImageElement>(new Image())
  const [mediaSections,setMediaSections]=useState<ISection[]>([])
  const [myAPI]=useState(new API())
  useEffect(()=>{
    let savedFooterStyle=localStorage.getItem('footerStyle')
    if (savedFooterStyle!=null){
      setFooterStyle(JSON.parse(savedFooterStyle))
    }
  },[])
  function handlePlaylistItemsResponce(this:XMLHttpRequest){
    console.log(this.responseText)
  }
  useEffect(()=>{
    myAPI.fetchApi('GET','https://api.spotify.com/v1/me/playlists',handlePlaylistResponce,null)
    function handlePlaylistResponce(this:XMLHttpRequest){
        if (this.status===200){
          let newList:ISection[]
          const data=JSON.parse(this.responseText)
          newList=[]
          for (let i=0; i<data.items.length;i++){
            let elem=data.items[i]
            let newElem:ISection
            myAPI.fetchApi('GET',elem.href+'/tracks',handlePlaylistItemsResponce,myAPI.playlistQuery())
            newElem={
              text:elem.name,
              musicBoxList:[],
              id:elem.id
            }
            newList.push(newElem)
          }
          setMediaSections(newList)
    }
  }
},[myAPI])
  return (
    <div className='app'>
      <Accordion/>
      <footerContext.Provider value={setFooterStyle}>
        <commonContext.Provider value={[curTrack,setCurtrack]}>
          <sectionContext.Provider value={mediaSections}>
            <Routes>
              <Route path='/' element={<Welcome/>}/>
              <Route path="/callback" element={<Content/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/media" element={<Media/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </sectionContext.Provider>
        </commonContext.Provider>
      </footerContext.Provider>
      <Footer footerStyle={footerStyle}/>
    </div>
  );
}

export default App;
