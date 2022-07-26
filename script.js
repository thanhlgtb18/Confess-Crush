if (window.self === window.top) {
  if (!("keyboard" in navigator)) {
    alert("Your browser does not support the Keyboard Lock API.");
  }
} 


const fullscreenButton = document.querySelector("#fullscreen");
const keyboardButton = document.querySelector("#keyboard");
const body = document.body;
const div = document.querySelector("div");
const info = document.querySelector(".info");
var element = document.querySelector('#keyboard');

const ENTER_FULLSCREEN = "Enter full screen";
const LEAVE_FULLSCREEN = "";
const ACTIVATE_KEYBOARD_LOCK = "";
const DEACTIVATE_KEYBOARD_LOCK = "";

const LOCKED_KEYS = ["MetaLeft", "MetaRight", "Tab", "KeyN", "KeyT","Escape","F11"];

let lock = false;

fullscreenButton.addEventListener("click", async () => {
  if (window.self !== window.top) {
    window.open(location.href, '', 'noopener,noreferrer');
    return;
  }
  try {
    if (!document.fullscreen||!lock) {
      await document.documentElement.requestFullscreen();
      navigator.keyboard.lock(LOCKED_KEYS);
      lock = true;
      element.requestPointerLock = element.requestPointerLock ||
           element.mozRequestPointerLock ||
           element.webkitRequestPointerLock;
      // Ask the browser to lock the pointer
      element.requestPointerLock();
      return (div.style.display = "block");
    }
    await document.documentElement.requestFullscreen();
  } catch (err) {
    alert(`${err.name}: ${err.message}`);
  }
});

document.addEventListener('keydown', (e) => {
  if (lock && (e.code === 'KeyN' || e.code === 'KeyT') && (event.ctrlKey || event.metaKey)) {
    info.style.display = 'block';
    setTimeout(() => {
      info.style.display = 'none';
    }, 3000);
  }
});

