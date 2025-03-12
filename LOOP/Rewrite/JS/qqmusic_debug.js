//关闭QQ音乐一些debug


let body = $response.body;
//请求体不为空则尝试修改，请求体为空或修改失败返回原始数据
if(body){
  try{
    body = JSON.parse(body);
    //修改数据
    body.data.switch.debugIdReport = false;
    body.data.switch.globalSwitch = false;
    body.data.switch.safeUniqueIdReport = false;
    body.data.switch.samplingEventReport = false;
    body.data.switch.uniqueIdReport = false;
    body.data.switch.vendorOAIDReport = false;
    //返回修改后的数据
    body = JSON.stringify(body);
    console.log("修改成功");
    $done({body:body});
  }catch(e){
    console.log("修改响应体失败：", e);
    //发送通知
    let title = "脚本运行错误";
    let content = "修改响应体失败,脚本：" + $script.name;
    $notification.post({title, subtitle:"", content });
    //返回原始数据
    $done({});
  }
}else{
    console.log("错误，响应体为空");
    //发送通知
    let title = "脚本运行错误";
    let content = "错误，响应体为空,脚本：" + $script.name;
    $notification.post({title, subtitle:"", content });
    //返回原始数据
    $done({});
}
