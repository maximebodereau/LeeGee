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
    }
  });

  Template.modalLose.events({
    "click .btn-danger": function(event, template){
       location.reload();
    }
  });

  // City Life Default Value Reactive
  minionNumber = new ReactiveVar(0);

  Template.interface.helpers({
    minionNumber: function(){
      return minionNumber.get();
    }
  });

  Template.interface.events({
    "click .city": function (event, template) {
      // Add Minion
      Meteor.functions.addMinion();
      Meteor.functions.cityScaleReduce();

      minionNumber.set(minionNumber.get() + 1);
    }
  });
}
