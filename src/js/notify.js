import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

// 1: search requires input only in English
// 2: no search value entered
// 3: unfortunately, nothing was found
// 4: please enter a new search value
// 5: server error

// title: black,
// text: red,


export let myNotify1
export let myNotify2
export let myNotify3
export let myNotify4
export let myNotify5

export function pushNotify1() {
  myNotify1 = new Notify({
    status: 'error',
    title: '',
    text: 'search requires input only in English',
    effect: 'fade',
    type: 1,
    autoclose: true,
    autotimeout: 4000,
    showIcon: false,
  })
}

export function pushNotify2() {
  myNotify2 = new Notify({
    status: 'error',
    title: 'no search value entered',
    text: '',
    effect: 'fade',
    type: 1,
    autoclose: true,
    autotimeout: 4000,
    showIcon: false,
  })
}

export function pushNotify3() {
  myNotify3 = new Notify({
    status: 'error',
    title: '',
    text: 'unfortunately, nothing was found',
    effect: 'fade',
    type: 1,
    autoclose: true,
    autotimeout: 4000,
    showIcon: false,
  })
}

export function pushNotify4() {
  myNotify4 = new Notify({
    status: 'error',
    title: 'please enter a new search value',
    text: '',
    effect: 'fade',
    type: 1,
    autoclose: true,
    autotimeout: 4000,
    showIcon: false,
  })
}

export function pushNotify5() {
  myNotify5 = new Notify({
    status: 'error',
    title: 'server error',
    text: '',
    effect: 'fade',
    type: 1,
    autoclose: true,
    autotimeout: 4000,
    showIcon: false,
  })
}


// pushNotify1()

// myNotify1.close();

// function pushNotify() {
//   new Notify({
//     status: 'success',
//     title: 'Notify Title',
//     text: 'Notify text lorem ipsum',
//     effect: 'fade',
//     speed: 300,
//     customClass: null,
//     customIcon: null,
//     showIcon: false,
//     showCloseButton: true,
//     autoclose: true,
//     autotimeout: 3000,
//     gap: 20,
//     distance: 20,
//     type: 1,
//     position: 'right top'
//   })
// }