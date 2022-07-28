let uploadedFile1 = document.getElementById("file1")
let uploadedFile2 = document.getElementById("file2")

uploadedFile1.addEventListener("input", function (e) {

  document.getElementById("uploadbtn1").innerHTML = uploadedFile1.files[0].name.toString().substring(0,8);
  
})

uploadedFile2.addEventListener("input", function (e) {

  document.getElementById("uploadbtn2").innerHTML = uploadedFile1.files[0].name.toString().substring(0,8);
  
})
