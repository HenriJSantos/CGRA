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
        this.gui.add(this.scene, 'day', this.scene.timesOfDay).name("Time of Day").onChange(this.scene.toggleTime.bind(this.scene));
        this.gui.add(this.scene, 'campfireLit').name("Campfire Lit").onChange(this.scene.toggleCampfire.bind(this.scene));
        this.gui.add(this.scene, 'carLights').name("Car Lights").onChange(this.scene.toggleCarLights.bind(this.scene));

        return true;
    }
}