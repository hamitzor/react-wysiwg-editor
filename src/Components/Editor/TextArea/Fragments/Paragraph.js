import React from 'react'
import Block from './Block'


export default class extends Block {
  render() {

    return (
      <p data-key={this.props.dataKey}>{this.generateSpanFromPrototype(this.getChildSpanPrototypes(this.props.characters, this.props.entities, this.props.text))}</p>
    )
  }
}