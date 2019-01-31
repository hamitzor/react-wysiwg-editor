import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Header1 from './Fragments/Header1'

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

const styleCode = {
  OVERLINE: 0,
  LINE_THROUGH: 1,
  UNDERLINE: 2,
  FONT_FAMILY: 3,
  FONT_SIZE: 4,
  FORE_COLOR: 5,
  BACK_COLOR: 6,
  BOLD: 7,
  ITALIC: 8,
  SUBSCRIPT: 9,
  SUPERSCRIPT: 10
}



const contentState = {
  entities: {
    0: { type: 'link', href: '#' }
  },
  blocks: {
    first: {
      key: 'first',
      type: 'Header1',
      text: 'This is a title',
      characters: [
        {
          style: [[styleCode.UNDERLINE], [styleCode.FONT_SIZE]],
          entitiy: [0]
        },
        {
          style: [[styleCode.UNDERLINE], [styleCode.FONT_SIZE]],
          entitiy: [0]
        },
        {
          style: [[styleCode.UNDERLINE], [styleCode.FONT_SIZE]],
          entitiy: [0]
        },
        {
          style: [[styleCode.UNDERLINE], [styleCode.FONT_SIZE]],
          entitiy: [0]
        },
        {
          style: [],
          entitiy: null
        },
        {
          style: [[styleCode.UNDERLINE], [styleCode.FONT_SIZE], [styleCode.BOLD]],
          entitiy: [0]
        },
        {
          style: [[styleCode.UNDERLINE], [styleCode.FONT_SIZE], [styleCode.BOLD]],
          entitiy: [0]
        },
        {
          style: [[styleCode.UNDERLINE], [styleCode.FONT_SIZE], [styleCode.BOLD]],
          entitiy: [0]
        },
        {
          style: [[styleCode.UNDERLINE], [styleCode.FONT_SIZE], [styleCode.BOLD]],
          entitiy: [0]
        },
        {
          style: [[styleCode.BOLD]],
          entitiy: null
        },
        {
          style: [[styleCode.BOLD]],
          entitiy: null
        },
        {
          style: [[styleCode.BOLD]],
          entitiy: null
        },
        {
          style: [[styleCode.BOLD]],
          entitiy: null
        },
        {
          style: [[styleCode.FONT_SIZE], [styleCode.BOLD]],
          entitiy: [0]
        },
        {
          style: [[styleCode.FONT_SIZE], [styleCode.BOLD]],
          entitiy: [0]
        }
      ]
    },
    second: {
      key: 'second',
      type: 'Paragraph',
      text: 'This is a paragraph',
      characters: [
        {
          style: [],
          entitiy: null
        },
        {
          style: [],
          entitiy: null
        },
        {
          style: [],
          entitiy: null
        },
        {
          style: [],
          entitiy: null
        },
        {
          style: [],
          entitiy: null
        }
      ]
    }
  }
}



const Paragraph = ({ dataKey, text }) => <p data-key={dataKey}>{text}</p>

const renderFromStae = (state) => {
  const { entities, blocks } = state

  const blockElements = []

  for (let key in blocks) {
    const { type, text, characters } = blocks[key]

    switch (type) {
      case 'Header1': blockElements.push(<Header1 entities={entities} characters={characters} dataKey={key} key={key} text={text} />)
        break
      case 'Paragraph': blockElements.push(<Paragraph entities={entities} characters={characters} dataKey={key} key={key} text={text} />)
        break
    }
  }

  return blockElements
}


class TextArea extends Component {
  handleKeyDown = (e) => {
    e.preventDefault()
  }

  render() {
    const { classes } = this.props

    return (
      <div
        onKeyDown={this.handleKeyDown}
        spellCheck="false"
        id="react-wysiwyg"
        className={classes.textarea}
        contentEditable
      >
        {renderFromStae(contentState)}
      </div>
    )
  }
}

TextArea.propTypes = {
  classes: PropTypes.object
}


export default injectSheet(styles)(TextArea)