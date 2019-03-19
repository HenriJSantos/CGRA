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

		// Diamond material
        this.diamondMat = new CGFappearance(this.scene);
        this.diamondMat.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.diamondMat.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.diamondMat.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.diamondMat.setShininess(10.0);
        //Tangram texture
        this.tangramTexture = new CGFtexture(this.scene, 'images/tangram.png');
        this.diamondMat.setTexture(this.tangramTexture);
        this.diamondMat.setTextureWrap('REPEAT', 'REPEAT');
		
        // Orange shiny material
        this.orangeMat = new CGFappearance(this.scene);
        this.orangeMat.setAmbient(0.33, 0.1, 0.0, 1.0);
        this.orangeMat.setDiffuse(0.67, 0.2, 0.0, 1.0);
        this.orangeMat.setSpecular(1, 0.4, 0.0, 1.0);
        this.orangeMat.setShininess(10.0);

        // Purple shiny material
        this.purpleMat = new CGFappearance(this.scene);
        this.purpleMat.setAmbient(0.2, 0.0, 0.2, 1.0);
        this.purpleMat.setDiffuse(0.4, 0.0, 0.4, 1.0);
        this.purpleMat.setSpecular(0.8, 0.0, 0.8, 1.0);
        this.purpleMat.setShininess(10.0);

        // Yellow shiny material
        this.yellowMat = new CGFappearance(this.scene);
        this.yellowMat.setAmbient(0.2, 0.2, 0.0, 1.0);
        this.yellowMat.setDiffuse(0.4, 0.4, 0.0, 1.0);
        this.yellowMat.setSpecular(0.8, 0.8, 0.0, 1.0);
        this.yellowMat.setShininess(10.0);

        // Red shiny material
        this.redMat = new CGFappearance(this.scene);
        this.redMat.setAmbient(0.2, 0.0, 0.0, 1.0);
        this.redMat.setDiffuse(0.4, 0.0, 0.0, 1.0);
        this.redMat.setSpecular(0.8, 0.0, 0.0, 1.0);
        this.redMat.setShininess(10.0);

        // Light Blue shiny material
        this.lightBlueMat = new CGFappearance(this.scene);
        this.lightBlueMat.setAmbient(0.075, 0.15, 0.2, 1.0);
        this.lightBlueMat.setDiffuse(0.15, 0.3, 0.4, 1.0);
        this.lightBlueMat.setSpecular(0.3, 0.6, 0.8, 1.0);
        this.lightBlueMat.setShininess(10.0);

        // Pink shiny material
        this.pinkMat = new CGFappearance(this.scene);
        this.pinkMat.setAmbient(0.25, 0.1, 0.1, 1.0);
        this.pinkMat.setDiffuse(0.5, 0.2, 0.2, 1.0);
        this.pinkMat.setSpecular(1.0, 0.4, 0.4, 1.0);
        this.pinkMat.setShininess(10.0);
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

        this.diamondMat.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //Big Triangle 1
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2),-Math.sqrt(2),0);
        this.scene.rotate(Math.PI*5/4,0,0,1);

		this.purpleMat.apply();
        this.bigTriangle.display();
        this.scene.popMatrix();

        //Small Triangle 1
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2,-Math.sqrt(8)+Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI*3/4,0,0,1);
        
        this.yellowMat.apply();
        this.smallTriangle.display();
        this.scene.popMatrix();

        //Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2),-2*Math.sqrt(2),0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.scale(-1,1,1);
        
        this.redMat.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Small Triangle 2
        this.scene.pushMatrix();
        this.scene.translate(3*Math.sqrt(2)/2,-Math.sqrt(8)+Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI*3/4,0,0,1);

		this.lightBlueMat.apply();
        this.smallTriangle.display();
        this.scene.popMatrix();

        //Big Triangle 2
        this.lightBlueMat.apply();
        this.bigTriangle.display();

        //Normal Triangle
        this.scene.pushMatrix();
        this.scene.translate(0,2,0);
        this.scene.rotate(Math.PI*5/4,0,0,1);

        this.pinkMat.apply();
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

