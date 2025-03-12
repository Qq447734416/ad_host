//小红书侧边栏精简

console.log("1");
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
console.log("2");
//获取原始响应体
let body = $request.body;
console.log("3");
//如果body存在存在，则修改并返回修改后的内容，如果不存在则返回原始内容
if(body){
  //尝试将body转化为JS对象并修改数据,失败则返回原始内容
  try{
    body = JSON.parse(body);
        console.log("4");
    //修改数据
    body.data.sideConfigHomepage.hierarchy.structure.body = new_array;
          console.log("5");
    body.data.sideConfigPersonalPage.hierarchy.structure.body = new_array;
          console.log("6");
    body = JSON.stringify(body);
    $done({body:body});
    console.log("修改成功。");    
  }catch(e){
    console.error("错误：",e );
          console.log("7");
    $done({});  
  }
}else{
  console.error("错误，响应体内容为空");
        console.log("8");
  $done({});
}


