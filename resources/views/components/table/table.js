for (i in basedata) {
  console.log("Basedata from " + i + basedata[i])
}


window.onload = () => {
  for (i in basedata) {
    $("#collapseOne").append("Basedata i: " +  i + basedata[i] +"<br>")
    //$("#collapseTwo").append("Basedata j: " +  j + "<br>")
  }
}
