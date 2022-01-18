import { React, useEffect, useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import sectionStore from '../../SectionStore'
import './Sidebar.css'
import { InputProps } from '@mui/material'

function SidebarItem({ title, items, depthStep = 10, depth = 0, ...rest }) {
  // const setCurrentSection = (title) =>{
  //   console.log('hi mom')
  //   sessionStorage.setItem('currentSection', title)
  // }

  return (
    <>
      <ListItem 
      button dense {...rest} >
        <ListItemText style={{ paddingLeft: depth * depthStep, color:'#EDF5E1'}}>
          <span id="title">{title}</span>
        </ListItemText>
      </ListItem>
      {Array.isArray(items) ? (
        <List disablePadding dense>
          {items.map((subItem) => (
            <SidebarItem
             
            key={subItem.title}
            depth={depth + 1}
            depthStep={depthStep}
            {...subItem}
            />
          ))}
        </List>
      ) : null}
    </>
  )
}

// function Sidebar({ items, depthStep, depth, onChange}) {
function Sidebar(props) {
  const { items, depthStep, depth, onAdd, onSectionClick, onSort } = props
  // console.log(onChange)
  // console.log(items)
  const [newtitle, setNewTitle] = useState('')

  const add = (evt) => {
    onAdd({
      newtitle
    })
    setNewTitle('')
  }

  const sort = (evt) => {
    onSort(items, true)
  }

  const sortDesc = (evt) => {
    onSort(items, false);
  }

  const setCurrentSection = (title) => {
    sessionStorage.setItem('currentSection', title)
  }

  return (
    <div className="sidebar">
      <div className="sidebarTools">
        <TextField 
          className="inputTitle" 
          variant='outlined'
          type='text'
          style={{margin:'5px', borderRadius:'5px', backgroundColor:'#ffffff34', color:'white'}}
          inputProps={{ maxLength: '23' }}
          value={newtitle} 
          onChange={(evt) => setNewTitle(evt.target.value)}>
        </TextField>

        <Button 
          type="button"
          className="btn" 
          variant="contained"
          style={{color:'#EDF5E1', fontFamily: "'Poppins', sans-serif", backgroundColor:'#05386B', margin:'5px'}}
          sx={{margin:'5px', outline: 'none'}}
          onClick={add}>
          Add new note
        </Button>
      
        <div className="dropdown">
          <Button
            variant="contained" 
            className="btn btn-secondary dropdown-toggle" 
            type="button" 
            id="dropdownMenu2" 
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="false"
            style={{color:'#EDF5E1', fontFamily: "'Poppins', sans-serif", backgroundColor:'#1ba098', margin:'5px'}}>
            Sort by...
          </Button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button" onClick={sort}>Name ascendingly</button>
            <button className="dropdown-item" type="button" onClick={sortDesc}>Name descendingly</button>
          </div>
        </div>
      </div>

      <List
        style={{backgroundColor:'#061a29'}}
        disablePadding dense>
          {items.map((sidebarItem, index) => (
            <SidebarItem
              // onClick={() => setCurrentSection(sidebarItem.title)}
              onClick={() => onSectionClick(sidebarItem.title)}
              key={`${sidebarItem.title}${index}`}
              depthStep={depthStep}
              depth={depth}
              {...sidebarItem}/>
          ))}
      </List>
    </div>
  )
}
export default Sidebar