import BABYLON from 'babylonjs';

/**
* Load the scene when the canvas is fully loaded
*/
document.addEventListener("DOMContentLoaded", function () {
    if (BABYLON.Engine.isSupported()) {
        Meteor.functions.initScene();
    }
}, false);
