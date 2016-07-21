import BABYLON from 'babylonjs';

/**
* Load the scene when the canvas is fully loaded
*/
document.addEventListener("DOMContentLoaded", function () {
    if (BABYLON.Engine.isSupported()) {
        Meteor.functions.initScene();
    }
}, false);


if(Meteor.isClient){
  Template.scene.events({
    "mousemove": function(event, template){
      //console.log(scene.pointerX, scene.pointerY, event);
      // We try to pick an object
      //var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    },
    "click": function (event, template) {
      citySize = city.getBoundingInfo().boundingBox.extendSize;
      console.log(citySize);

      city.scaling.x = 20;

    }
  });
}
