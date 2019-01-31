import React, { Component } from 'react'


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

const a = {
  style: styleCode.UNDERLINE,
  bounds: [0, 4]
}

export default class extends Component {

  getChildSpanPrototypes = (characters, entities, text) => {

    const styleMap = {}


    characters.forEach((character, index) => {
      for (let code in styleCode) {
        const codeVal = styleCode[code]
        if (!styleMap[codeVal]) {
          styleMap[codeVal] = []
        }
        if (character.style.find(stylePiece => {
          return codeVal === stylePiece[0]
        })) {
          styleMap[codeVal].push(index)
        }
      }
    })

    const sequantialStyleMap = []

    for (let codeVal in styleMap) {
      const map = styleMap[codeVal]
      if (map.length > 0) {
        let start = map[0]
        let prev = null
        let current = null
        for (let i = 1; i < map.length; i++) {
          prev = map[i - 1]
          current = map[i]
          if (current - 1 !== prev) {
            sequantialStyleMap.push([start, prev, codeVal])
            start = current
          } else if (i === map.length - 1) {
            sequantialStyleMap.push([start, current, codeVal])
          }
        }
      }
    }
    console.log('sequantialStyleMap', sequantialStyleMap)



    const protList = []

    sequantialStyleMap.forEach(styleMap => {
      const code = parseInt(styleMap[2]), begin = styleMap[0], end = styleMap[1]
      if (protList.length < 1) {
        protList.push({ styles: [code], interval: [begin, end] })
      }
      else {
        protList.forEach(prot => {
          const protBegin = prot.interval[0], protEnd = prot.interval[1], protStyles = [...prot.styles]
          if (begin <= protEnd && end >= protBegin) {
            if (begin === protBegin && end === protEnd) {
              prot.styles.push(code)
            }
            else if (begin >= protBegin && end > protEnd) {
              if (begin === protBegin) {
                prot.styles.push(code)
                protList.push({ styles: [code], interval: [protEnd + 1, end] })
              }
              else {
                prot.interval = [begin, protEnd], prot.styles.push(code)
                protList.push({ styles: protStyles, interval: [protBegin, begin - 1] })
                protList.push({ styles: [code], interval: [protEnd + 1, end] })
              }
            }
            else if (begin < protBegin && end <= protEnd) {
              if (end === protEnd) {
                prot.styles.push(code)
                protList.push({ styles: [code], interval: [begin, protEnd - 1] })
              }
              else {
                prot.interval = [protBegin, end], prot.styles.push(code)
                protList.push({ styles: protStyles, interval: [end + 1, protEnd] })
                protList.push({ styles: [code], interval: [begin, protEnd - 1] })
              }
            }
            else if (begin >= protBegin && end <= protEnd) {
              if (begin === protBegin) {
                prot.interval = [begin, end], prot.styles.push(code)
                protList.push({ styles: protStyles, interval: [end + 1, protEnd] })
              }
              else if (end === protEnd) {
                prot.interval = [begin, end], prot.styles.push(code)
                protList.push({ styles: protStyles, interval: [protBegin, begin - 1] })
              }
              else {
                prot.interval = [begin, end], prot.styles.push(code)
                protList.push({ styles: protStyles, interval: [protBegin, begin - 1] })
                protList.push({ styles: protStyles, interval: [end + 1, protEnd] })
              }
            }
            else if (begin <= protBegin && end >= protEnd) {
              prot.styles.push(code)
              protList.push({ styles: [code], interval: [begin, protBegin - 1] })
              protList.push({ styles: [code], interval: [protEnd + 1, end] })
            }
          }
          else {
            //protList.push({ styles: [code], interval: [begin, end] })
          }
        })
      }

    })

    protList.forEach(prot => {
      console.log('INTERVAL', prot.interval, 'STYLES', prot.styles)
    })

  }

}