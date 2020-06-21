/*global addAxes, dat, THREE */

//* Initialize webGL
var canvas = document.getElementById("myCanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('rgb(255, 255, 255)');    // set background color

// Create a new Three.js scene with camera and light
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height,
                                          0.1, 1000 );
camera.position.set(20,10,20);
camera.lookAt(scene.position);

var light = new THREE.PointLight();
scene.add( light );
scene.add(new THREE.AmbientLight(0xffffff));

var twoPI = 2*Math.PI;

var timeDifferece = 4;
//Radius of the cylindrical body of the Clock
var cylinderRadius = 5;
//Length of Minute Hand
var minuteHandLen = cylinderRadius-1;
//Hour Hand Length 
var hourHandLen = cylinderRadius-2;
//Height of the cylindrical body of the clock
var cylinderHeight = 1;
//Length of Second Hand of the Clock
var secondHandLen = cylinderRadius-1;
//Width of the Second hand of the Clock
var secondHandWidth = 0.1;
//Height of the Second hand of the Clock
var secondHandHeight = 0.1;
//Radius of the Blob
var blobRadius = 0.175;
//Length of the Big Mark
var bigMarkLen = cylinderRadius*0.2;
//Height of Big Mark
var bigMarkHeight = cylinderHeight +0.05;
//Width of Big Mark 
var bigMarkWidth = (twoPI*cylinderRadius)*0.005;
//Length of the Big Mark
var mark12Len = cylinderRadius*0.2;
//Height of Big Mark
var mark12Height = cylinderHeight + 0.05;
//Width of Big Mark 
var mark12Width = (twoPI*cylinderRadius)*0.01;
//Length of Small Mark
var smallMarkLen = 0.5;
//Height of Small Mark
var smallMarkHeight = cylinderHeight + 0.05;
//Width of Small Mark 
var smallMarkWidth = 0.1;
//Sides of the cylindrical body of the clock
var cylinderSides = 64;

//Geometry for the cylindrical body of the Clock
var cylinderGeometry = new THREE.CylinderBufferGeometry( cylinderRadius, cylinderRadius, cylinderHeight, cylinderSides );
var cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0xd3d3d3,wireframe:false} );
var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
scene.add( cylinder );

var hourXScale = 0.02;
var hourYScale = 0.02;
var hourZScale = 0.5;
//Triangles in Hour hand Sphere
var hourHandTriangle = 32;
var hourLeg = new THREE.SphereBufferGeometry( hourHandLen, hourHandTriangle, hourHandTriangle);
var materialHourLeg = new THREE.MeshBasicMaterial( {color: 0x000000,wireframe:false} );
var hourSphere = new THREE.Mesh( hourLeg, materialHourLeg );
//Back Hour Hand of the Clock
var hourSphereBack = new THREE.Mesh( hourLeg, materialHourLeg );
hourSphere.position.z = -hourHandLen/2;
hourSphere.position.y = cylinderHeight/2;
hourSphere.scale.set(hourXScale,hourYScale,hourZScale);
hourSphereBack.position.z = -hourHandLen/2;
hourSphereBack.position.y = -cylinderHeight/2;
hourSphereBack.scale.set(hourXScale,hourYScale,hourZScale);
cylinder.add( hourSphere );
cylinder.add( hourSphereBack );

var minuteXScale = 0.01;
var minuteYScale = 0.01;
var minuteZScale = 0.5;
//Triangles in Min hand Sphere
var minHandTriangle = 32;
//Geometry of Minute Hand of the Clock
var minuteLeg = new THREE.SphereBufferGeometry( minuteHandLen, minHandTriangle, minHandTriangle);
var materialMinuteLeg = new THREE.MeshBasicMaterial( {color: 0x000000,wireframe:false} );
var minuteSphere = new THREE.Mesh( minuteLeg, materialMinuteLeg );
//Back Minute Hand of the Clock
var minuteSphereBack = new THREE.Mesh( minuteLeg, materialMinuteLeg );
minuteSphere.position.z = -minuteHandLen/2;
minuteSphere.position.y =  cylinderHeight/2;
minuteSphere.scale.set(minuteXScale,minuteYScale,minuteZScale);
minuteSphereBack.position.z = -minuteHandLen/2;;
minuteSphereBack.position.y = -cylinderHeight/2;
minuteSphereBack.scale.set(minuteXScale,minuteYScale,minuteZScale);
cylinder.add( minuteSphere );
cylinder.add( minuteSphereBack );

//Geometry of Second Hand of the Clock
var secondHandGeo = new THREE.BoxBufferGeometry( secondHandWidth,secondHandHeight,secondHandLen,1,1,1 );
var secondHandMat = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var secondHandCube = new THREE.Mesh( secondHandGeo, secondHandMat );
secondHandCube.position.y = cylinderHeight/2;
secondHandCube.position.z = -secondHandLen/2;
cylinder.add(secondHandCube);
//Back Second Hand of the Clock
var secondhandCubeBack = new THREE.Mesh( secondHandGeo, secondHandMat );
secondhandCubeBack.position.y = -cylinderHeight/2;
secondhandCubeBack.position.z = -secondHandLen/2;
cylinder.add(secondhandCubeBack);

