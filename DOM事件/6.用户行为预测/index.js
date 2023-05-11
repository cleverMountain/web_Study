
let initMenu = (function () {
  let oMenu = document.getElementsByClassName('parent'),
    oMenuItems = document.getElementsByClassName('son'),
    oSon = document.getElementsByClassName('ul-son')[0],
    t = null,
    isInSon = false


  addEvent(oSon, 'mouseenter', hanleSonEnter)
  addEvent(oSon, 'mouseleave', hanleSonLeave)
  for (let i = 0; i < oMenu.length; i++) {
    let menuItem = oMenu[i]
    addEvent(menuItem, 'mouseenter', menuMouseEnetr)
  }
  function hanleSonEnter() {
    isInSon = true
  }
  function hanleSonLeave() {
    isInSon = false
  }
  function menuMouseEnetr(ev) {
    let e = ev || window.event,
      tar = e.target || e.srcElement,
      thisIndex = Array.prototype.indexOf.call(oMenu, tar)
    if (t) {
      clearTimeout(t)
    }
    t = setTimeout(function() {
      if (isInSon) {
        return
      }
      addActive(thisIndex)
    }, 300)
  }
  function addActive(index) {
    removeActive()
    oMenu[index].className += ' active'
    oMenuItems[index].className += ' active'
  }
  function removeActive() {
    for (let i = 0; i < oMenu.length; i++) {
      oMenu[i].className = 'parent'
      oMenuItems[i].className = 'son'
    }
  }
})



window.onload = function () {
  init()
}


function init() {
  initMenu()
}


