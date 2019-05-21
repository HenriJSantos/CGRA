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

        	this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
			this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));

			this.normals.push(Math.cos(ang), Math.cos(Math.PI/4), -Math.sin(ang));
			this.normals.push(Math.cos(ang), -Math.cos(Math.PI/4), -Math.sin(ang));

			this.texCoords.push(0.5+0.5*Math.cos(ang),0.5+0.5*Math.sin(ang));
			this.texCoords.push(0.5+0.5*Math.cos(ang),0.5+0.5*Math.sin(ang));

			this.indices.push(2*i,2*this.slices+2,2*(i+1));
			this.indices.push(2*i,2*(i+1),2*this.slices+3);

			ang += alphaAng;
        }
		
		this.vertices.push(1,0,0);
        this.normals.push(1,Math.cos(Math.PI/4),0);
        this.texCoords.push(1,0.5);

        this.vertices.push(1,0,0);
        this.normals.push(1,-Math.cos(Math.PI/4),0);
        this.texCoords.push(1,0.5);

        this.vertices.push(0,0,0);
        this.normals.push(0,-1,0);
        this.texCoords.push(0.5,0.5);

        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);
        this.texCoords.push(0.5,0.5);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords() {
		this.updateTexCoordsGLBuffers();
	}
}