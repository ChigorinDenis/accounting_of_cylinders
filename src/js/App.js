
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react'
import Main from './components/Main';
import Modal from './components/Modal';
import Expertise from './components/Expertise';
import ExpertiseControl from './components/ExpertiseControl';
import ExpertiseCreate from './components/ExpertiseCreate';
import Employee from './components/Employee';
import Equipment from './components/Equipment';
import Header from './components/Header';
import EditableTable from './components/EditableTable';
import VisualExpertise from './components/VisualExpertise';

export default function App() {
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const tableHeader = [
    { id: 1, title: 'Дата произодства', name: 'prod_date', width: 1, editable: false },
    { id: 2, title: 'Название', name: 'name', width: 2, editable: true }
  ];

  const data = [
    {id:1, prod_date: 2022, name: "Гигроскоп"},
    {id:2, prod_date: 2000, name: "Телескоп"},
  ]


  return (
    <>
      <Header />
      {activeTab === 'сосуды' && <Main />}
      {activeTab === 'персонал' && <Employee />}
      {activeTab === 'оборудование' && <Equipment />}
      {activeTab === 'экспертиза' && <Modal><ExpertiseCreate/></Modal>}
      {/* {activeTab === 'экспертиза' && <VisualExpertise />} */}
    </>
  )
}