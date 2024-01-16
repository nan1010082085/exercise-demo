this.name = '测试web worker api';

function init() {
  console.log('初始化 test worker');
}

function send() {
  this.postMessage('send test worker of 3s message');
}

this.onmessage = (e) => {
  console.log('接收主进程消息', e);
};

// 三秒后向主进程发送一条消息
setTimeout(() => {
  send();
}, 3000);

init();
