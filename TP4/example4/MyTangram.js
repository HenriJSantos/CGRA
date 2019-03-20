/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.diamond = new MyDiamond(this.scene);
        this.normalTriangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);

        let smallTriangleCoords =
            [
                0, 0,     //top left
                0.25, 0.25, //top right
                0, 0.5, //bottom left
                0, 0.5    //bottom right
            ];
        this.smallTriangle = new MyTriangleSmall(this.scene, smallTriangleCoords);

        let smallTriangle2Coords =
            [
                0.5, 0.5,     //top left
                0.5, 0.5, //top right
                0.25, 0.75, //bottom left
                0.75, 0.75    //bottom right
            ];
        this.smallTriangle2 = new MyTriangleSmall(this.scene,smallTriangle2Coords);

        let bigTriangleCoords =
            [
                0, 0,     //top left
                1, 0, //top right
                0.5, 0.5, //bottom left
                0.5, 0.5    //bottom right
            ];
        this.bigTriangle = new MyTriangleBig(this.scene, bigTriangleCoords);

        let bigTriangle2Coords =
            [
                0.5, 0.5,     //top left
                1, 0, //top right
                0.5, 0.5, //bottom left
                1, 1    //bottom right
            ];
        this.bigTriangle2 = new MyTriangleBig(this.scene, bigTriangle2Coords);

		// tangram material
        this.tangramMat = new CGFappearance(this.scene);
        this.tangramMat.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.tangramMat.setDiffuse(.4, .4, .4, 1.0);
        this.tangramMat.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.tangramMat.setShininess(10.0);
        //Tangram texture
        this.tangramTexture = new CGFtexture(this.scene, 'images/tangram.png');
        this.tangramMat.setTexture(this.tangramTexture);
        this.tangramMat.setTextureWrap('REPEAT', 'REPEAT');

    }
	updateBuffers() {
		
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

        this.tangramMat.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //Big Triangle 1
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2),-Math.sqrt(2),0);
        this.scene.rotate(Math.PI*5/4,0,0,1);

		this.tangramMat.apply();
        this.bigTriangle.display();
        this.scene.popMatrix();

        //Small Triangle 1
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2,-Math.sqrt(8)+Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI*3/4,0,0,1);
        
        this.tangramMat.apply();
        this.smallTriangle.display();
        this.scene.popMatrix();

        //Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2),-2*Math.sqrt(2),0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.scale(-1,1,1);
        
        this.tangramMat.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Small Triangle 2
        this.scene.pushMatrix();
        this.scene.translate(3*Math.sqrt(2)/2,-Math.sqrt(8)+Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI*3/4,0,0,1);

		this.tangramMat.apply();
        this.smallTriangle2.display();
        this.scene.popMatrix();

        //Big Triangle 2
        this.tangramMat.apply();
        this.bigTriangle2.display();

        //Normal Triangle
        this.scene.pushMatrix();
        this.scene.translate(0,2,0);
        this.scene.rotate(Math.PI*5/4,0,0,1);

        this.tangramMat.apply();
        this.normalTriangle.display();
        this.scene.popMatrix();
	}

	enableNormalViz() {
		this.diamond.enableNormalViz();
		this.smallTriangle.enableNormalViz();
		this.normalTriangle.enableNormalViz();
		this.bigTriangle.enableNormalViz();
		this.parallelogram.enableNormalViz();
	}
}

