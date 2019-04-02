/**
 * MyCampfire
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCampfire extends CGFobject {
	constructor(scene) {
		super(scene);
		this.sphere = new MySphere(this.scene, 4, 4);
	}

	display() {
	    let angle = 2*Math.PI/9
	    for (let i = 0; i < 9; i++) {
	        this.scene.pushMatrix();
	        this.scene.scale(0.5,0.5,0.5);
	        this.scene.translate(2*Math.cos(angle*i), 0, 2*Math.sin(angle*i));
	        this.scene.rotate(-angle*i,0,0,1);
	        this.sphere.display();
	        this.scene.popMatrix();
	    }
	}
}
