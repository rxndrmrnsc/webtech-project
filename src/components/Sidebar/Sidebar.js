import { React, useEffect, useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import sectionStore from '../../SectionStore'

function SidebarItem({ title, items, depthStep = 10, depth = 0, ...rest }) {
  // const setCurrentSection = (title) =>{
  //   console.log('hi mom')
  //   sessionStorage.setItem('currentSection', title)
  // }

  return (
    <>
      <ListItem button dense {...rest} >
        <ListItemText style={{ paddingLeft: depth * depthStep }}>
          <span id="itemTitle">{title}</span>
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
      <input type='text' value={newtitle} onChange={(evt) => setNewTitle(evt.target.value)}></input>
      <button onClick={add}>+</button>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort by...
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button className="dropdown-item" type="button" onClick={sort}>Name ascendingly</button>
          <button className="dropdown-item" type="button" onClick={sortDesc}>Name descendingly</button>
        </div>
      </div>
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <SidebarItem
            // onClick={() => setCurrentSection(sidebarItem.title)}
            onClick={() => onSectionClick(sidebarItem.title)}
            key={`${sidebarItem.title}${index}`}
            depthStep={depthStep}
            depth={depth}
            {...sidebarItem}
          />
        ))}
      </List>
    </div>
  )
}
export default Sidebar