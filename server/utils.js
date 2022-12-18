export const getContrastColorFor = color => {
  color = (color.charAt(0) === '#') ? color.substring(1, 7) : color
  const r = parseInt(color.substring(0, 2), 16) // hexToR
  const g = parseInt(color.substring(2, 4), 16) // hexToG
  const b = parseInt(color.substring(4, 6), 16) // hexToB
  const uicolors = [r / 255, g / 255, b / 255]
  const c = uicolors.map(col => {
    if (col <= 0.03928) {
      return col / 12.92
    }
    return Math.pow((col + 0.055) / 1.055, 2.4)
  })
  const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2])
  return (L > 0.179) ? '#0d0d0d' : 'white'
}

const convertHexToRgb = hex => {
  if (hex[0] === '#') hex = hex.substring(1)
  return {
    r: parseInt(hex.substr(0, 2), 16),
    g: parseInt(hex.substr(2, 2), 16),
    b: parseInt(hex.substr(4, 2), 16),
  }
}

const convertRgbToHsl = ({ r, g, b }) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = (max + min) / 2
  let s = (max + min) / 2
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return { h, s, l }
}

export const convertHexToHsl = (hex) => {
  return convertRgbToHsl(convertHexToRgb(hex))
}

const convertHexValueToHslValue = (hex) => {
  const { h, s, l } = convertRgbToHsl(convertHexToRgb(hex))
  // console.log(h, s, l)
  const hVal = Math.round(h * 360)
  const sVal = Math.round(s * 100) + '%'
  const lVal = Math.round(l * 100) + '%'
  return `hsl(${hVal}, ${sVal}, ${lVal})`
}

export const getRandomHex = () => {
  const letters = "0123456789ABCDEF".split("");
  let color = "";
  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * 16);
    color += letters[random];
  }
  return color;
}
