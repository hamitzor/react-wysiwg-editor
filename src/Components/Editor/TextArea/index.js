import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Header1 from './Fragments/Header1'
import Paragraph from './Fragments/Paragraph'
import styleCreator from '../../../Engines/styleCreator'
import { styleIndices as code } from '../../../Engines/styleCode'
import crypto from 'crypto'

const styles = theme => ({
  textarea: {
    borderWidth: 1,
    borderStyle: 'solid',
    padding: '20px 20px',
    fontFamily: 'Roboto',
    margin: 0,
    display: 'block',
    backgroundColor: theme.textarea.backgroundColor,
    borderColor: theme.textarea.borderColor,
    resize: 'none',
    width: '100%',
    maxWidth: '900px',
    minHeight: theme.textarea.minHeight,
    '& *:first-child': {
      marginTop: 0
    },
    '&:focus': {
      outline: 'none'
    }
  }
})


const StyledSpan = props => {
  const text = props.text.slice(props.interval[0], props.interval[1] + 1)


  return (
    <span style={{ display: 'flex' }} data-block-key={props.blockKey} data-offset={props.interval[0]} >
      <span style={{ ...styleCreator(props.styleCombination), display: 'flex' }}>{text !== ' ' ? text : ''}</span>
    </span>
  )
}

class TextArea extends Component {
  state = {
    styleCombinations: [[], [], [], [], []],
    contentState: {
      entities: {
        0: { type: 'link', href: '#' }
      },
      blocks: {
        initial: {
          key: 'initial',
          type: 'Paragraph',
          text: '',
          characters: []
        }
      }
    }
  }

  renderFromState = () => {
    const { blocks } = this.state.contentState

    const blockElements = []

    for (let key in blocks) {
      const { type, text, characters } = blocks[key]

      const charactersLength = characters.length

      const spanList = []


      if (characters.length > 0) {
        let currentCombination = characters[0][0]
        let currentCombinationFirst = 0
        for (let i = 0; i < charactersLength; i++) {
          const combination = characters[i][0]
          if (combination !== currentCombination) {
            if (i + 1 !== charactersLength) {

              spanList.push(<StyledSpan blockKey={key} key={'' + i + currentCombination} text={text} styleCombination={this.state.styleCombinations[currentCombination]} interval={[currentCombinationFirst, i - 1]} />)
              currentCombination = combination
              currentCombinationFirst = i
            }
            else {

              spanList.push(<StyledSpan blockKey={key} key={'' + i + currentCombination} text={text} styleCombination={this.state.styleCombinations[currentCombination]} interval={[currentCombinationFirst, i - 1]} />)
              spanList.push(<StyledSpan blockKey={key} key={'' + i + combination} text={text} styleCombination={this.state.styleCombinations[combination]} interval={[i, i]} />)
            }
          }
          else if (i + 1 === charactersLength) {

            spanList.push(<StyledSpan blockKey={key} key={'' + i + currentCombination} text={text} styleCombination={this.state.styleCombinations[currentCombination]} interval={[currentCombinationFirst, i]} />)
          }
        }
      }


      switch (type) {
        case 'Header1': blockElements.push(<Header1 blockKey={key} key={key}>{spanList.length < 1 ? <br /> : spanList}</Header1>)
          break
        case 'Paragraph': blockElements.push(<Paragraph blockKey={key} key={key} >{spanList.length < 1 ? <br /> : spanList}</Paragraph>)
          break
      }
    }

    return blockElements
  }


  moveCaret = (selection, blockKey, offset = 0) => {
    console.log('MOVING CARET TO =>', blockKey, 'TO OFFSET =>', offset)
    selection.collapse(document.querySelector(`#react-wysiwyg [data-key="${blockKey}"]`), offset)
  }

  keyPressHandler = (selection, event) => {
    const { anchorNode: begin, focusNode: end, anchorOffset: beginOffset, focusOffset: endOffset } = selection
    const { which, ctrlKey, metaKey, key } = event
    console.log(begin, beginOffset)
    const blockKey = crypto.randomBytes(4).toString('hex')
    const newBlock = {
      key: '' + blockKey,
      type: 'Paragraph',
      text: 'Text',
      characters: [[0, null], [0, null], [0, null], [0, null]]
    }

    if (key === 'Enter') {
      this.setState(({ contentState: { blocks } }) => {
        return {
          contentState: {
            blocks: {
              ...blocks,
              [blockKey]: newBlock
            }
          }
        }
      }, () => {
        this.moveCaret(selection, blockKey)
      })
    }
    else {

    }
  }

  handleKeyDown = (event) => {
    event.persist()
    const charCode = String.fromCharCode(event.which).toLowerCase();
    const which = event.which
    const copy = (event.ctrlKey && charCode === 'c') || (event.metaKey && charCode === 'c')
    const all = (event.ctrlKey && charCode === 'a') || (event.metaKey && charCode === 'a')
    const arrow = [37, 38, 39, 40, 116].find(key => key === which) !== undefined

    if (!arrow && !copy && !all) {
      event.preventDefault()
      this.keyPressHandler(document.getSelection(), event)
    }
  }

  handleContextMenu = (e) => {
    ///e.preventDefault()
  }

  render() {
    const { classes } = this.props

    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={this.changeText}>CHANGE!</button>
        <div
          suppressContentEditableWarning="true"
          onKeyDown={this.handleKeyDown}
          onContextMenu={this.handleContextMenu}
          spellCheck="false"
          id="react-wysiwyg"
          className={classes.textarea}
          contentEditable
        >
          {this.renderFromState()}
        </div>
      </div>
    )
  }
}

TextArea.propTypes = {
  classes: PropTypes.object
}


export default injectSheet(styles)(TextArea)