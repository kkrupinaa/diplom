import React from 'react';
import './css/App.css';
import Footer from './components/Footer';
import Accordion from './components/Accordion';
import Content from './components/Content';

function App() {
  return (
    <div className='app'>
      <Accordion/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
