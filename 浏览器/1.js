// const d1 = document.getElementById('d1')
// console.log(d1, 1)

function init_module () {
  initComputed()
}


const initComputed = (function () {
 
  function init () {
    console.log(1)
  }
  return function () {
    init()
  }
})();


