var EmscConfig = {
api: {url: 'http://test-fred.emsc-csem.org:8080/service/api/1.0/get.json', key: 'apikey=addon', addon_key: '5A', app_key:'5A' },
socket_io: {url: 'http://test-fred.emsc-csem.org:8082/test'},
settings: {timers:2, min_mag:1,notPos:'RC',screenAlert:true,shakeAlert:true,shakeAlertMag:1,audioAlert:true,audioAlertMag:2},
audio: {url: 'http://test-fred.emsc-csem.org:8080/Tools/Audio/',test:{mag:4.5,region:'CENTRAL ITALY',ago:4}},
video: {url: 'http://test-fred.emsc-csem.org:8080/Earthquake/Contribute/Pictures/upload_multi.php',params:{evid:0},coords:{lat:0,lng:0}},

android: {senderID:'869856509191'},
register: {
	push:{url:'http://test-fred.emsc-csem.org:8080/RegisterApp.php'},
	app:{url:'http://test-fred.emsc-csem.org:8080/addons/register.php'}
},	
debug:true
};
function register_app(self) { 
	var req=framework.extension.getRequest();
	req.open("POST",'http://test-fred.emsc-csem.org:8080/addons/register.php',true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.onreadystatechange =  function () {  
			if(req.readyState == 4) { /*framework.extension.log*//*alert(req.responseText);*/ var info=JSON.parse(req.responseText); if(info.addon_key && (info.addon_key!='')) { self.setExtensionKey(info.addon_key); } }
	};
	req.send('agent='+navigator.userAgent+'&version='+framework.extension.version);
}