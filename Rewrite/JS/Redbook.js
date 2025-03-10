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

//获取原始响应
let body = $response.body;
//判断响应体是否为空，若不为空：
if(body){
  //尝试将响应体格式转换为JS对象,若出错，则报错并返回原始内容
  try{
    body = JSON.parse(body);
  }catch(e){
    console.error("错误，响应体不是json：",e );
    body = $response.body;
    $done({body : body});
  }
//尝试修改响应体，若失败则返回原始内容
  try{
    body.data.sideConfigHomepage.hierarchy.structure.body = new_array;
    body.data.sideConfigPersonalPage.hierarchy.structure.body = new_array;
    $done({ body : body});
  }catch(e){
    console.error("修改响应体失败");
    body = $response.body;
    $done({ body : body });    
     }
}else{
  console.error("原始响应体为空");
  body = $response.body;
  done({ body : body });
}
  
