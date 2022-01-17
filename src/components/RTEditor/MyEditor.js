import React, { useState, useCallback } from "react"
import { Editor, EditorState, RichUtils } from "draft-js"

function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)

      return "handled"
    }
    return "not-handled"
  })

  const _onBoldClick = useCallback(() => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
  })
  return (
    <React.Fragment>
          <button onClick={_onBoldClick}>Bold</button>
            <Editor editorState={editorState} handleKeyCommand={handleKeyCommand} onChange={setEditorState} />
    </React.Fragment>
  )
}

export default MyEditor