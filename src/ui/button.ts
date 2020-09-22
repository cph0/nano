import { h, strToHash } from '../core'
import { boxShadow, zIndex } from './_config'
import { lightenColor } from './_helpers'

export const Button = (props: { outlined?: boolean; text?: boolean; style?: string; [key: string]: any }) => {
  const {
    children,
    outlined = false,
    text = false,
    background = '#6200ee',
    color = '#ffffff',
    style = '',
    ...rest
  } = props

  const normal = !(outlined || text)

  const bg = normal ? background : '#ffffff'
  const clr = normal ? color : background
  const hover = normal ? lightenColor(bg, 10) : lightenColor(bg, -10)
  const ripple = normal ? lightenColor(bg, 50) : lightenColor(background, 50)

  console.log(bg, hover, ripple)

  const cssHash = strToHash(outlined.toString() + text.toString() + bg + style)

  const styles = `
    .nano_jsx_button-${cssHash} {
      color: ${clr};
      background: ${bg};
      border-radius: 4px;
      display: inline-block;
      font-size: 14px;
      padding: 10px 16px;
      margin: 0px 0px 1em 0px;
      text-align: center;
      cursor: pointer;

      -webkit-touch-callout:none;
      -webkit-user-select:none;
      -khtml-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      

      z-index: ${zIndex.button}

      ${boxShadow}

      border: none;
      border-radius: 2px;
      padding: 12px 18px;
      font-size: 16px;
      text-transform: uppercase;
      box-shadow: 0 0 4px #999;
      outline: none;
    }

    /* Ripple effect */
    .ripple-${cssHash} {
      background-position: center;
      transition: background 0.8s;
    }
    .ripple-${cssHash}:hover {
      background: ${hover} radial-gradient(circle, transparent 1%, ${hover} 1%) center/15000%;
    }
    .ripple-${cssHash}:active {
      background-color: ${ripple};
      background-size: 100%;
      transition: background 0s;
    }

  `

  const el = document.querySelector(`[data-css-hash*="${cssHash}"]`)
  if (!el) {
    const styleElement = h('style', { 'data-css-hash': cssHash }, styles)
    document.head.appendChild(styleElement)
  }

  let customStyles = ''
  if (outlined || text) {
    customStyles += 'padding-top: 9px; padding-bottom: 9px; '
    customStyles += '-webkit-box-shadow: none; -moz-box-shadow: none; box-shadow none; '
    if (outlined) customStyles += `border: 1px ${clr} solid; `
  }
  customStyles += style

  return h('a', { class: `nano_jsx_button-${cssHash} ripple-${cssHash}`, style: customStyles, ...rest }, children)
}