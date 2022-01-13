import { useEffect, useState } from "react"
import './MainPanel.css';

function MainPanel(props){
    const [section, setSection] = useState()
    const { currentSection } = props
    useEffect(()=>{
        setSection(currentSection)
    })

    return(
        <div className="panel-wrapper">
            <h1>{section}</h1>
        </div>
    )
}

export default MainPanel