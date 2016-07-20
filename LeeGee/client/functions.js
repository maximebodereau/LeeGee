import BABYLON from 'babylonjs';

Meteor.functions = {
  initGame: function() {
    //mesh.actionManager = new BABYLON.ActionManager(scene);
    var city = BABYLON.Mesh.CreateTorus("city", 2, 2, 60, scene);
    city.material = new BABYLON.StandardMaterial("Mat", scene);
    city.checkCollisions = true;
  },

  // Camera
  initCamera: function() {
    camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,10,10), scene);
    camera.setTarget(new BABYLON.Vector3(0,0,10));
    camera.attachControl(canvas);
    //camera.applyGravity = true;
    camera.checkCollisions = true;
    //Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -5, 0);
    // Enable Collisions
    scene.collisionsEnabled = true;
    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
  },

  // Skybox
  skyBox: function () {
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        skybox.checkCollisions = true;
  },

  // Create light
  lights: function () {
    var light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 10, 0), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(50, 50, 50);
        light.groundColor = new BABYLON.Color3(0, 0, 0);
  },

  //Ground
  ground: function () {
    var extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
    var extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
        extraGroundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
        extraGroundMaterial.diffuseTexture.uScale = 60;
        extraGroundMaterial.diffuseTexture.vScale = 60;
        extraGround.position.y = -2.05;
        extraGround.material = extraGroundMaterial;
        extraGround.checkCollisions = true;


    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMap.png", 1000, 1000, 100, 0, 10, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
        groundMaterial.diffuseTexture.uScale = 10;
        groundMaterial.diffuseTexture.vScale = 10;
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.position.y = -8.0;
        ground.material = groundMaterial;
        ground.checkCollisions = true;
  },

  // Main Scene
  initScene: function() {
     // Get canvas
     canvas = document.getElementById("renderCanvas");
     // Create babylon engine
     engine = new BABYLON.Engine(canvas, true);
     // Create scene
     scene = new BABYLON.Scene(engine);

     Meteor.functions.initCamera();

     Meteor.functions.skyBox();

     Meteor.functions.lights();

     Meteor.functions.ground();

     engine.runRenderLoop(function () {
         scene.render();
     });

     Meteor.functions.initGame();
 }
};
