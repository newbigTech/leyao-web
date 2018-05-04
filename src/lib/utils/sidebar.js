/**
* Created by cycold on 2016-11-22
*/

export function openSidebarMenu(functionId) {
  let $a = $('._side-bar').find('#' + functionId)
  let $liActive = $a.parent('.active')
  let $ulSubmenu = $liActive.parent('._sub-menu')
  let $liParent = $ulSubmenu.parent()
  if ($liActive.length == 0 || $ulSubmenu.length == 0 || $liParent.length == 0) return 
  if ($liParent.hasClass('_open')) return

  $('._side-bar').find('._menu-item').removeClass("_open _contain-active")
  $('._side-bar').find('._sub-menu').hide()

  setTimeout(() => {
    // console.log('openSidebarMenu....')
    $liParent.addClass("_open _contain-active")
    $ulSubmenu.velocity("slideDown",{ duration: 0 })
  },20)
  
}
