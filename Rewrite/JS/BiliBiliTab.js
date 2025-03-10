let new_tab = [
  {
    "id": 477,
    "name": "推荐",
    "uri": "bilibili://pegasus/promo",
    "tab_id": "推荐tab",
    "pos": 2,
    "default_selected": 1
  },
  {
    "id": 478,
    "name": "热门",
    "uri": "bilibili://pegasus/hottopic",
    "tab_id": "热门tab",
    "pos": 3
  }
];

let response = $response.body;
if (response) {
  try {
    let responseObj = JSON.parse(response);

    // 确保 responseObj.data 存在
    if (!responseObj.data) {
      responseObj.data = {};
    }

    responseObj.data.tab = new_tab; // 修改数据
    let modifiedResponse = JSON.stringify(responseObj);

    $done({ body: modifiedResponse });
  } catch (e) {
    // 如果响应体不是JSON格式，直接返回原始响应体
    console.log("响应体不是json格式:", e);
    $done({ body: response });
  }
} else {
  // 如果没有响应体，直接返回
  console.log("错误：无响应体");
  $done();
}
