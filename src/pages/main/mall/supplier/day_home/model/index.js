import search from "./search"
import goods from "./goods"
import grids from "./grids"
import slider from "./slider"
import list from "./list"
import notice from "./notice"
import magic from "./magic"

export default {
    header: [search()],
    sortable: [
        slider(),
        grids(),
        notice(),
        list('appListA'),
    ]
}
