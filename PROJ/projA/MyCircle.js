/**
 * MyCircle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCircle extends CGFobject {
	constructor(scene, divisions) {
	    super(scene);
	    this.divisions = divisions;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let alphaAng = 2*Math.PI/this.divisions;

        for(let i = 0, ang = 0; i <= this.divisions; i++, ang += alphaAng) {
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(0, 1, 0);
            this.texCoords.push(0.5+0.5*Math.cos(ang), 0.5+0.5*Math.sin(ang));
            if(i != this.divisions)
            	this.indices.push(i, i+1, this.divisions+1);
        }

        this.vertices.push(0.5, 0, 0.5);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}
}

