//去除小红书首页信息流广告


let body = $response.body;
if(body){
  try{
    body = JSON.parse(body);
    body.data = body.data.filter(item => item.is_ads === false);
    body = JSON.stringify(body);
    $done({body:body});
  }catch(e){
    console.log("修改请求体失败",e );
    //发送通知
    let title = "脚本运行失败";
    let content = "修改请求体失败,脚本：" + $script.name;
    $notification.post({title,content});
    //返回原始数据
    $done({});
  }
}else{
  console.log("响应体为空");
  let title = "脚本运行错误";
  let content = "响应体为空，脚本：" + $script.name;
  $notification.post({title,content});
  //返回原始数据
  $done({});
}
