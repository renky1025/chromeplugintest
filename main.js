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

function getPublicIP() {
fetch("http://jsonip.com").then((response) => response.json())
.then((data) => {
	console.log(data)
	let ip = data.ip
	ipAddressEl.innerText = "Public IP: "+ip
}).catch(err => {
	console.error(err)
})
}

getPublicIP()