import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import useToken from './useToken';
import Register from './components/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';
import MainPanel from './components/MainPanel/MainPanel';
import sectionStore from './SectionStore'
import noteStore from './NoteStore'
import Menu from './components/Menu/Menu'

function App() {
  const [currentSection, setCurrentSection] = useState('no section selected')
  const { token, setToken } = useToken();
  const [sections, setSections] = useState([])
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    sectionStore.getSections()
    sectionStore.emitter.addListener('GET_SECTIONS_SUCCESS', () => {
        sectionStore.data = sectionStore.data.map(({owner, createdAt, updatedAt, ...rest}) => {return rest;})
        // console.log(isSorted ? true : false)
        if(isSorted){
          sectionStore.data.sort((x, y) => (x.title > y.title) ? 1 : -1);
          setIsSorted(false);
        }
        setSections(sectionStore.data)
    })
  }, [])

  const addSection = (section) => {
    noteStore.addNote(section);
    noteStore.getNotes();
    console.log(noteStore.data);
    sectionStore.addSection(section);
  }

  const sectionChange = (section)=>{
    setCurrentSection(section)
    sessionStorage.setItem('currentSection', section)
  }

  const sortSection = (items, isAscending) => {
    items.sort(function(a, b){
      a = a.title.toLowerCase()
      b = b.title.toLowerCase()
      if(isAscending){
        return (a > b) ? 1 : -1;
      } else {
        return (a > b) ? -1 : 1;
      }
    })
    //console.log(items);
    if(isSorted){
      setIsSorted(false);
    }
    else{
      setIsSorted(true);
    }
  }

  const items = [
    { name: 'home', label: 'Home' },
    {
      name: 'billing',
      label: 'Billing',
      items: [
        { name: 'statements', label: 'Statements' },
        { name: 'reports', label: 'Reports' },
      ],
    },
    {
      name: 'settings',
      label: 'Settings',
      items: [
        { name: 'profile', label: 'Profile' },
        { name: 'insurance', label: 'Insurance' },
        {
          name: 'notifications',
          label: 'Notifications',
          items: [
            { name: 'email', label: 'Email' },
            {
              name: 'desktop',
              label: 'Desktop',
              items: [
                { name: 'schedule', label: 'Schedule' },
                { name: 'frequency', label: 'Frequency' },
              ],
            },
            { name: 'sms', label: 'SMS' },
          ],
        },
      ],
    },
  ]

  if(!token) {
    return (
    <div>
      <Login setToken={setToken} />
      <Register setToken={setToken} />
    </div>
    );
  }

  return (
    // <div className="wrapper">
    //   <h1>Application</h1>
    //   <BrowserRouter>
    //     <Switch>
    //       <Route path="/dashboard">
    //         <Dashboard />
    //       </Route>
    //       <Route path="/preferences">
    //         <Preferences />
    //       </Route>
    //     </Switch>
    //   </BrowserRouter>
    // </div>
    <div>
      <Sidebar items={sections} onAdd={addSection} onSectionClick={sectionChange} onSort={sortSection}/>
      <MainPanel currentSection={currentSection} />
      <Menu />
    </div>
  );
}

export default App;
