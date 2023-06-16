/* Fontawesome 图标引入 */
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faCheck,
    faCircleChevronDown,
    faCircleInfo,
    faGears,
    faSquareCaretLeft,
    faSquareMinus,
    faSquareXmark,
    faUpRightFromSquare,
    faUser,
    faUserGroup,
    faUserPlus,
    faXmark,
} from "@fortawesome/free-solid-svg-icons"

import {
    faQq,
} from "@fortawesome/free-brands-svg-icons"

// import {
//     faWindowMinimize,
// } from "@fortawesome/free-regular-svg-icons"

const fontawesomeIcons = [
    faCheck,
    faCircleChevronDown,
    faCircleInfo,
    faGears,
    faQq,
    faSquareCaretLeft,
    faSquareMinus,
    faSquareXmark,
    faUpRightFromSquare,
    faUser,
    faUserGroup,
    faUserPlus,
    faXmark,
]
/* Fontawesome 图标引入 */

export const iconsInit = () => {
    fontawesomeIcons.forEach(icon => library.add(icon))
}
