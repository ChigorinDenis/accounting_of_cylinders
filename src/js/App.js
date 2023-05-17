
import React, {useState} from 'react';
import { Button } from 'semantic-ui-react'
import Main from './components/Main';
import Expertise from './components/Expertise';
import Employee from './components/Employee';
import Equipment from './components/Equipment';


export default function App() {
  const [books, setBooks] = useState([]);
  return (
    <>
      <ul>
        {books && books.map((book) => (<li key={book.id}>{book.title}</li>))}
      </ul>
      {/* <button onClick={() => {
        electron.notificationApi.sendNotification('My custom notification!');
      }}>Notify</button> */}
      <button onClick={async () => {
        const result = await electron.ipcRenderer.invoke('get-books');
        // if (result.success) {
          setBooks(result)
        // }
        
    //     electron.ipcRenderer.send('get-books');

    // // Обработка ответа на запрос
    //   electron.ipcRenderer.on('get-books-response', (event, data) => {
    //   if (data.success) {
    //     setBooks(data.books);
    //   } else {
    //     console.error('Ошибка при получении списка книг: ', data.error);
    //   }
    // });
      }}>Get</button>
      <Button content='Click Here' />
      <Main />
    </>
  )
}