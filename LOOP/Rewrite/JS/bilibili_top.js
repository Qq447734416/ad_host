//删除国际版B站首页“直播”tab


let body = $response.body;
//若请求体不为空，则修改并返回被修改后的请求体，否则返回原始数据
if(body){
  try{
    //修改数据
    body = JSON.parse(body);
    let live_index = body.data.tab.findIndex(item => item.name === '直播');
    if(live_index !== -1){
      body.data.tab.splice(live_index, 1);
    }else{
      console.log("未找到需要修改的数据");
      //发送通知
      let title = "脚本运行错误";
      let content = "未找到需要修改的数据，脚本：" + $script.name;
      $notification({title, subtitle:"", content});
      //返回原始数据
      $done({});
    }
    
    //返回数据
    body = JSON.stringify(body);
    console.log("修改成功");
    $done({body:body});
  }catch(e){
    console.log("修改请求体失败", e);
    //发送一个本地通知
    let title = "脚本运行错误";
    let content = "修改请求体失败，脚本：" + $script.name;
    $notification({title, subtitle:"", content });
    //返回原始数据
    $done({});
  }
}else{
  console.log("错误，响应体为空");
  //发送本地通知
  let title = "脚本运行错误";
  let content = "响应体为空，脚本：" + $script.name;
  $notification({title, subtitle:"", content});
  //返回原始数据
  $done({});
}
