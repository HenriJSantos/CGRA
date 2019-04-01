/**
 * MyRoof
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRoof extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            -1, 0, -0.5,	//0
            -1, 0, 0.5,	    //1
            -0.5, 1, 0,	    //2

            -1, 0, 0.5,	    //3
            -0.5, 1, 0,	    //4
            1, 0, 0.5,	    //5
            0.5, 1, 0,	    //6

            1, 0, 0.5,	    //7
            0.5, 1, 0,	    //8
            1, 0, -0.5,	    //9

            1, 0, -0.5,	    //10
            -1, 0, -0.5,	//11
            -0.5, 1, 0, 	//12
            0.5, 1, 0,  	//13
        ];

        this.indices = [
            1,2,0,
            3,5,4,
            5,6,4,
            7,9,8,
            10,11,12,
            10,12,13,
        ];

        this.normals = [
            1, 0.5, 0,
            1, 0.5, 0,
            1, 0.5, 0,

            0,1,2,
            0,1,2,
            0,1,2,
            0,1,2,

            2,1,0,
            2,1,0,
            2,1,0,

            0,1,-2,
            0,1,-2,
            0,1,-2,
            0,1,-2,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}

