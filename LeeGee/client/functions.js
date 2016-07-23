import BABYLON from 'babylonjs';

Meteor.functions = {

  //Shadows
  shadows: function () {
    shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.bias = 0.0000005;
    shadowGenerator.setDarkness(0.5);
	  shadowGenerator.usePoissonSampling = true;
  },

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

  initRessources: function () {
    pyramid = BABYLON.Mesh.CreatePyramid4("pyramid", 10, 20, scene);
  },

  initGame: function() {
    //mesh.actionManager = new BABYLON.ActionManager(scene);
    city = BABYLON.Mesh.CreateTorus("city", 2, 2, 60, scene);
    city.material = new BABYLON.StandardMaterial("Mat", scene);
    city.material.diffuseColor = new BABYLON.Color3(1.00, 0.75, 0.56);
    city.material.emissiveColor = new BABYLON.Color3(0.83, 0.68, 0.56);
    city.material.ambientColor = new BABYLON.Color3(0.57, 0.44, 0.35);
    city.applyGravity = true;
    city.checkCollisions = true;
    city.isPickable = true ;


    //shadow
    //shadowGenerator.getShadowMap().renderList.push(city);

    console.log("city:"+city.position);

    city.animations.push(animationBox);
    scene.beginAnimation(city, 0, 100, true);


  },

  randomnumber: function () {
    return Math.random() * (10 - 2) + 2;
  },

  addMinion: function () {
    sphere = BABYLON.Mesh.CreateSphere("sphere", 12, 2, scene);

    //randomnumber = Math.random() * (maximum - minimum ) + minimum;

    sphere.position.x += Math.random() * (10 - 2) + 2;
    sphere.position.z += Math.random() * (10 - 2) + 2;
    sphere.position.y += Math.random() * (10 - 2) + 2;



    sphere.applyGravity = true;
    sphere.checkCollisions = true;
    sphere.isPickable = true ;
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
    light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 50, 0), scene);
      light.intensity = 0.5;

    // godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, null, 10, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
  	// godrays.mesh.material.diffuseTexture = new BABYLON.Texture('sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
  	// godrays.mesh.material.diffuseTexture.hasAlpha = true;
  	// godrays.mesh.position = new BABYLON.Vector3(-250, 250, 250);
  	// godrays.mesh.scaling = new BABYLON.Vector3(50, 47, 50);

  	// light.position = godrays.mesh.position;
    //   lightHem = new BABYLON.HemisphericLight("lightHem", new BABYLON.Vector3(0, 50, 0), scene);
    //   lightHem.intensity = 0.2;
    //   console.log("light:"+light.position);
  },

  //Ground
  ground: function () {


    ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMap.png", 1000, 1000, 100, 0, 10, scene, false);
    groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
        groundMaterial.diffuseTexture.uScale = 10;
        groundMaterial.diffuseTexture.vScale = 10;
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.position.y = -8.0;
        ground.material = groundMaterial;
        ground.checkCollisions = true;
        ground.receiveShadows = true;
        //shadowGenerator.getShadowMap().renderList.push(ground);

  },

  //Fog
  fogInit: function () {
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    BABYLON.Scene.FOGMODE_LINEAR;

    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
    scene.fogDensity = 0.0009;

    scene.fogStart = 20.0;
    scene.fogEnd = 60.0;
  },

  // Main Scene
  initScene: function() {
     // Get canvas
     canvas = document.getElementById("renderCanvas");
     // Create babylon engine
     engine = new BABYLON.Engine(canvas, true);
     // Create scene
     scene = new BABYLON.Scene(engine);

     scene.workerCollisions = true;

     // Resize the babylon engine when the window is resized
     window.addEventListener("resize", function () {
     	if (engine) {
     		engine.resize();
     	}
     },false);

     // Show Control Debug Panel
     //scene.debugLayer.show();

     // Functions Called

     Meteor.functions.initCamera();

     Meteor.functions.skyBox();

     Meteor.functions.lights();

     //Meteor.functions.shadows();

     //Meteor.functions.addMinion();

     Meteor.functions.animateLife();

     Meteor.functions.ground();

     Meteor.functions.initGame();

     //Meteor.functions.initRessources();

     //Meteor.functions.fogInit();

     engine.runRenderLoop(function () {
         scene.render();
     });

 }
};
