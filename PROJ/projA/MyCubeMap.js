/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene, texturesFolder) {
		super(scene);
		this.topTexture = new CGFtexture(this.scene, 'textures/' + texturesFolder + '/' + texturesFolder + 'Top.jpg');
	    this.leftTexture = new CGFtexture(this.scene, 'textures/' + texturesFolder + '/' + texturesFolder + 'Left.jpg');
        this.frontTexture = new CGFtexture(this.scene, 'textures/' + texturesFolder + '/' + texturesFolder + 'Front.jpg');
        this.rightTexture = new CGFtexture(this.scene, 'textures/' + texturesFolder + '/' + texturesFolder + 'Right.jpg');
        this.backTexture = new CGFtexture(this.scene, 'textures/' + texturesFolder + '/' + texturesFolder + 'Back.jpg');
        this.bottomTexture = new CGFtexture(this.scene, 'textures/' + texturesFolder + '/' + texturesFolder + 'Bottom.jpg');

        this.quad = new MyQuad(scene);

        this.baseMaterial = new CGFappearance(this.scene);
        this.baseMaterial.setAmbient(5.0, 5.0, 5.0, 1.0);
        this.baseMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.baseMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.baseMaterial.setShininess(10.0);
        this.baseMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }  

	display() {
	    this.baseMaterial.setTexture(this.frontTexture);
	    this.baseMaterial.apply();
	   
        this.scene.pushMatrix();
        this.scene.translate(0,0,-150);
        this.scene.scale(300, 300, 300);
        this.quad.display();
        this.scene.popMatrix();

        this.baseMaterial.setTexture(this.leftTexture);
	    this.baseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(150, 0, 0);
        this.scene.scale(300, 300, 300);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.baseMaterial.setTexture(this.backTexture);
	    this.baseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0,0,150);
        this.scene.scale(300, 300, 300);
        this.scene.rotate(Math.PI,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.baseMaterial.setTexture(this.rightTexture);
	    this.baseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(-150, 0, 0);
        this.scene.scale(300, 300, 300);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.baseMaterial.setTexture(this.topTexture);
	    this.baseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 150, 0);
        this.scene.scale(300, 300, 300);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        this.baseMaterial.setTexture(this.bottomTexture);
	    this.baseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, -150, 0);
        this.scene.scale(300, 300, 300);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(3*Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();
	}
}
