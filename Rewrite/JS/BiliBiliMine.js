let new_items = [{
                    "id": 501,
                    "title": "设置",
                    "uri": "bilibili://user_center/setting",
                    "icon": "http://i0.hdslb.com/bfs/archive/e932404f2ee62e075a772920019e9fbdb4b5656a.png",
                    "common_op_item": {}
                }];
//获取原始响应体
let new_response_body = $response.body;
//判断响应体是否为空
if(new_response_body){
  try{
    //转化为json格式
    new_response_body = JSON.parse(new_response_body);


    new_response_body.data.sections_v2[1].items = new_items

    new_response_body = JSON.stringify(new_response_body);

    $done({ body: new_response_body });    
  } catch (e) {
    console.log("响应体不是json格式:", e);
    $done({ body: new_response_body });
  }
} else {
  console.log("错误：无响应体");
  $done({});
}



