const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");
const dateEl = document.getElementById("dateStr");
const ipAddressEl = document.getElementById("ipaddress");

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year+"年", month+"月", day+"日"].join('');
}

function updateClock() {

  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let ampm = "上午";

  if (h > 12) {
    h = h - 12;
    ampm = "下午";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hourEl.innerText = h;
  minuteEl.innerText = m;
  secondEl.innerText = s;
  ampmEl.innerText = ampm;
  setTimeout(() => {
    updateClock();
  }, 1000);
}
let d = formatDate()
dateEl.innerText = d;
updateClock();

var sendNotice = (title, message) =>{
    chrome.notifications.create(`notification-${Date.now()}`,
        {
        type: "basic",
        title: title,
        message: message,
        iconUrl: chrome.runtime.getURL("hello_extensions.png")
        }
    );
}

var getPublicIP = async () => {
    const response = await fetch("http://httpbin.org/ip")
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const allData = await response.json()
    console.log('service worker allData', allData)
    console.log(allData)
    let ip = allData.origin
    ipAddressEl.innerText = "Public IP: "+ip

    sendNotice("Public IP", ip)
}



const _console = console;
const createlog = (util) => (...args) => {
const fun = _console[util] ? _console[util] : _console.log;
	fun.apply(void 0, args);
};

const hello = (title, version) =>{
	createlog('log')(
		`%c ${title} %c V${version} `,
		'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;',
		'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;',
	);
}
var onInit = function() {
    getPublicIP()
    hello('ChromPluginTest','0.0.1');
};

document.addEventListener('DOMContentLoaded', onInit, false);

