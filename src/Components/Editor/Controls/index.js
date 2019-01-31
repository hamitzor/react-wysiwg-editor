import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { railscasts } from 'react-syntax-highlighter/dist/styles/hljs';


class Controls extends Component {

  convertCode = () => {
    const codeString = window.getSelection().toString();
    const SyntaxHighlighterComponent = <SyntaxHighlighter showLineNumbers customStyle={{ maxWidth: 600, display: 'block', margin: 'auto' }} language='javascript' style={railscasts}>{codeString}</SyntaxHighlighter>
    const styledCodeHTML = ReactDOMServer.renderToStaticMarkup(SyntaxHighlighterComponent)
    document.execCommand('insertHTML', false, styledCodeHTML)
  }

  handleSelect = () => {

    const selection = window.getSelection()
    console.log(selection);
    const anchorNode = selection.anchorNode.nodeType === Node.TEXT_NODE ? selection.anchorNode.parentNode : selection.anchorNode
    const focusNode = selection.focusNode.nodeType === Node.TEXT_NODE ? selection.focusNode.parentNode : selection.focusNode

    console.log(anchorNode, focusNode)

    anchorNode.style.backgroundColor = 'green'
    focusNode.style.backgroundColor = 'red'

  }

  render() {
    return (
      <div>
        <button onClick={this.handleSelect}>SELECT!</button>
        <button onClick={this.convertCode}>CODE</button>
        <button onClick={() => { document.execCommand('backColor', false, 'yellow') }}>backColor</button>
        <button onClick={() => { document.execCommand('bold', false) }}>bold</button>
        <button onClick={() => { document.execCommand('createLink', false, '/link') }}>createLink</button>
        <button onClick={() => { document.execCommand('decreaseFontSize', false) }}>decreaseFontSize</button>
        <button onClick={() => { document.execCommand('fontName', false, 'Times New Roman') }}>fontName</button>
        <button onClick={() => { document.execCommand('fontSize', false, 1) }}>fontSize</button>
        <button onClick={() => { document.execCommand('foreColor', false, 'orange') }}>foreColor</button>
        <button onClick={() => { document.execCommand('formatBlock', false, '<h1>') }}>heading</button>
        <button onClick={() => { document.execCommand('hiliteColor', false, 'orange') }}>hiliteColor</button>
        <button onClick={() => { document.execCommand('indent', false, 'orange') }}>indent</button>
        <button onClick={() => { document.execCommand('insertHorizontalRule', false) }}>insertHorizontalRule</button>
        <button onClick={() => { document.execCommand('insertHTML', false, '&emsp;') }}>insertHTML</button>
        <button onClick={() => { document.execCommand('insertImage', false, 'http://images.math.cnrs.fr/IMG/png/section8-image.png') }}>insertImage</button>
        <button onClick={() => { document.execCommand('insertOrderedList', false) }}>insertOrderedList</button>
        <button onClick={() => { document.execCommand('insertUnorderedList', false) }}>insertUnorderedList</button>
        <button onClick={() => { document.execCommand('insertParagraph', false) }}>insertParagraph</button>
        <button onClick={() => { document.execCommand('insertText', false, ' INSERTED TEXT !!! ') }}>insertText</button>
        <button onClick={() => { document.execCommand('italic', false) }}>italic</button>
        <button onClick={() => { document.execCommand('justifyCenter', false) }}>justifyCenter</button>
        <button onClick={() => { document.execCommand('justifyFull', false) }}>justifyFull</button>
        <button onClick={() => { document.execCommand('justifyLeft', false) }}>justifyLeft</button>
        <button onClick={() => { document.execCommand('justifyRight', false) }}>justifyRight</button>
        <button onClick={() => { document.execCommand('outdent', false) }}>outdent</button>
        <button onClick={() => { document.execCommand('redo', false) }}>redo</button>
        <button onClick={() => { document.execCommand('removeFormat', false) }}>removeFormat</button>
        <button onClick={() => { document.execCommand('strikeThrough', false) }}>strikeThrough</button>
        <button onClick={() => { document.execCommand('subscript', false) }}>subscript</button>
        <button onClick={() => { document.execCommand('superscript', false) }}>superscript</button>
        <button onClick={() => { document.execCommand('underline', false) }}>underline</button>
        <button onClick={() => { document.execCommand('subscript', false) }}>subscript</button>
        <button onClick={() => { document.execCommand('undo', false) }}>undo</button>
        <button onClick={() => { document.execCommand('unlink', false) }}>unlink</button>
      </div>
    )
  }
}


export default Controls