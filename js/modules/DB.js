/**
 * 通用DB类
 *
 */
export class DB {
  // 向后台发送post请求
  _sendByPost = async (url, obj) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return res;
  };
}
