/**
 * MyCampfire
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCampfire extends CGFobject {
	constructor(scene, logTexture, trunkTexture, lit) {
		super(scene);
		this.sphere = new MySphere(this.scene, 5, 5);
		this.log = new MyLog(this.scene, logTexture, trunkTexture);
		this.smokeTexture = new CGFtexture(this.scene, 'textures/smokeTexture.jpg');
		this.fireTexture = new CGFtexture(this.scene, 'textures/fireTexture.jpg');
		this.numRocks = 9;
		this.numLogs = 6;
		this.lit = lit;
		this.smoke = [];
		this.fire = [];
		this.smokeRate = 5;
		this.fireRate = 1;
		this.rockMaterial = new MyMaterial(this.scene, 'textures/rockTexture.jpg');
	}

	display() {

		this.rockMaterial.apply();
	    let angle = 2*Math.PI/this.numRocks;
	    for (let i = 0; i < this.numRocks; i++) {
	        this.scene.pushMatrix();
	        this.scene.scale(0.5,0.5,0.5);
	        this.scene.translate(2*Math.cos(angle*i), 0, 2*Math.sin(angle*i));
	        this.scene.rotate(-angle*i,0,0,1);
	        this.sphere.display();
	        this.scene.popMatrix();
	    }

		angle = 2*Math.PI/this.numLogs;
		for (let i = 0; i < this.numLogs; i++) {
			this.scene.pushMatrix();
			this.scene.translate(0.7*Math.cos(angle*i), 0, 0.7*Math.sin(angle*i));
			this.scene.rotate(-angle*i, 0, 1, 0);
			this.scene.rotate(Math.PI/7, 0, 0, 1);
			this.scene.scale(0.125,1.2,0.125);
			this.log.display();
			this.scene.popMatrix();
		}

		for (let i in this.smoke) {
			this.smoke[i].display();
		}

		for (let i in this.fire) {
			this.fire[i].display();
		}
	}

	update(currTime) {
		if(this.lit) {
			if(Math.round(currTime/100) % this.smokeRate == 0)
				this.smoke.push(new MyParticle(this.scene, this.smokeTexture));

			if(Math.round(currTime/100) % this.fireRate == 0) {
				this.fire.push(new MyParticle(this.scene, this.fireTexture));
				this.fire.push(new MyParticle(this.scene, this.fireTexture));
			}
		}

		for (let i in this.smoke) {
			this.smoke[i].update();
			if(this.smoke[i].iterationsAlive >= 150)
				delete this.smoke[i];
		}

		for (let i in this.fire) {
			this.fire[i].update();
			if(this.fire[i].iterationsAlive >= 40)
				delete this.fire[i];
		}
	}
}
