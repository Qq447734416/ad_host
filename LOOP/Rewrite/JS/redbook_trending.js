//屏蔽小红书"猜你想搜"


let body = {
  "code": 0,
  "success": true,
  "data": {}
};

body = JSON.stringify(body);
$done({body:body});
