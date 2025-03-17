//删除"我的"页面游戏小卡片
//删除"我的任务"下方小字

let body = $response.body;
if(body){
  try{
    body = JSON.parse(body);
    //修改数据
    body.result.game_card_setting = {};
    body.result.game_cards = [];
    body.result.task_desc = "";
    //返回数据
    body = JSON.stringify(body);
    $done({body:body});
  }catch(e){
    console.log("修改请求体失败", e);
    //发送一个本地通知
    let title = "脚本运行错误";
    let content = "修改请求体失败，脚本：" + $script.name;
    $notification.post({title, subtitle:"", content });
    //返回原始数据
    $done({});
  }
}else{
  console.log("错误，响应体为空");
  //发送本地通知
  let title = "脚本运行错误";
  let content = "响应体为空，脚本：" + $script.name;
  $notification.post({title, subtitle:"", content});
  //返回原始数据
  $done({});
}
