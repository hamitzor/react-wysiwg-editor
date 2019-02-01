import { styleValues } from './styleCode'

export default combination => {
  const style = {}
  combination.forEach(code => {
    const [property, value] = styleValues[code]
    style[property] = value
  })

  return style
}