import React, { Component } from 'react'


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

const addMultipleToSet = (begin, end, set) => {
  for (let i = begin; i < end + 1; i++) {
    set.add(i)
  }

  return set
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
          return codeVal === stylePiece
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
        if (map.length > 1) {
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
        else {
          sequantialStyleMap.push([start, start, codeVal])
        }
      }
    }



    const protoList = []

    sequantialStyleMap.forEach(styleMap => {
      const code = parseInt(styleMap[2]), begin = styleMap[0], end = styleMap[1]
      if (protoList.length < 1) {
        protoList.push({ styles: [code], interval: [begin, end] })
      }
      else {
        const croppedIndices = new Set([])
        protoList.forEach(prot => {
          const protBegin = prot.interval[0], protEnd = prot.interval[1], protStyles = [...prot.styles]
          if (begin <= protEnd && end >= protBegin) {
            if (begin === protBegin && end === protEnd) {
              prot.styles.push(code)
              addMultipleToSet(begin, end, croppedIndices)
            }
            else if (begin >= protBegin && end > protEnd) {
              if (begin === protBegin) {
                prot.styles.push(code)
              }
              else {
                prot.interval = [begin, protEnd]
                prot.styles.push(code)
                protoList.push({ styles: protStyles, interval: [protBegin, begin - 1] })
              }
              addMultipleToSet(begin, protEnd, croppedIndices)
            }
            else if (begin < protBegin && end <= protEnd) {
              if (end === protEnd) {
                prot.styles.push(code)
              }
              else {
                prot.interval = [protBegin, end]
                prot.styles.push(code)
                protoList.push({ styles: protStyles, interval: [end + 1, protEnd] })
              }
              addMultipleToSet(protBegin, end, croppedIndices)
            }
            else if (begin >= protBegin && end <= protEnd) {
              if (begin === protBegin) {
                prot.interval = [begin, end]
                prot.styles.push(code)
                protoList.push({ styles: protStyles, interval: [end + 1, protEnd] })
              }
              else if (end === protEnd) {
                prot.interval = [begin, end]
                prot.styles.push(code)
                protoList.push({ styles: protStyles, interval: [protBegin, begin - 1] })
              }
              else {
                prot.interval = [begin, end]
                prot.styles.push(code)
                protoList.push({ styles: protStyles, interval: [protBegin, begin - 1] })
                protoList.push({ styles: protStyles, interval: [end + 1, protEnd] })
              }
              addMultipleToSet(begin, end, croppedIndices)
            }
            else if (begin <= protBegin && end >= protEnd) {
              prot.styles.push(code)
              addMultipleToSet(protBegin, protEnd, croppedIndices)
            }
          }
        })

        const originalIndices = addMultipleToSet(begin, end, new Set([]))

        const leftIndices = Array.from(new Set(
          [...originalIndices].filter(x => !croppedIndices.has(x))));

        if (leftIndices.length > 0) {
          const leftSequences = []
          let start = leftIndices[0]
          let prev = null
          let current = null
          if (leftIndices.length > 1) {
            for (let i = 1; i < leftIndices.length; i++) {
              prev = leftIndices[i - 1]
              current = leftIndices[i]
              if (current - 1 !== prev) {
                leftSequences.push([start, prev])
                start = current
              } else if (i === leftIndices.length - 1) {
                leftSequences.push([start, current])
              }
            }
          }
          else {
            leftSequences.push([start, start])
          }

          leftSequences.forEach(sequence => {
            protoList.push({ styles: [code], interval: sequence })
          })
        }
      }

    })



    let fullIndexSet = addMultipleToSet(0, text.length - 1, new Set([]))

    protoList.forEach(prot => {
      fullIndexSet = Array.from(new Set(
        [...fullIndexSet].filter(x => !addMultipleToSet(...prot.interval, new Set([])).has(x))));
    })

    fullIndexSet = Array.from(fullIndexSet)

    const leftSequences = []
    if (fullIndexSet.length > 0) {

      let start = fullIndexSet[0]
      let prev = null
      let current = null
      if (fullIndexSet.length > 1) {

        for (let i = 1; i < fullIndexSet.length; i++) {
          prev = fullIndexSet[i - 1]
          current = fullIndexSet[i]
          if (current - 1 !== prev) {
            leftSequences.push([start, prev])
            start = current
          } else if (i === fullIndexSet.length - 1) {
            leftSequences.push([start, current])
          }
        }
      }
      else {
        leftSequences.push([start, start])
      }
    }


    leftSequences.forEach(sequence => {
      protoList.push({ styles: [], interval: sequence })
    })

    return { protoList, text }
  }


  generateSpanFromPrototype = ({ protoList, text }) => {
    const spanList = []
    protoList.sort((a, b) => a.interval[0] - b.interval[0])

    protoList.forEach((proto, index) => {
      const span = undefined
      const style = {}

      for (let i in styleCode) {
        const code = parseInt(styleCode[i])
        if (proto.styles.find(s => s === code)) {
          switch (code) {
            case styleCode.UNDERLINE:
              style.textDecoration = 'underline'
              break
            case styleCode.FONT_SIZE:
              style.fontSize = 40
              break
            case styleCode.BOLD:
              style.fontWeight = 'bold'
              break
            case styleCode.ITALIC:
              style.fontStyle = 'italic'
              break
            case styleCode.FORE_COLOR_BLUE:
              style.color = 'blue'
              break
          }
        }
      }

      spanList.push(<span key={index} style={style}>{text.slice(proto.interval[0], proto.interval[1] + 1)}</span>)

    })



    return spanList
  }




}