/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject {
	constructor(scene) {
	    super(scene);
        let material = new MyMaterial(scene, "images/leaf.jpg");
        this.quad = new MySlab(scene, 1,1,0.01, material);
	}

	display() {
	   this.scene.pushMatrix();
	   this.scene.scale(1,1.5,1);
	   this.scene.rotate(Math.PI/4, 0,0,1);
	   this.quad.display();
	   this.scene.popMatrix();
	}
}

