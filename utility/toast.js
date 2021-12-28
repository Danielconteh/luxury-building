import Toastify from 'toastify-js';

export const toast = (
  msg,
  bt = 'bottom',
  bg = 'linear-gradient(to right, #00b09b, #96c93d)',
) =>
  Toastify({
    text: msg,
    className: 'toastAlert',
    stopOnFocus: true,
    gravity: bt,
    style: {
      background: bg,
    },
  }).showToast();



