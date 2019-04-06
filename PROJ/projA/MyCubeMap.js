/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		
		this.vertices = [
			-0.5, -0.5, -0.5,	 //0, Bottom Left Back
			0.5, -0.5, -0.5,     //1, Bottom Right Back
			-0.5, -0.5, 0.5,     //2, Bottom Left Front
			0.5, -0.5, 0.5,      //3, Bottom Right Front
			-0.5, 0.5, -0.5,	 //4, Top Left Back
			0.5, 0.5, -0.5,      //5, Top Right Back
			-0.5, 0.5, 0.5,	     //6, Top Left Front
			0.5, 0.5, 0.5,       //7, Top Right Front

			-0.5, -0.5, -0.5,	 //8, Left Bottom Back
			-0.5, -0.5, 0.5,     //9, Left Bottom Front
			-0.5, 0.5, -0.5,	 //10, Left Top Back
			-0.5, 0.5, 0.5,	     //11, Left Top Front
			0.5, -0.5, -0.5,     //12, Right Bottom Back
			0.5, -0.5, 0.5,      //13, Right Bottom Front
			0.5, 0.5, -0.5,      //14, Right Top Back
			0.5, 0.5, 0.5,       //15, Right Top Front

			-0.5, -0.5, -0.5,	 //16, Back Bottom Left
			0.5, -0.5, -0.5,     //17, Back Bottom Right
			-0.5, 0.5, -0.5,	 //18, Back Top Left
			0.5, 0.5, -0.5,      //19, Back Top Right
			-0.5, -0.5, 0.5,     //20, Front Bottom Left
			0.5, -0.5, 0.5,      //21, Front Bottom Right
			-0.5, 0.5, 0.5,	     //22, Front Top Left
			0.5, 0.5, 0.5,       //23, Front Top Right
		];

		this.normals = [
			1, 1, 1,
			1, -1, 1,
			-1, 1, 1,
			-1, -1, 1,
			1, 1, -1,
			1, -1, -1,
			-1, 1, -1,
			-1, -1, -1,

			1, 1, 1,
			1, -1, 1,
			-1, 1, 1,
			-1, -1, 1,
			1, 1, -1,
			1, -1, -1,
			-1, 1, -1,
			-1, -1, -1,

			1, 1, 1,
			1, -1, 1,
			-1, 1, 1,
			-1, -1, 1,
			1, 1, -1,
			1, -1, -1,
			-1, 1, -1,
			-1, -1, -1
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,			//Bottom
			1, 2, 3,
			4, 5, 6,			//Top
			5, 7, 6,
			8, 10, 9,			//Left
			9, 10, 11,
			12, 13, 14,			//Right
			13, 15, 14,
			16, 17, 18,			//Back
			17, 19, 18,	
			20, 22, 21,			//Front
			21, 22, 23
		];

		this.texCoords = [
			1/2, 1,
			1/4, 1,
			1/2, 2/3,
			1/4, 2/3,

			1/2, 0,
			1/4, 0,
			1/2, 1/3,
			1/4, 1/3,

			3/4, 2/3,
			1/2, 2/3,
			3/4, 1/3,
			1/2, 1/3,

			0, 2/3,
			1/4, 2/3,
			0, 1/3,
			1/4, 1/3,

			3/4, 2/3,
			1, 2/3,
			3/4, 1/3,
			1, 1/3,

			1/2, 2/3,
			1/4, 2/3,
			1/2, 1/3,
			1/4, 1/3,
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

