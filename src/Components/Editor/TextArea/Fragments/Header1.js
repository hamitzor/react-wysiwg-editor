import React from 'react'
import Header from './Header'


export default class extends Header {
  render() {
    return (
      <h1 data-key={this.props.dataKey}>{this.getChildSpanPrototypes(this.props.characters, this.props.entities)}</h1>
    )
  }
}