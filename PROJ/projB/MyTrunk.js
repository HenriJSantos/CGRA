/**
 * MyTrunk
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTrunk extends CGFobject {
	constructor(scene) {
	    super(scene);

        let trunkTexture = new CGFtexture(scene, 'images/trunkTexture.jpg');
        let logTexture = new CGFtexture(scene, 'images/logTexture.jpg');
		this.trunk = new MyLog(scene, trunkTexture, trunkTexture, 1.0, 1.0, 7);
	}

	display() {
	   this.trunk.display();
	}
}

