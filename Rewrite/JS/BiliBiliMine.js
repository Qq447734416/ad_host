//修改内容
let new_items = [{
                        "id": 501,
                        "title": "设置",
                        "uri": "bilibili://user_center/setting",
                        "icon": "http://i0.hdslb.com/bfs/archive/e932404f2ee62e075a772920019e9fbdb4b5656a.png",
                        "common_op_item": {}
                    }];

//获取原始响应体
let new_response_body = $response.body;
//判断响应体是否为空，若不为空：
if(new_response_body){
  try{
  //将响应体转化为对象
  new_response_body = JSON.parse(new_response_body);
  //判断路径是否存在，不存在则创建并赋值为一个空数组
  if(!new_response_body.data){
    new_response_body.data = {};}
  if(!new_response_body.data.sections_v2){
    new_response_body.data.sections_v2 = {};}
  if(!new_response_body.data.sections_v2.items){
    new_response_body.data.sections_v2.items = {};}
  
    //修改原始响应体内容
    new_response_body.data.sections_v2.items = new_items;
    //转化为json
    new_response_body = JSON.stringify(new_response_body);
    $done({ body: new_response_body});    
  }catch (e) {
    //如果响应体不是JSON格式，直接返回原始响应体
    console.log("响应体不是json格式:", e);
    $done({ body: new_response_body});
}
//若为空
} else {
  // 如果没有响应体，直接返回
  console.log("错误：无响应体");
  $done();
}
