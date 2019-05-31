/**
 * MyBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBranch extends CGFobject {
	constructor(scene) {
	    super(scene);
	    this.cylinder = new MyCylinder(scene, 4);
	    let materialProperties = [
	        0.27, 0.135, 0.035, 1.0,
            0.54, 0.27, 0.07, 1.0,
            0.27, 0.135, 0.035, 1.0
        ];
        this.material = new MyMaterial(scene, undefined, undefined, undefined, materialProperties);
	}

	display() {
	   this.material.apply();
	   this.cylinder.display();
	}
}

