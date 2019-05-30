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
	    this.bendAngle = 0.3;
	}

	display() {
		this.scene.pushMatrix();
		this.scene.rotate(-this.bendAngle, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
	    this.slab.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
	    this.scene.translate(0, Math.sin(this.bendAngle), 0.5+Math.cos(this.bendAngle));
		this.scene.rotate(Math.PI/2, 1, 0, 0);
	    this.slab.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
	    this.scene.translate(0, Math.sin(this.bendAngle), 1+Math.cos(this.bendAngle));
	    this.scene.rotate(this.bendAngle, 1, 0, 0);
	    this.scene.translate(0, 0, 0.5);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
	    this.triangle.display();
	    this.scene.popMatrix();
	}

	update(angle) {
		this.bendAngle = 0.5+0.4*Math.sin(angle);
	}
}