/**
 * 1.存在<!DOCTYPE html>，w3c标准模式
 * 2.不存在 怪异模式
 * 3.执行 document.compatMode(compat)兼容
 *   CSS1Compat: w3c标准模式 
 *   BackCompat: 怪异模式(向后兼容，一般兼容5个版本)
*/
/**
 * 1.视口
 * 常规：window.innerWidth/innerHeight
 * IE9/IE8及以下：
 * 标准：document.documentElement.clientWidth/clientHeight
 * 怪异：document.body.clientWidth/clientHeight
*/
// 获取视口宽度 innerWidth clienttWidth
function getViewPortSize() {
  if (window.innerWidth) {
    return {
      viewWidth: window.innerWidth,
      viewHeight: window.innerHeight
    }
  } else {
    if (document.compatMode === 'BackCompat') {
      return {
        viewWidth: document.body.clientWidth,
        viewHeight: document.body.clientHeight
      }
    } else {
      return {
        viewWidth: document.documentElement.clientWidth,
        viewHeight: document.documentElement.clientHeight
      }
    }
  }
}


// 获取滚动距离 document.body.scrollWidth(页面) scrollLeft(偏移)
// scrollWidth = window.innerWidth + window.sorollLeft
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft, // document.body.scrollLeft/scrollTop与document.documentElement.scrollLeft/scrollTop只有一个存在
      y: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}



/**
 * document.body.scrollWidth = window.innerWidth + window.sorollLeft
 * 视口加上滚动条，所有宽度
 * 1.document.body.scrollWidth
 * 2.document.documentElement.scrollWidth
*/
function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}



// 获取到视口的坐标
function getOffsetSize(el) {
  let offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop
  parent = el.offsetParent
  while (parent) {
    offsetLeft += parent.offsetLeft
    offsetTop += parent.offsetTop
    parent = parent.offsetParent
  }
  return {
    width: offsetLeft,
    height: offsetTop
  }
}




// 获取元素的属性(准确)
function getStyles (elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(elem, null)[prop]
    } else {
      return window.getComputedStyle(elem, null)
    }
  } else {
    if (prop) {
      return elem.currentStyle[prop]
    } else {
      return elem.currentStyle
    }
  }
}



// 获取偏移量距离祖先元素
function getOffsetSize(el) {
  let offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop
      parent = el.offsetParent
  while (parent) {
    offsetLeft += parent.offsetLeft
    offsetTop += parent.offsetTop
    parent  = parent.offsetParent
  }
  return {
    width: offsetLeft,
    height: offsetTop
  }
}


function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft, // document.body.scrollLeft/scrollTop与document.documentElement.scrollLeft/scrollTop只有一个存在
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

// 获取pageX，pageY
function pagePos(e) {
  const { left, top } = getScrollOffset()
  const cLeft = document.documentElement.clientLeft || 0
  const cTop = document.documentElement.clientTop || 0
  return {
    x: e.clientX + left - cLeft,
    y: e.clientY + top - cTop
  }
}



// 绑定事件函数的兼容写法
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false)
  } else if (el.attachEvent) {
    // ie8及以下
    el.attachEvent('on' + type, function () {
      // attachEvent this指向window
      fn.call(el)
    })
  } else {
    // 更低
    el['on' + type] = fn
  }
}


// 阻止冒泡的兼容写法
function cancelBubble(e) {
  e = e || window.event
  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    e.cancelBubble = true
  }
}