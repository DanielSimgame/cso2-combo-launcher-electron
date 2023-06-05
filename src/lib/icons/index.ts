/* Fontawesome 图标引入 */
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSquareCaretLeft,
    faSquareMinus,
    faSquareXmark,
    faUpRightFromSquare,
    faUser,
    faUserGroup,
    faXmark,
} from "@fortawesome/free-solid-svg-icons"

import {
    faQq,
} from "@fortawesome/free-brands-svg-icons"

// import {
//     faWindowMinimize,
// } from "@fortawesome/free-regular-svg-icons"

const fontawesomeIcons = [
    faQq,
    faSquareCaretLeft,
    faSquareMinus,
    faSquareXmark,
    faUpRightFromSquare,
    faUser,
    faUserGroup,
    faXmark,
]
/* Fontawesome 图标引入 */

export const iconsInit = () => {
    fontawesomeIcons.forEach(icon => library.add(icon))
}
