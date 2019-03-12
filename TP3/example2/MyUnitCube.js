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
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	 //0, Bottom Left Back
			-0.5, 0.5, -0.5,	 //1, Top Left Back
			0.5, -0.5, -0.5,     //2, Bottom Right Back
			0.5, 0.5, -0.5,      //3, Top Right Back
			-0.5, -0.5, 0.5,     //4, Bottom Left Front
			-0.5, 0.5, 0.5,	     //5, Top Left Front
			0.5, -0.5, 0.5,      //6, Bottom Right Front
			0.5, 0.5, 0.5,       //7, Top Right Front
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,            //Back
            1, 3, 2,
            4, 6, 5,            //Front
            5, 6, 7,
            1, 5, 3,            //Top
            3, 5, 7,
            0, 2, 4,            //Bottom
            2, 6, 4,
            2, 3, 6,            //Right
            3, 7, 6,
            0, 4, 1,            //Left
            1, 4, 5
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

