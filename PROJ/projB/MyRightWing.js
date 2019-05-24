/**
 * MyRightWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRightWing extends CGFobject {
	constructor(scene) {
	    super(scene);
	    this.slab = new MySlab(this.scene, 1, 1, 0.1);
	    this.triangle = new MyTriangle(this.scene, 1, 1, 0.1);
	}

	display() {
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/8, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
	    this.slab.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
	    this.scene.translate(0, Math.sqrt(-Math.sqrt(2)+2)/2, Math.sqrt(Math.sqrt(2)+2)/2-0.02);
		this.scene.translate(0, 0, 0.5);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
	    this.slab.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
	    this.scene.translate(0, Math.sqrt(-Math.sqrt(2)+2)/2, 0.96+Math.sqrt(Math.sqrt(2)+2)/2);
	    this.scene.rotate(Math.PI/8, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
	    this.triangle.display();
	    this.scene.popMatrix();
	}
}