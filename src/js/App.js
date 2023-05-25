
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react'
import Main from './components/Main';
import Expertise from './components/Expertise';
import ExpertiseControl from './components/ExpertiseControl';
import Employee from './components/Employee';
import Equipment from './components/Equipment';
import Header from './components/Header';

export default function App() {
  const activeTab = useSelector((state) => state.tabs.activeTab);
  return (
    <>
      <Header />
      {activeTab === 'сосуды' && <Main />}
      {activeTab === 'персонал' && <Employee />}
      {activeTab === 'оборудование' && <Equipment />}
      {activeTab === 'экспертиза' && <ExpertiseControl/>}
    </>
  )
}