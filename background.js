/**
 * 注册标签页更新时的事件
 * 这里调用了initialize()事件，把func.js注入当前标签页中 
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    initialize(tabId);
});

/**
 * 注册切换标签页时的事件
 * 这里调用了initialize()事件，把func.js注入当前标签页中
 */
chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
    initialize(tabId);
});

/**
 * 初始化方法 ，注入func.js事件
 * @param {Object} tabId
 */
function initialize(tabId){
    chrome.tabs.executeScript(tabId, {file: "func.js", allFrames: true});
    chrome.tabs.executeScript(tabId, {file: "jquery-1.11.2.js", allFrames: true});   
}

/**
 * 启动一个chrome.extension.onRequest事件监听器用来处理消息
 */
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.executeScript(null, {code: "switchLight("+ request +");", allFrames: true});
});
// 格式化时间函数
Date.prototype.format = function(format){
    var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1 ? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
function shownotice(msg) {
	var time = new Date().format('yyyy-MM-dd hh:mm:ss');
  	// 创建一个notification
  	var options ={
	  type: "basic",
	  title: "Primary Title",
	  message: "现在的时间是："+time + " \n "+msg,
	  iconUrl: "images/door.png"
  	};
 	chrome.notifications.create("id", options, function() {});
}
if(chrome.notifications){
	shownotice("1231");
}
