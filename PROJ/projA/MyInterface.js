/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;
        this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name('Scale');
        this.gui.add(this.scene, 'night').name("Night Mode");
        this.gui.add(this.scene, 'campfireLit').name("Campfire Lit");
        this.gui.add(this.scene, 'carLights').name("Car Lights");

        return true;
    }
}