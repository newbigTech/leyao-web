import search from "./search"
import goods from "./goods"
import grids from "./grids"
import ads from "./ads"

export default {
  search: search(),
  sortable: [
    ads(),
    grids(),
    goods(),
  ]
}
