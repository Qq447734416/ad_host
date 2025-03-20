//小红书侧边栏精简


let new_array = [
        "sidebar_config_draft",
        "sidebar_config_home_comment",
        "sidebar_config_history",
        "sidebar_config_divider",
        "sidebar_config_order",
        "sidebar_config_cart",
        "sidebar_config_wallet",
        "sidebar_config_divider",
        "sidebar_config_applets_homepage",
    ];
//获取原始响应体
let body = $response.body;
console.log("成功获取响应体");
//如果body存在存在，则修改并返回修改后的内容，如果不存在则返回原始内容
if(body){
  //尝试将body转化为JS对象并修改数据,失败则返回原始内容
  try{
    body = JSON.parse(body);
    //修改数据
    body.data.sideConfigHomepage.hierarchy.structure.body = new_array;
    body.data.sideConfigPersonalPage.hierarchy.structure.body = new_array;
    body = JSON.stringify(body);
    //返回修改后的数据
    console.log("修改成功");
    $done({body:body});
        
  }catch(e){
    console.log("修改失败：" + e );
    //发送一个本地通知
    let title = "脚本运行错误";
    let subtitle = "";
    let content = "响应体不为json格式或修改响应体数时出现错误，脚本名称：" + $script.name;
    $notification.post(title ,subtitle, content);
    $done({});  
  }
}else{
    console.log("错误，响应体内容为空");
    //发送一个本地通知
    let title = "脚本运行错误";
    let subtitle = "";
    let content = "响应体为空，脚本名称：" + $script.name;
    $notification.post(title ,subtitle, content);
  $done({});
}


