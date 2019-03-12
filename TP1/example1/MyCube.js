/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			1, -1, 1,	//0
			1, 1, 1,	//1
			-1, 1, 1,	//2

			-1, -1, 1,	//3

			1, -1, -1,	//4
			1, 1, -1,	//5
			-1, 1, -1,	//6

			-1, -1, -1,	//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 3,

			0, 4, 5,
			5, 1, 0,

			4, 7, 6,
			4, 6, 5,

			3, 2, 6,
			6, 7, 3,

			1, 5, 6,
			6, 2, 1,

			0, 3, 7,
			0, 7, 4


		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
