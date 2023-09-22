# react-navigate-motion

[![Release Status](https://img.shields.io/github/release/su-pull/react-navigate-motion.svg)](https://github.com/su-pull/react-navigate-motion/releases/latest)
[![Minzip Size](https://img.shields.io/bundlephobia/minzip/react-navigate-motion)](https://bundlephobia.com/package/react-navigate-motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

A programmatic page transition with animation.  
This library uses react-router-dom's navigate hook and other frameworks routing functions.  
The single component performs the unmount and next page initial mount animations, motion is always returns to the initial style.

## Installation

```sh
npm install react-navigate-motion
```

## Get Started

```tsx
import { NavigateMotion } from 'react-navigate-motion'
import { useNavigate } from 'react-router-dom'

const Link = ({ href, children }) => {
  const navigate = useNavigate()
  const exit = { opacity: 0, transition: { duration: 0.5 } }
  const entry = { opacity: 0, transition: { duration: 0.5 } }

  return (
    <NavigateMotion href={href} routing={navigate} exit={exit} entry={entry}>
      {children}
    </NavigateMotion>
  )
}
export default Link
```

## NavigateMotion(href and routing is require)

| Properties | Description                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| href       | Pass the Internal page path for prefetching and page transitions this is used to router methods arguments and `<a>`                         |
| routing    | Pass the programmatic page transitions hooks                                                                                                |
| exit       | Object defining the properties for the exit animation                                                                                       |
| entry      | Object defining the properties for the entry animation                                                                                      |
| scroll     | Controls whether the page scrolls to the top upon navigation                                                                                |
| prefetch   | `prefetch={false}` is starts prefetching when the link is pressed<br> `prefetch={true}` is prefetches when the Link element in the viewport |

## exit and entry Object(all are optional)

| Properties | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| opacity    | CSS opacity                                                         |
| blur       | CSS filter blur                                                     |
| scale      | CSS transform scale                                                 |
| x          | CSS transform translateX                                            |
| y          | CSS transform translateY                                            |
| rotate     | CSS transform rotate                                                |
| rotateX    | CSS transform rotateX                                               |
| rotateY    | CSS transform rotateY                                               |
| rotate3d   | CSS transform rotate3d [x: number, y: number, z: number, a: string] |
| transition | Object defining the properties for the duration time and ease       |

## transition Object

| Properties | Description                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- |
| duration   | CSS animation duration time                                                                    |
| ease       | CSS transition timing function<br> cubic-bezier[x1: number, y1: number, x2:number, y2: number] |

## License

MIT License.
