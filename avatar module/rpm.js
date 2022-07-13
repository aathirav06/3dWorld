const saveAvatar = document.querySelector("#saveavatar");

saveAvatar.addEventListener("click", async (e) => {
  e.preventDefault();
  const reviewRes = await fetch(`/`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      url: json.data.url,
    }),
  });
  const response = await reviewRes.json();
  console.log(response);
  if (response.status === "success") {
    //successful response - proceeds to download
  } else {
    //failed response, reload page and try again.
  }
});
