/**
* MyCone
* @constructor
*/
class MyCone extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
        this.updateTexCoords();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let ang = 0;
        let alphaAng = 2*Math.PI/this.slices;

        for (let i = 0; i < this.slices; i++) {
        	this.vertices.push(Math.cos(ang), 0, Math.sin(ang));
        	this.texCoords.push(Math.cos(ang), Math.sin(ang));
        	this.normals.push(0, -1, 0);
        	if(i>0 && i<this.slices-1) {
        		this.indices.push(0, i, i+1);
        	}

        	ang += alphaAng;
        }
	
		ang = 0;
		
        for (let i = 0; i < this.slices; i++) {
			this.vertices.push(Math.cos(ang),0,-Math.sin(ang));
			this.vertices.push(Math.cos(ang+alphaAng),0,-Math.sin(ang+alphaAng));

			this.normals.push(Math.cos(ang), Math.cos(Math.PI/4), -Math.sin(ang));
			this.normals.push(Math.cos(ang+alphaAng), Math.cos(Math.PI/4), -Math.sin(ang+alphaAng));

			this.texCoords.push(Math.cos(ang),Math.sin(ang));
			this.texCoords.push(Math.cos(ang+alphaAng),Math.sin(ang+alphaAng));

			this.indices.push(2*i + this.slices, (2*i+1)%(2*this.slices) + this.slices, this.slices*3);

			ang += alphaAng;
        }

        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);
        this.texCoords.push(0.5,0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords() {
		this.updateTexCoordsGLBuffers();
	}
}