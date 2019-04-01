/**
 * MyTreeRowPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeRowPatch extends CGFobject {
	constructor(scene, patchLength, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture,
treeTopTexture) {
		super(scene);
		this.tree = new MyTree(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture);
		this.patchLength = patchLength
		this.treeRadius = treeTopRadius;

		this.displacements = [];
	    for(let i = 0; i < this.patchLength; i++) {
	        this.displacements.push((Math.random() - 0.5)*1.5);
	    }

	    this.trees = [];
	    for(let i = 0; i < this.patchLength; i++) {
	        this.trees.push(new MyTree(scene, trunkHeight*(0.6+0.8*Math.random()), trunkRadius*(0.9+0.2*Math.random()), treeTopHeight*(0.8+0.2*Math.random()), treeTopRadius*(0.9+0.2*Math.random()), trunkTexture, treeTopTexture));
	    }
	}

	display() {
	    for(let i = 0; i < this.patchLength; i++) {
	        this.scene.pushMatrix();
	        this.scene.translate(i*2.5*this.treeRadius + this.displacements[i], 0, 2*this.displacements[i]);
	        this.trees[i].display();
	        this.scene.popMatrix();
	    }
	}
}