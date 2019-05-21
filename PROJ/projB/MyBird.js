/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject {
	constructor(scene) {
	    super(scene);
	    this.highSphere = new MySphere(this.scene, 20, 20);
	    this.lowSphere = new MySphere(this.scene, 6, 6);
	    this.halfCone = new MyHalfCone(this.scene, 20);
	}

	display() {
        this.scene.pushMatrix();
        this.scene.scale(2,1.3,1.5);
        this.highSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.2,1.1,0);
        this.scene.rotate(-Math.PI/8, 0, 0, 1);
        this.scene.scale(1.1,0.9, 0.9);
        this.highSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.15,1.1,0.4);
        this.scene.rotate(-Math.PI/16,0,1,0);
        this.scene.scale(0.05, 0.1, 0.1);
        this.lowSphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(3.2,1.1,0.4);
        this.scene.rotate(-Math.PI/16,0,1,0);
        this.scene.scale(0.05, 0.05, 0.05);
        this.lowSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.15,1.1,-0.4);
        this.scene.rotate(Math.PI/16,0,1,0);
        this.scene.scale(0.05, 0.1, 0.1);
        this.lowSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.2,1.1,-0.4);
        this.scene.rotate(Math.PI/16,0,1,0);
        this.scene.scale(0.05, 0.05, 0.05);
        this.lowSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(6,0,0);
        this.halfCone.display();
        this.scene.popMatrix();
	}
}