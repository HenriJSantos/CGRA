/**
 * MyVoxelHill
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVoxelHill extends CGFobject {
	constructor(scene, radius, texture) {
		super(scene);
		this.radius = radius;
		this.texture = texture;
        this.unitCube = new MyUnitCubeQuad(scene, texture);
    }

	display() {
	    for(let z = this.radius+0.5, currRadius = 1; z > 0; z--, currRadius += 2) {
            for(let i = 0; i < currRadius; i++) {
                for (let j = 0; j < currRadius; j++) {
                    if(i==0 || i==currRadius-1 || j==0 || j==currRadius-1) {
                        this.scene.pushMatrix();
                        this.scene.translate(-currRadius/2 + i, z > (2*this.radius/3)? Math.floor(2*this.radius/3)+0.5 : z, -currRadius/2 + j);
                        this.unitCube.display();
                        this.scene.popMatrix();
                    }
                }
            }
	    }
	}
}