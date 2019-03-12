/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.diamond = new MyDiamond(this.scene);
        this.smallTriangle = new MyTriangleSmall(this.scene);
        this.normalTriangle = new MyTriangle(this.scene);
        this.bigTriangle = new MyTriangleBig(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
	}
	display() {
		//Diamond
        this.scene.pushMatrix();
        let mRz = [Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
                   -Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1];
        let mT = [1, 0, 0, 0,
                  0, 1, 0, 0,
                  0, 0, 1, 0,
                  0, -Math.sqrt(2)/2-Math.sqrt(8), 0, 1];
        this.scene.multMatrix(mT);
        this.scene.multMatrix(mRz);
        this.diamond.display();
        this.scene.popMatrix();

        //Big Triangle 1
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2),-Math.sqrt(2),0);
        this.scene.rotate(Math.PI*5/4,0,0,1);
        this.bigTriangle.display();
        this.scene.popMatrix();

        //Small Triangle 1
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2,-Math.sqrt(8)+Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI*3/4,0,0,1);
        this.smallTriangle.display();
        this.scene.popMatrix();

        //Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2),-2*Math.sqrt(2),0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.scale(-1,1,1);
        this.parallelogram.display();
        this.scene.popMatrix();

        //Small Triangle 2
        this.scene.pushMatrix();
        this.scene.translate(3*Math.sqrt(2)/2,-Math.sqrt(8)+Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI*3/4,0,0,1);
        this.smallTriangle.display();
        this.scene.popMatrix();

        //Big Triangle 2
        this.bigTriangle.display();

        //Normal Triangle
        this.scene.pushMatrix();
        this.scene.translate(0,2,0);
        this.scene.rotate(Math.PI*5/4,0,0,1)
        this.normalTriangle.display();
        this.scene.popMatrix();
	}
}

