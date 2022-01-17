import { useEffect, useState } from "react"
import './MainPanel.css';
import RTEditor from '../RTEditor/RTEditor';
import MyEditor from '../RTEditor/MyEditor';
import ThirdEditor from '../RTEditor/ThirdEditor';
import FTEditor from '../RTEditor/FTEditor';
import { Dialog } from "@mui/material";
import { Button } from "@material-ui/core";

function MainPanel(props){
    const [section, setSection] = useState()
    const { currentSection } = props
    useEffect(()=>{
        setSection(currentSection)
    })

    return(
        <div className="panel-wrapper">
            <h1>{section}</h1>
            <RTEditor />
            {/* <MyEditor /> */}
            {/* <ThirdEditor /> */}
            {/* <FTEditor /> */}
        <div className="dropleft" style={{position:'absolute', 
                  top:'0', 
                  right:'0'}}>
        <Button
          variant="contained" 
          className="btn btn-secondary dropdown-toggle" 
          type="button" 
          id="dropdownMenu2" 
          data-toggle="dropdown" 
          aria-haspopup="true" 
          aria-expanded="false"
          style={{color:'#EDF5E1', 
                  fontFamily: "'Poppins', sans-serif", 
                  backgroundColor:'#fa7c97', 
                  margin:'5px'}}
        >
          Options
        </Button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button className="dropdown-item" type="button">Delete note</button>
          <button className="dropdown-item" type="button">Send via E-mail</button>
        </div>
      </div>
        </div>
    )
}

export default MainPanel