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

    }

  });
  Template.interface.events({
    "click .city": function (event, template) {
      // Add Minion
      Meteor.functions.addMinion();

      city.scaling.x -= 0.1;
      city.scaling.y -= 0.1;
      city.scaling.z -= 0.1;

    }
  });
  Template.modalLose.events({
    "click .btn-danger": function(event, template){ 
       location.reload();
    }
  });
}
