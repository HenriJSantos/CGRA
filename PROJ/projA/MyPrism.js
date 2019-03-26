/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPrism extends CGFobject {
	constructor(scene, slices) {
	    super(scene);
	    this.slices = slices;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];

        let ang = 0;
        let alphaAng = 2*Math.PI/this.slices;

        for(let i = 0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            this.vertices.push(Math.cos(ang+alphaAng), 0, -Math.sin(ang+alphaAng));
            this.vertices.push(Math.cos(ang+alphaAng), 1, -Math.sin(ang+alphaAng));
            this.normals.push(Math.cos(ang+alphaAng/2), 0, -Math.sin(ang+alphaAng/2));
            this.normals.push(Math.cos(ang+alphaAng/2), 0, -Math.sin(ang+alphaAng/2));
            this.normals.push(Math.cos(ang+alphaAng/2), 0, -Math.sin(ang+alphaAng/2));
            this.normals.push(Math.cos(ang+alphaAng/2), 0, -Math.sin(ang+alphaAng/2));
            ang+=alphaAng;
        }

        for (let j = 0; j < this.slices; j++) {
            this.indices.push(4*j, 4*j+2, 4*j+1);
            this.indices.push(4*j+1, 4*j+2, 4*j+3);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}
}

