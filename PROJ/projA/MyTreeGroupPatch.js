/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeGroupPatch extends CGFobject {
	constructor(scene, patchRadius, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture,
treeTopTexture) {
		super(scene);
		this.patchRadius = patchRadius;
		this.treeRadius = treeTopRadius;

		this.displacements = [];
		for(let i = 0; i < this.patchRadius; i++) {
	        this.displacements[i] = [];
	    }
	    for(let i = 0; i < this.patchRadius; i++) {
	        for (let j = 0; j < this.patchRadius; j++) {
	            this.displacements[i].push((Math.random() - 0.5)*2);
	        }
	    }
	    
	    this.trees = [];
	    for(let i = 0; i < this.patchRadius; i++) {
	        this.trees[i] = [];
	    }
	    for(let i = 0; i < this.patchRadius; i++) {
	        for (let j = 0; j < this.patchRadius; j++) {
	            this.trees[i].push(new MyTree(scene, trunkHeight*(0.9+0.2*Math.random()), trunkRadius*(0.9+0.2*Math.random()), treeTopHeight*(0.9+0.2*Math.random()), treeTopRadius*(0.9+0.2*Math.random()), trunkTexture, treeTopTexture));
	        }
	    }
	}

	display() {
	    for(let i = 0; i < this.patchRadius; i++) {
	        for (let j = 0; j < this.patchRadius; j++) {
	            this.scene.pushMatrix();
	            this.scene.translate(i*2.5*this.treeRadius + this.displacements[i][j], 0, j*2.5*this.treeRadius + this.displacements[i][j]);
	            this.trees[i][j].display();
	            this.scene.popMatrix();
	        }
	    }
	}
}