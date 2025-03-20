//删除国际版B站首页“直播”tab


let body = $response.body;
//若请求体不为空，则修改并返回被修改后的请求体，否则返回原始数据
if(body){
  try{
    body = JSON.parse(body);
    let live_index = body.data.tab.findIndex(item => item.name === '直播');
    if(live_index !== -1){
      //修改数据
      body.data.tab.splice(live_index, 1);
    }else{
      //发送通知
      let title = "脚本运行错误";
      let content = "未找到需要修改的数据，脚本：" + $script.name;
      $notification.post(title, "", content);
      console.log(`未找到需要修改的数据,时间：${$script.startTime}`);
      //返回原始数据
      $done({});
    }
    //返回数据
    body = JSON.stringify(body);
    console.log(`修改成功, 时间：${$script.startTime}`);
    $done({body:body});
  }catch(e){
    //发送通知
    let title = "脚本运行错误";
    let content = "修改请求体失败，脚本：" + $script.name;
    $notification.post(title, "", content);
    console.log(`修改请求体失败, 时间： ${$script.startTime}, 错误：${e}`);
    //返回原始数据
    $done({});
  }
}else{
  //发送本地通知
  let title = "脚本运行错误";
  let content = "响应体为空，脚本：" + $script.name;
  $notification.post(title, "", content);
  console.log(`错误，响应体为空, 时间：${$script.startTime}`);
  //返回原始数据
  $done({});
}
