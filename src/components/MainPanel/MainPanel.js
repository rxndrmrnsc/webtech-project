import { useEffect, useState } from "react"
import './MainPanel.css';
import RTEditor from '../RTEditor/RTEditor';
import MyEditor from '../RTEditor/MyEditor';
import ThirdEditor from '../RTEditor/ThirdEditor';
import FTEditor from '../RTEditor/FTEditor';

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
        </div>
    )
}

export default MainPanel