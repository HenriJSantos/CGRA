/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	updateBuffers() {
		
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
			0, -1, 0,			//Bottom
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, 1, 0,			//Top
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			-1, 0, 0,			//Left
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			1, 0, 0,			//Right
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			0, 0, -1,			//Back
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,			//Front
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		]

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,			//Bottom
			1, 3, 2,
			4, 6, 5,			//Top
			5, 6, 7,
			8, 9, 10,			//Left
			9, 11, 10,
			12, 14, 13,			//Right
			13, 14, 15,
			16, 18, 17,			//Back
			17, 18, 19,	
			20, 21, 22,			//Front
			21, 23, 22,
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

