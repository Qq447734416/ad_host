//删除小黑盒推荐信息流广告


let body = $response.body;
if(body){
  try{
    //修改数据
    body = JSON.parse(body);
    body.result.ad_info = {};
    body = JSON.stringify(body);
    //返回数据
    console.log(`修改成功, 时间:${$script.startTime}`);
    $done({body:body});
  }catch(e){
    //发送通知
    let title = "脚本运行失败";
    let content = "修改请求体失败,脚本：" + $script.name;
    $notification.post(title, "", content);
    console.log(`修改请求体失败, 时间：${$script.startTime}, 错误：${e}`);
    //返回原始数据
    $done({});
  }
}else{
  let title = "脚本运行错误";
  let content = "响应体为空，脚本：" + $script.name;
  $notification.post(title, "", content);
  console.log(`响应体为空，时间：${$script.startTime}`);
  //返回原始数据
  $done({});
}
