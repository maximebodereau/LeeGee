import BABYLON from 'babylonjs';

Meteor.functions = {

  //Animation
  animateLife: function () {
    animationBox = new BABYLON.Animation("living", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    // An array with all animation keys
    keys = [];
    keys.push({
    frame: 0,
    value: 1
    });
    keys.push({
    frame: 20,
    value: 0.9
    });
    keys.push({
    frame: 40,
    value: 0.8
    });
    keys.push({
    frame: 60,
    value: 0.9
    });
    keys.push({
    frame: 100,
    value: 1
    });
    // Adding the animation array to the animation object
    animationBox.setKeys(keys);

  },

  initGame: function() {
    //mesh.actionManager = new BABYLON.ActionManager(scene);
    city = BABYLON.Mesh.CreateTorus("city", 2, 2, 60, scene);
    city.material = new BABYLON.StandardMaterial("Mat", scene);
    city.checkCollisions = true;

    console.log("city:"+city.position);

    city.animations.push(animationBox);
    scene.beginAnimation(city, 0, 100, true);

    var generator = new BABYLON.ShadowGenerator(512, light);
    generator.getShadowMap().renderList.push(city);
  },

  // Camera
  initCamera: function() {
    camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-8.994301365167633,15.137315531488085,-25.236160666585597), scene);
    camera.setTarget(new BABYLON.Vector3(0,0,0));
    camera.attachControl(canvas);
    //camera.applyGravity = true;
    camera.checkCollisions = true;
    //Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -5, 0);
    // Enable Collisions
    scene.collisionsEnabled = true;
    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    console.log("camera:"+camera.position);
  },

  // Skybox
  skyBox: function () {
    skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
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
    light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 5, 0), scene);
    console.log("light:"+light.position);
  },

  //Ground
  ground: function () {
    extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
    extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
        extraGroundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
        extraGroundMaterial.diffuseTexture.uScale = 0;
        extraGroundMaterial.diffuseTexture.vScale = 0;
        extraGround.position.y = -2.05;
        extraGround.material = extraGroundMaterial;
        extraGround.checkCollisions = true;

    ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMap.png", 1000, 1000, 100, 0, 10, scene, false);
    groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
        groundMaterial.diffuseTexture.uScale = 10;
        groundMaterial.diffuseTexture.vScale = 10;
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.position.y = -8.0;
        ground.material = groundMaterial;
        ground.checkCollisions = true;

  },

  //Shadows
  shadows: function () {
  //   generator = new BABYLON.ShadowGenerator(512, light);
	//   generator.getShadowMap().renderList.push(city);
  //   ground.receiveShadows = true;
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

     Meteor.functions.animateLife();

     Meteor.functions.ground();

     Meteor.functions.shadows();

     Meteor.functions.initGame();

     engine.runRenderLoop(function () {
         scene.render();
     });

 }
};