//PivotHour to change pivot of Hour Hand to origin
var pivotHour = new THREE.Object3D();
pivotHour.add( hourSphere );
cylinder.add( pivotHour );

//PivotHourBack to change pivot of Hour Back Hand to origin
var pivotHourBack = new THREE.Object3D();
pivotHourBack.add( hourSphereBack );
cylinder.add( pivotHourBack );

//PivotMin to change pivot of Minute Hand to origin
var pivotMin = new THREE.Object3D();
pivotMin.add( minuteSphere );
cylinder.add( pivotMin );

//PivotMinBack to change pivot of Minute Back Hand to origin
var pivotMinBack = new THREE.Object3D();
pivotMinBack.add( minuteSphereBack );
cylinder.add( pivotMinBack );

//PivotSecond to change pivot of Second Hand to origin
var pivotSecond = new THREE.Object3D();
pivotSecond.add(secondHandCube);
cylinder.add(pivotSecond);

//PivotSecondBack to change pivot of Second Back Hand to origin
var pivotSecondBack = new THREE.Object3D();
pivotSecondBack.add(secondhandCubeBack);
cylinder.add(pivotSecondBack);

var blobXScale = 2;
var blobYScale = 4;
var blobZScale = 2;
//Geometry of the Blob 
var blob = new THREE.SphereBufferGeometry( blobRadius, 32, 32);
var materialblob = new THREE.MeshBasicMaterial( {color: 0x000000,wireframe:false} );
var blobSphere = new THREE.Mesh( blob, materialblob );
blobSphere.scale.set(blobXScale,blobYScale,blobZScale);
cylinder.add( blobSphere );

//Big Mark of the Clock
var bigMarkGeo = new THREE.BoxBufferGeometry( bigMarkWidth,bigMarkHeight,bigMarkLen,1,1,1 );
var bigMarkMat = new THREE.MeshBasicMaterial( {color: 0x000000} );

//Mark at 12 of the clock
var mark12Geo = new THREE.BoxBufferGeometry( mark12Width,mark12Height,mark12Len,1,1,1 );
var martk12Mat = new THREE.MeshBasicMaterial( {color: 0x00Cfff} );
var markObj = new THREE.Mesh( mark12Geo, martk12Mat );
markObj.position.z = -(cylinderRadius-mark12Len/2-0.01);
cylinder.add(markObj);	

//Small Mark of the Clock
var smallMarkGeo = new THREE.BoxBufferGeometry( smallMarkWidth,smallMarkHeight,smallMarkLen,1,1,1 );
var smallMarkMat = new THREE.MeshBasicMaterial( {color: 0x000000} );

var markingSize = 12;
//Array to create Markings on the Clock
var marks = new Array(markingSize);
var pivot = new Array(markingSize);
	for(var i=1;i<markingSize;i++){
		marks[i] = new THREE.Mesh( bigMarkGeo, bigMarkMat );
		marks[i].position.z = -(cylinderRadius-bigMarkLen/2-0.01);
		pivot[i] = new THREE.Object3D();
		pivot[i].add(marks[i]);
		pivot[i].rotation.y = (twoPI/markingSize)*i;
		cylinder.add(pivot[i]);	
	}	

var secondMarkSize = 60;
//Array to create Markings on the Clock
var mark = new Array(secondMarkSize);
var piv = new Array(secondMarkSize);
	for(var i=0;i<secondMarkSize;i++){
		if(i%5!=0){
			mark[i] = new THREE.Mesh( smallMarkGeo, smallMarkMat );
			mark[i].position.z = -(cylinderRadius-smallMarkLen/2-0.01);;
			piv[i] = new THREE.Object3D();
			piv[i].add(mark[i]);
			piv[i].rotation.y = (twoPI/secondMarkSize)*i;
			cylinder.add(piv[i]); 
		}
	} 
//Rotate the Cylindrical Object
cylinder.rotateY(2*Math.PI/60*7);
cylinder.rotateX(2*Math.PI/60*10);
 
var computerClock = new THREE.Clock();
var controls = new THREE.TrackballControls( camera );

addAxes(scene);

function render() {
    requestAnimationFrame(render);

    var dt = computerClock.getDelta();  // must be before call to getElapsedTime, otherwise dt=0 !!!
    var t = computerClock.getElapsedTime();
	//Date function in order to get locale time
	var d = new Date();
	//getHours return the current hour 
	var hours = d.getHours();
	//getMinutes return the current minutes 
	var minutes = d.getMinutes();
	//getSeconds return the current seconds 
	var seconds = d.getSeconds();
	//Hour,Minute and Second Hands at both sides are updates with the rotation in radians
	var secondRadians = twoPI*seconds/secondMarkSize;
	var minuteRadians = twoPI*minutes/secondMarkSize;
	var hourRadians = twoPI*hours/markingSize;
	var hourRadians2 = twoPI*(hours+timeDifferece)/markingSize;
	pivotHour.rotation.y = -hourRadians-minuteRadians/markingSize;
	pivotHourBack.rotation.y = hourRadians2+minuteRadians/markingSize;
	pivotMin.rotation.y = -minuteRadians;
	pivotMinBack.rotation.y = minuteRadians;
	pivotSecond.rotation.y = -secondRadians;
	pivotSecondBack.rotation.y = secondRadians;
	
	
  controls.update();
  renderer.render(scene, camera);
}
render();
