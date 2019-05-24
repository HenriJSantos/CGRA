/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject {
	constructor(scene) {
	    super(scene);
	    this.lowPolySphere = new MySphere(this.scene, 8, 4);
	    this.pyramid = new MyPyramid(this.scene, 6);
	    this.log = new MyLog(this.scene, undefined, undefined, undefined, undefined, 8);
	    this.rightWing = new MyRightWing(this.scene);
	    this.leftWing = new MyLeftWing(this.scene);
	}

	display() {
		//Body
        this.scene.pushMatrix();
        this.scene.scale(2.3,1.2,1.1);
        this.lowPolySphere.display();
        this.scene.popMatrix();

		//Head
        this.scene.pushMatrix();
        this.scene.translate(2.2,0.7,0);
        
        //Head ball
        this.lowPolySphere.display();

		//Beak
		this.scene.pushMatrix();
        this.scene.translate(0.85, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.scale(0.3, 0.5, 0.3);
        this.pyramid.display();
        this.scene.popMatrix();

        //Cheeks
        this.scene.pushMatrix();
        this.scene.translate(0.8,0.05,0.4);
        this.scene.scale(0.15,0.2, 0.2);
      	this.lowPolySphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.8,0.05,-0.4);
        this.scene.scale(0.15,0.2, 0.2);
      	this.lowPolySphere.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.scene.translate(0.6,0.4,0.4);
        this.scene.rotate(-Math.PI/8, 0, 1, 0);
        this.scene.rotate(-(Math.PI/2-Math.PI/10), 0, 0, 1)
        this.scene.scale(0.2,0.1,0.2);
      	this.log.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.6,0.4,-0.4);
        this.scene.rotate(Math.PI/8, 0, 1, 0);
        this.scene.rotate(-(Math.PI/2-Math.PI/10), 0, 0, 1)
        this.scene.scale(0.2,0.1,0.2);
      	this.log.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4,0.2,0.9);
        this.rightWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4,0.2,-0.9);
        this.leftWing.display();
        this.scene.popMatrix();
	}
}