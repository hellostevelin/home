// 創建 Babylon.js 引擎
var canvas = document.getElementById("background");
var engine = new BABYLON.Engine(canvas, true);

// 創建場景
var scene = new BABYLON.Scene(engine);

scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.9);

// 創建相機
var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// 創建燈光
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// 創建粒子系統
var particleSystem = new BABYLON.ParticleSystem("particles", 5000, scene);
particleSystem.particleTexture = new BABYLON.Texture("assets/particle.svg", scene);
particleSystem.emitter = new BABYLON.Vector3(0, 0, 0);
particleSystem.minSize = 0.1;
particleSystem.maxSize = 0.5;
particleSystem.minLifeTime = 0.5;
particleSystem.maxLifeTime = 3.0;
particleSystem.emitRate = 1000;
particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
particleSystem.direction1 = new BABYLON.Vector3(-1, -1, -1);
particleSystem.direction2 = new BABYLON.Vector3(1, 1, 1);
particleSystem.minEmitPower = 1;
particleSystem.maxEmitPower = 3;
particleSystem.start();

// // 在場景中創建文字網格

var text = "Welcome \n \n Please feel free to contact me \n via email at \n hello.stevelin@gmail.com";

var textMesh = BABYLON.MeshBuilder.CreatePlane("textMesh", {width: 3, height: 2, size: 2}, scene);
var textTexture = new BABYLON.DynamicTexture("textTexture", {width: 512, height: 512}, scene);


var lines = text.split("\n"); // 將文本按照換行符分割成多行

var lineHeight = 60; // 行高
var y = 140; // 垂直位置

lines.forEach(function(line,index) {
  if (index==0) {
    textTexture.drawText(line, null, y, "bold 56px 'Georgia'", "white", "transparent", true);
  } else {
    textTexture.drawText(line, null, y, "normal 32px 'Georgia'", "white", "transparent", true);
  }
  
  y += lineHeight; // 更新垂直位置，用於下一行的繪製
});


textMesh.material = new BABYLON.StandardMaterial("textMaterial", scene);
textMesh.material.diffuseTexture = textTexture;
textMesh.position.y = 1; // 調整文字網格的位置

// 渲染場景
engine.runRenderLoop(function () {
  scene.render();
});