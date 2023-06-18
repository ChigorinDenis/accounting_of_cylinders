
import React, {useState, createRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react'
import Main from './components/Main';
import { Container, Ref} from 'semantic-ui-react';
import Modal from './components/Modal';
import Expertise from './components/Expertise';
import ExpertiseControl from './components/ExpertiseControl';
import Employee from './components/Employee';
import Equipment from './components/Equipment';
import Header from './components/Header';
import { setIsOpen } from './state/expertiseReducer';
import ChartSurvival from './components/ChartSurvival';
import Statistic from './components/Statistic';
// import { Button } from'semantic-ui-react';


export default function App() {
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const activeExpertise = useSelector((state) => state.expertise); 
  const contextRef = createRef();

  return (
    <>
      <Ref innerRef={contextRef}>
        <div>
          <Header contextRef={contextRef}/>
          <div style={{width: '95%', margin: '0 auto'}}>
            {activeTab === 'сосуды' && <Main />}
            {activeTab === 'персонал' && <Employee />}
            {activeTab === 'оборудование' && <Equipment />}
            {activeTab === 'статистика' && <Statistic />}
            {activeTab === 'экспертиза' && <Expertise />}
          </div>
        </div>
        
        </Ref>
      <Modal open={activeExpertise.isOpen} close={setIsOpen}><ExpertiseControl/></Modal>
    </>
  )
}