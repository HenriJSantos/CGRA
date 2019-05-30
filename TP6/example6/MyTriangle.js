/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTriangle extends CGFobject {
	constructor(scene, texCoords) {
		super(scene);
		this.initBuffers(texCoords);
	}
	initBuffers(texCoords) {
		this.vertices = [
			1, 0, 0,	//0
			0, 1, 0,	//1
			-1, 0, 0,	//2

			1, 0, 0,	//0
			0, 1, 0,	//1
			-1, 0, 0,	//2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

        this.texCoords = texCoords;
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			3, 4, 5
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

