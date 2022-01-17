import ContextMenu from "../ContextMenu/ContextMenu";
import { useEffect, useState } from "react";
import './Menu.css';

const Menu = () => {
  const { anchorPoint, show, selectedItem } = ContextMenu();
  const [changed, setChanged] = useState(false);
  var newName = "";

  const clickContextMenu = (event) => {
    event.stopPropagation();
  }

  async function deleteSection(event) {

    console.log(event.target.value)
    const response = await fetch(`http://localhost:8080/sections/${selectedItem}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setChanged(true);
  }

  const getNewName = (event) => {
    newName = event.target.value;
  }

  async function updateSection() {
    if (newName !== "") {
      const response = await fetch(`http://localhost:8080/sections/${selectedItem}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: (`{"title": "${newName}"}`)
      })
      // console.log(response)
    }
  }

  if (show) {
    return (
      <div onClick={clickContextMenu}>
        <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
          {/* <li onClick={deleteSection}>Delete</li> */}
          {/* <li onClick={updateSection}>Rename</li> */}
          {/* <hr /> */}
          <form>
            <button type="submit" className="btn btn-light" onClick={deleteSection} style={{ height: "15" }}>
              Delete
            </button>
          </form>

          <form className="formContainer">
            <label>Rename to:</label>
            <input type="text" className="newName" style={{ width: "80%", height: "15" }} onChange={getNewName} />
            <button type="submit" className="btn btn-success" style={{ width: "15%", height: "80%" }} onClick={updateSection}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              </svg>
            </button>

          </form>
        </ul>
      </div>


    );
  }
  return <></>;
};


export default Menu;