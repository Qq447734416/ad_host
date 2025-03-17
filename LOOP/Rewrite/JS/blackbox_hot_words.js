//去除小黑盒热搜内容


let new_hot_words = {
    "msg": "",
    "result": {
        "mini_programs": [],
        "ads_banner": [],
        "list": [],
        "default_q": "",
        "header": "",
        "hashtag_list": []
    },
    "status": "ok"
};
$body = $response.body;
if(body){
  try{
    $done({body:new_hot_words});
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
