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

        for(let i = 0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang+alphaAng), 0, -Math.sin(ang+alphaAng));
            this.vertices.push(0, 1, 0);
            this.texCoords.push(ang/(2*Math.PI), 0.5);
            this.texCoords.push((ang+alphaAng)/(2*Math.PI),0.5);
            this.texCoords.push((ang+alphaAng/2)/(2*Math.PI),0);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            this.normals.push(Math.cos(ang+alphaAng), Math.cos(Math.PI/4.0), -Math.sin(ang+alphaAng));
            this.normals.push(0, 1, 0);
            ang+=alphaAng;
        }

        for(let i = 0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang+alphaAng), 0, -Math.sin(ang+alphaAng));
            this.vertices.push(0, 0, 0);
            this.texCoords.push(ang/(2*Math.PI), 1);
            this.texCoords.push((ang+alphaAng)/(2*Math.PI),1);
            this.texCoords.push((ang+alphaAng/2)/(2*Math.PI),0.5);
            this.normals.push(Math.cos(ang), -Math.cos(Math.PI/4.0), -Math.sin(ang));
            this.normals.push(Math.cos(ang+alphaAng), -Math.cos(Math.PI/4.0), -Math.sin(ang+alphaAng));
            this.normals.push(0, -1, 0);
            ang+=alphaAng;
        }

        for (let j = 0; j < this.slices; j++) {
            this.indices.push(3*j,3*j+1,3*j+2);
            this.indices.push(3*(this.slices+j),3*(this.slices+j)+2,3*(this.slices+j)+1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords() {
		this.updateTexCoordsGLBuffers();
	}
}