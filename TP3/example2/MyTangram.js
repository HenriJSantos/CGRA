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

        this.scene.materials[4].apply();

        this.diamond.display();
        this.scene.popMatrix();

        //Big Triangle 1
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2),-Math.sqrt(2),0);
        this.scene.rotate(Math.PI*5/4,0,0,1);

        // Orange shiny material
        this.scene.orangeMat = new CGFappearance(this.scene);
        this.scene.orangeMat.setAmbient(0.33, 0.1, 0.0, 1.0);
        this.scene.orangeMat.setDiffuse(0.67, 0.2, 0.0, 1.0);
        this.scene.orangeMat.setSpecular(1, 0.4, 0.0, 1.0);
        this.scene.orangeMat.setShininess(10.0);
        this.scene.orangeMat.apply();

        this.bigTriangle.display();
        this.scene.popMatrix();

        //Small Triangle 1
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2,-Math.sqrt(8)+Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI*3/4,0,0,1);

        // Purple shiny material
        this.scene.purpleMat = new CGFappearance(this.scene);
        this.scene.purpleMat.setAmbient(0.2, 0.0, 0.2, 1.0);
        this.scene.purpleMat.setDiffuse(0.4, 0.0, 0.4, 1.0);
        this.scene.purpleMat.setSpecular(0.8, 0.0, 0.8, 1.0);
        this.scene.purpleMat.setShininess(10.0);
        this.scene.purpleMat.apply();
        
        this.smallTriangle.display();
        this.scene.popMatrix();

        //Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2),-2*Math.sqrt(2),0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.scale(-1,1,1);

        // Yellow shiny material
        this.scene.yellowMat = new CGFappearance(this.scene);
        this.scene.yellowMat.setAmbient(0.2, 0.2, 0.0, 1.0);
        this.scene.yellowMat.setDiffuse(0.4, 0.4, 0.0, 1.0);
        this.scene.yellowMat.setSpecular(0.8, 0.8, 0.0, 1.0);
        this.scene.yellowMat.setShininess(10.0);
        this.scene.yellowMat.apply();
        
        this.parallelogram.display();
        this.scene.popMatrix();

        //Small Triangle 2
        this.scene.pushMatrix();
        this.scene.translate(3*Math.sqrt(2)/2,-Math.sqrt(8)+Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI*3/4,0,0,1);

        // Red shiny material
        this.scene.redMat = new CGFappearance(this.scene);
        this.scene.redMat.setAmbient(0.2, 0.0, 0.0, 1.0);
        this.scene.redMat.setDiffuse(0.4, 0.0, 0.0, 1.0);
        this.scene.redMat.setSpecular(0.8, 0.0, 0.0, 1.0);
        this.scene.redMat.setShininess(10.0);
        this.scene.redMat.apply();

        this.smallTriangle.display();
        this.scene.popMatrix();

        //Big Triangle 2

        // Light Blue shiny material
        this.scene.lightBlueMat = new CGFappearance(this.scene);
        this.scene.lightBlueMat.setAmbient(0.075, 0.15, 0.2, 1.0);
        this.scene.lightBlueMat.setDiffuse(0.15, 0.3, 0.4, 1.0);
        this.scene.lightBlueMat.setSpecular(0.3, 0.6, 0.8, 1.0);
        this.scene.lightBlueMat.setShininess(10.0);
        this.scene.lightBlueMat.apply();

        this.bigTriangle.display();

        //Normal Triangle
        this.scene.pushMatrix();
        this.scene.translate(0,2,0);
        this.scene.rotate(Math.PI*5/4,0,0,1);

        // Pink shiny material
        this.scene.lightBlueMat = new CGFappearance(this.scene);
        this.scene.lightBlueMat.setAmbient(0.25, 0.1, 0.1, 1.0);
        this.scene.lightBlueMat.setDiffuse(0.5, 0.2, 0.2, 1.0);
        this.scene.lightBlueMat.setSpecular(1.0, 0.4, 0.4, 1.0);
        this.scene.lightBlueMat.setShininess(10.0);
        this.scene.lightBlueMat.apply();

        this.normalTriangle.display();
        this.scene.popMatrix();

        this.scene.materials[this.scene.selectedMaterial].apply();
	}

	enableNormalViz() {
		this.diamond.enableNormalViz();
		this.smallTriangle.enableNormalViz();
		this.normalTriangle.enableNormalViz();
		this.bigTriangle.enableNormalViz();
		this.parallelogram.enableNormalViz();
	}
}

