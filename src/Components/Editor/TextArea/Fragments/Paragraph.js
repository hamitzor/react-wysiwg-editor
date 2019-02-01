import React from 'react'
import Block from './Block'


export default class extends Block {
  render() {

    return (
      <p data-block="true" data-key={this.props.blockKey}>{this.props.children}</p>
    )
  }
}