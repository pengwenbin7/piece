"use strict";

var xhr = new XMLHttpRequest();
var uploadProgress = document.getElementById("upload_progress");
var fileUrl = document.getElementById("file_url");
var formData = new FormData();
var LEN = 1024 * 1024;

function startUpload() {
    // obtain input element through DOM
    var file = document.getElementById("upload5_file").files[0];
    if(file){
	upload5(file);
    }
}

// upload file to server
function upload5(file) {
    formData.append("pos", 0);
    formData.append("segment", 0);
    formData.append("file_name", file.name);
    formData.append("upload_date", new Date().valueOf());
    var lengthAll = file.size;
    formData.append("file_size", lengthAll);
    var uploaded = 0;
    var total = Math.round(lengthAll / LEN + 0.5);
    formData.append("total", total);
    xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {
	    if (xhr.responseText == 1) {
		uploaded += 1;
		if (uploaded == total) {
		    xhr.open("POST", "upload5.php", true);
		    formData.set("pos", total);
		    formData.set("total", total);
		    formData.delete("segment");
		    xhr.send(formData);
		} else {
		    uploadSegment(uploaded);
		}
	    } else if (xhr.responseText == 0) {
		alert("upload error");
	    } else {
		fileUrl.innerHTML = xhr.responseText;
		alert("OK");
	    }
	}
    }
    
    uploadSegment(0);
    
    function uploadSegment(i) {
	formData.set("pos", i);
	formData.set("segment", file.slice(i * LEN, (i + 1) * LEN));
	xhr.open("POST", "upload5.php", true);
	xhr.send(formData);
    }
}
