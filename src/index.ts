import './types'

import { h, render, removeAllChildNodes, tick } from './core'
import { nodeToString } from './helpers'
import { renderSSR } from './ssr'
import { Component } from './component'
import { Fragment } from './fragment'
import { Store } from './store'
import { createContext } from './context'
import { withStyles } from './withStyles'

import { Helmet } from './components/helmet'
import { Img } from './components/img'
import { Link } from './components/link'
import { Visible } from './components/visible'

// @ts-ignore
import htm from 'htm/dist/htm.js'
const jsx = htm.bind(h)

export default { h, render, renderSSR, removeAllChildNodes, tick, nodeToString, createContext }
export { Component, Fragment, Store, jsx, h, withStyles }
export { Helmet, Img, Link, Visible }
