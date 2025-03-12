//精简国际版B站“我的”页面tab


let body = $response.body;
//若请求体不为空
if(body){
  try{
    //修改数据
    body = JSON.parse(body);
    let setting_index = body.data.sections_v2[1].items.findIndex(item => item.title === '设置');  //找到设置的索引
    //确保已正确取到索引，若未取到索引则返回原始数据
    if(setting_index !== -1){
      let new_items = [body.data.sections_v2[1].items[setting_index]];
      body.data.sections_v2[1].items = new_items;
      //返回修改后的数据
      body = JSON.stringify(body);
      console.log("修改成功");
      $done({body:body});
    }else{
      console.log("未找到”设置“的索引");
      //发送通知
      let title = "脚本运行错误";
      let content = "未找到”设置“的索引，脚本：" + $script.name;
      $notification.post({title, subtitle:"", content});
      //返回原始数据
      $done({});
    } 
  }catch(e){
    console.log("修改请求体失败",e );
    //发送通知
    let title = "脚本运行失败";
    let content = "修改请求体失败,脚本：" + $script.name;
    $notification.post({title, subtitle:"", content});
    //返回原始数据
    $done({});
  }
}else{
  console.log("响应体为空");
  let title = "脚本运行错误";
  let content = "响应体为空，脚本：" + $script.name;
  $notification.post({title, subtitle:"", content});
  //返回原始数据
  $done({});
}
