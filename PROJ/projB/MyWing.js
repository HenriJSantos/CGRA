/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyWing extends CGFobject {
	constructor(scene) {
	    super(scene);
	    this.quad = new MyQuad(this.scene);
	}

	display() {
	    
	}
}