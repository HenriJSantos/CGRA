class MySemiCone extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
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
            this.vertices.push(Math.cos(ang)/2, 1, -Math.sin(ang)/2);
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang)/2, 0, -Math.sin(ang)/2);
            this.texCoords.push(ang/(2*Math.PI),0);
            this.texCoords.push(ang/(2*Math.PI)/2,1);
            ang+=alphaAng;
        }

        this.vertices.push(1, 0, 0);
        this.vertices.push(0.5, 1, 0);
        this.normals.push(1, 0, 0);
        this.normals.push(0.5, 0, 0);
        this.texCoords.push(alphaAng, 0);
        this.texCoords.push(alphaAng/2, 1);

        for(let i = 0; i < this.slices; i++) {
            this.indices.push(2*i, 2*i+2, 2*i+1);
            this.indices.push(2*i+1, 2*i+2, 2*i+3);

        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

