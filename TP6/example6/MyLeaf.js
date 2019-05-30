/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject {
	constructor(scene) {
	    super(scene);
	    this.triangle = new MyTriangle(scene);
	    let materialProperties = [
	        0.2, 0.5, 0.3,
	        0.4, 1.0, 0.6,
	        0.2, 0.5, 0.3
        ];
        this.material = new MyMaterial(scene, undefined, undefined, undefined, materialProperties);
	}

	display() {
	   this.material.apply();
	   this.scene.pushMatrix();
	   this.scene.scale(2,2,2);
	   this.triangle.display();
	   this.scene.popMatrix();
	}
}

