const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");
downloadBtn.addEventListener("click", (e) => {
  e.preventDefault(); //preventing form from submitting
  downloadBtn.innerText = "downloading file...";
  fetchFile(fileInput.value);
});
function fetchFile(url) {
  //fetching file &  returning response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      //URL.createObjectURL creates a url of passed object
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl; //passing tempUrl as href value of <a> tag
      //passing fil last name & extension as download value of <a> tag
      aTag.download = url.replace(/^.*[\\\/]/, "");
      document.body.appendChild(aTag);
      aTag.click(); //clicking <a> tag so the file download
      aTag.remove(); //removing <a> tag once file download
      URL.revokeObjectURL(tempUrl); //removing tempuRL form the downloading
      downloadBtn.innerText = "Download File";
    })
    //catch method will if any error comes during downloading file
    .catch(() => {
      downloadBtn.innerText = "Download File";
      alert("Failed to download file!");
    });
}
