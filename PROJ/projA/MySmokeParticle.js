/**
 * MySmokeParticle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySmokeParticle extends CGFobject {
	constructor(scene) {
	    super(scene);
	    this.x_movement = -0.02+0.04*Math.random();
	    this.y_movement = 0.01+0.03*Math.random();
	    this.z_movement = -0.02+0.04*Math.random();
	    this.size = 0.05+0.1*Math.random();
	    this.x_pos = 0;
	    this.y_pos = -0.2;
	    this.z_pos = 0;
	    let smokeTexture = new CGFtexture(this.scene, 'textures/smokeTexture.jpg');
	    this.cube = new MyUnitCubeQuad(this.scene, smokeTexture);
	}

	display() {
	    this.y_movement *= 1.01;
	    this.x_pos += this.x_movement;
	    this.y_pos += this.y_movement;
	    this.z_pos += this.z_movement;
	    this.scene.pushMatrix();
	    this.scene.translate(this.x_pos, this.y_pos, this.z_pos);
	    this.scene.scale(this.size, this.size, this.size);
	    this.cube.display();
	    this.scene.popMatrix();
	}
}

