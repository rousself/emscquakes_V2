// Called when capture operation is finished
function captureSuccess(mediaFiles) {
	var i, len;
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		uploadToServer(mediaFiles[i].fullPath,mediaFiles[i].name);
	}       
}

// Called if something bad happens.
function captureError(error) {
	var msg = 'An error occurred during capture: ' + error.code;
	navigator.notification.alert(msg, null, 'Uh oh!');
}

function uploadToServer(mediaFilePath,name) {
		var ext=name.split('.').pop();
		var options = new FileUploadOptions();
		options.fileName=name; options.fileKey='Filedata';
		switch (ext) {
			case "jpeg": 
			  options.mimeType="image/jpeg";
			  break;
			case "png": 
			  options.mimeType="image/png";
			  break;  
			 case "mp4": 
			  options.mimeType="video/mp4";
			  break; 
		}
		options.params=jQuery.extend(EmscConfig.video.params, EmscConfig.video.coords);//EmscConfig.video.params;
		$('#status').removeClass('hide');
		var statusDom=$('#status').get(0); statusDom.innerHTML = "Loading..."
		var ft = new FileTransfer();
		ft.onprogress = function(progressEvent) {
			if (progressEvent.lengthComputable) {
				var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
				statusDom.innerHTML = perc + "% loaded...";
			} else {
				if(statusDom.innerHTML == "") statusDom.innerHTML = "Loading";
				else statusDom.innerHTML += ".";
			}
		};
		ft.upload(mediaFilePath, EmscConfig.video.url, winTrans, failTrans, options);
}
function winTrans(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	$('#status').addClass('hide');
}
function failTrans(error) {
	console.log("An error has occurred: Code = " + error.code);
	console.log("upload error source " + error.source);
	console.log("upload error target " + error.target);
	$('#status').addClass('hide');
}



// A button will call this function
function captureVideo() {
	localise();
	// Launch device video recording application,  allowing user to capture up to 2 video clips
	navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
}
function Picture(SourceType) {
	localise();
	navigator.camera.getPicture(
            function(imageData) {  console.log('ok picture');
				var npath = imageData.replace("file://localhost",'');
				//See more at: http://blog.workinday.com/application_smartphone/308-phonegap-prendre-et-uploader-une-photo-sur-ios-et-android.html#sthash.aazXljrv.dpuf
				uploadToServer(npath,npath.substr(npath.lastIndexOf('/')+1));
               // $('#image').attr('src', "data:image/jpeg;base64," + imageData);
            },
            function() { 
				console.log('Error taking picture');   
			},
            { quality: 50, targetWidth:600, encodingType: 0 /* 0=JPG 1=PNG*/, mediaType:2 /*all media allow*/,destinationType:1,saveToPhotoAlbum:true, sourceType: SourceType }	
     
	 );
			   // destinationType: Camera.DestinationType.DATA_URL, //0=DATA_URL (base64), 1=FILE_URI, 2=NATIVE_URI
				//sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
				//encodingType: 0 ,    // 0=JPG 1=PNG
				//saveToPhotoAlbum: true,
}
function localise() {
	if (!navigator.geolocation) { console.log("geolocation API not supported", "Error"); }
	else {
		console.log('launch pos');
		navigator.geolocation.getCurrentPosition(
			function(position) {
				EmscConfig.video.coords=position;
			}, 
			function(error) {console.log('error position code: '+error.code+ '\n' +'message: ' + error.message + '\n');}
		);
	}
}



function notify(){
 navigator.notification.vibrate(2500); navigator.notification.beep(3);
}

function testAudio() {
	var music=new AudioAlert(); 
		music.play();
}	
