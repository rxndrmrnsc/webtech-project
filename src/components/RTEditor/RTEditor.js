import React from 'react';
import './RTEditor.css'
import noteStore from '../../NoteStore'
import {Editor, EditorState, getDefaultKeyBinding, RichUtils, convertToRaw, convertFromRaw,} from 'draft-js'
import '../../../node_modules/draft-js/dist/Draft.css';
import Button from '@mui/material/Button'

class RTEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {editorState: EditorState.createEmpty()};

      this.focus = () => this.refs.editor.focus();
      this.onChange = (editorState) =>{
        const raw = convertToRaw(editorState.getCurrentContent());
        this.saveEditorContent(raw);
        this.setState({editorState});
        // const rawStr = JSON.stringify(raw);
        // noteStore.saveNote(this.props.section, {
        //   content: rawStr
        // });
      } 

      this.handleKeyCommand = this._handleKeyCommand.bind(this);
      this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
      this.toggleBlockType = this._toggleBlockType.bind(this);
      this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
      this.saveToDb = this._saveToDb.bind(this)
    }

    saveEditorContent(data) {
      localStorage.setItem("editorData", JSON.stringify(data));
    }
  
    getSavedEditorData() {
      // noteStore.getNote(sessionStorage.getItem('currentSection'));
      noteStore.getNote(this.props.section);
      console.log(noteStore.data)
      // const savedData = localStorage.getItem("editorData");
      const savedData = noteStore.specificNote;
      console.log("saved data for " + this.props.section + ": " )
      console.log(savedData)
  
      return savedData ? JSON.parse(savedData.content) : null;
    }

    componentDidMount() {
      // Load editor data (raw js object) from local storage
      const rawEditorData = this.getSavedEditorData();
      console.log("ComponentDidMount: ")
      console.log(rawEditorData)
      if (rawEditorData !== null) {
        const contentState = convertFromRaw(rawEditorData);
        this.setState({
          editorState: EditorState.createWithContent(contentState),
        });
      } else{
        this.setState({
          editorState: EditorState.createEmpty(),
        })
      }
    }

    _handleKeyCommand(command, editorState) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }

    _mapKeyToEditorCommand(e) {
      if (e.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
          e,
          this.state.editorState,
          4, /* maxDepth */
        );
        if (newEditorState !== this.state.editorState) {
          this.onChange(newEditorState);
        }
        return;
      }
      return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }

    _toggleInlineStyle(inlineStyle) {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }

    renderContentAsRawJs() {
      const contentState = this.state.editorState.getCurrentContent();
      const raw = convertToRaw(contentState);
  
      return JSON.stringify(raw, null, 2);
    }

    _saveToDb(){
      const contentState = localStorage.getItem("editorData")
      // const raw = convertToRaw(contentState);
      // const rawStr = JSON.stringify(raw);
      noteStore.saveNote(this.props.section, {
        content: contentState
      });
      console.log("saved :" + contentState + " to: " + this.props.section)
    }

    render() {
      const {editorState} = this.state;
      // this.getSavedEditorData();

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      let className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }
      

      return (
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
            />
          </div>
          <Button onClick={this.saveToDb}>+</Button>
          <h4>Editor content as raw JS</h4>
          <pre id="rawJs">{this.renderContentAsRawJs()}</pre>
        </div>
      );
    }
  }

  // Custom overrides for "code" style.
  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

  class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }

      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }

  const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
  ];

  const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

  var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
  ];

  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

export default RTEditor