export class DB {
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

  _uploadFile = async (url, obj) => {
    // console.log(file);
    // const formData = new FormData();
    // formData.append("file", file);
    // console.log("formData", formData);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
      // body: formData,
    });
    return res;
  };
}
