import React, { Component } from 'react'
import injectSheet, { ThemeProvider } from 'react-jss'
import PropTypes from 'prop-types'
import TextArea from './TextArea'
import theme from './theme'
import 'typeface-roboto'


const styles = theme => ({
  root: {
    backgroundColor: theme.root.backgroundColor,
    boxSizing: 'border-box',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '& *, *::before, *::after ': {
      boxSizing: 'inherit'
    }
  },
  textareaContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
})

class UnstyledEditor extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.textareaContainer}>
          <TextArea />
        </div>
      </div>
    )
  }
}

UnstyledEditor.propTypes = {
  classes: PropTypes.object
}

const StyledEditor = injectSheet(styles)(UnstyledEditor)


const Editor = props => <ThemeProvider theme={theme}><StyledEditor {...props} /></ThemeProvider>

export default Editor
export { createTheme }