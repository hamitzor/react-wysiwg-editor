import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Header1 from './Fragments/Header1'
import Paragraph from './Fragments/Paragraph'

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
  FORE_COLOR_RED: 5,
  FORE_COLOR_BLUE: 6,
  BACK_COLOR: 7,
  BOLD: 8,
  ITALIC: 9,
  SUBSCRIPT: 10,
  SUPERSCRIPT: 11
}






class TextArea extends Component {
  state = {
    contentState: {
      entities: {
        0: { type: 'link', href: '#' }
      },
      blocks: {
        first: {
          key: 'first',
          type: 'Paragraph',
          text: 'This is a title',
          characters: [
            {
              style: [styleCode.UNDERLINE, styleCode.FONT_SIZE],
              entitiy: [0]
            },
            {
              style: [styleCode.UNDERLINE, styleCode.FONT_SIZE],
              entitiy: [0]
            },
            {
              style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.ITALIC],
              entitiy: [0]
            },
            {
              style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.ITALIC],
              entitiy: [0]
            },
            {
              style: [],
              entitiy: null
            },
            {
              style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.BOLD, styleCode.ITALIC],
              entitiy: [0]
            },
            {
              style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.BOLD, styleCode.ITALIC],
              entitiy: [0]
            },
            {
              style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.BOLD],
              entitiy: [0]
            },
            {
              style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.BOLD],
              entitiy: [0]
            },
            {
              style: [styleCode.BOLD],
              entitiy: null
            },
            {
              style: [styleCode.BOLD],
              entitiy: null
            },
            {
              style: [styleCode.BOLD],
              entitiy: null
            },
            {
              style: [styleCode.BOLD],
              entitiy: null
            },
            {
              style: [styleCode.FONT_SIZE, styleCode.BOLD],
              entitiy: [0]
            },
            {
              style: [styleCode.FONT_SIZE, styleCode.BOLD],
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
              style: [styleCode.FORE_COLOR_BLUE],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            }, {
              style: [],
              entitiy: null
            },
          ]
        }
      }
    }
  }

  renderFromStae = () => {
    const { entities, blocks } = this.state.contentState

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

  handleKeyDown = (e) => {
    this.setState({
      contentState: {
        entities: {
          0: { type: 'link', href: '#' }
        },
        blocks: {
          first: {
            key: 'first',
            type: 'Paragraph',
            text: 'THIS IS A TITLE',
            characters: [
              {
                style: [styleCode.UNDERLINE, styleCode.FONT_SIZE],
                entitiy: [0]
              },
              {
                style: [styleCode.UNDERLINE, styleCode.FONT_SIZE],
                entitiy: [0]
              },
              {
                style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.ITALIC],
                entitiy: [0]
              },
              {
                style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.ITALIC],
                entitiy: [0]
              },
              {
                style: [],
                entitiy: null
              },
              {
                style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.BOLD, styleCode.ITALIC],
                entitiy: [0]
              },
              {
                style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.BOLD, styleCode.ITALIC],
                entitiy: [0]
              },
              {
                style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.BOLD],
                entitiy: [0]
              },
              {
                style: [styleCode.UNDERLINE, styleCode.FONT_SIZE, styleCode.BOLD],
                entitiy: [0]
              },
              {
                style: [styleCode.BOLD],
                entitiy: null
              },
              {
                style: [styleCode.BOLD],
                entitiy: null
              },
              {
                style: [styleCode.BOLD],
                entitiy: null
              },
              {
                style: [styleCode.BOLD],
                entitiy: null
              },
              {
                style: [styleCode.FONT_SIZE, styleCode.BOLD],
                entitiy: [0]
              },
              {
                style: [styleCode.FONT_SIZE, styleCode.BOLD],
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
                style: [styleCode.FORE_COLOR_BLUE],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              }, {
                style: [],
                entitiy: null
              },
            ]
          }
        }
      }
    })

    let keyCode = e.keyCode
    if (![37, 38, 39, 40, 116].find(key => key === keyCode)) {
      e.preventDefault()
    }


  }

  handleContextMenu = (e) => {
    e.preventDefault()
  }

  render() {
    const { classes } = this.props

    return (
      <div
        suppressContentEditableWarning="true"
        onKeyDown={this.handleKeyDown}
        onContextMenu={this.handleContextMenu}
        spellCheck="false"
        id="react-wysiwyg"
        className={classes.textarea}
        contentEditable
      >
        {this.renderFromStae()}
      </div>
    )
  }
}

TextArea.propTypes = {
  classes: PropTypes.object
}


export default injectSheet(styles)(TextArea)