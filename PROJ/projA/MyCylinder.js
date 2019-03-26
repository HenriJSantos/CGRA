/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCylinder extends CGFobject {
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
            this.normals.push(Math.cos(ang+alphaAng), 0, -Math.sin(ang+alphaAng));
            this.normals.push(Math.cos(ang+alphaAng), 0, -Math.sin(ang+alphaAng));       
            ang+=alphaAng;
        }

        for(let i = 0; i < this.slices; i++) {
            if(i != this.slices-1) {
                this.indices.push(2*i, 2*i+2, 2*i+1);
                this.indices.push(2*i+1, 2*i+2, 2*i+3);
            } else {
                this.indices.push(2*i, 0, 2*i+1);
                this.indices.push(2*i+1, 0, 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}
}

