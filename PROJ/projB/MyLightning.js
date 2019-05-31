/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);
        this.axiom = "X"
        this.init();
    }

    init(){
        // cria o lexico da gramática
        this.initGrammar();
        this.generateLightning();
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyCylinder(this.scene, 5),
            "X": new MyCylinder(this.scene, 5)
        };
    };

    generateLightning() {
        this.generate(
                "X",
                {
                    "F": [  "FF" ],
                    "X": [  "F[-X][X]F[-X]+FX", 
                            "F[X][X]F[-X]+FX",
                            "F[-X]F[X][-X]-FX"
                    ]
                },
                30,
                3,
                0.5);
    }
    
    update(t) {
        if(!this.inAnimation)
            return;
        else {
            if(this.depth >= this.axiom.length) {
                this.inAnimation = false;
                this.depth = 0;
            }
            else
                this.depth = (t-this.startTime)/1000 * this.axiom.length;
        }
    }

    startAnimation(t) {
        this.inAnimation = true;
        this.startTime = t;
        this.depth = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        let i, matrixPush = 0;

        // percorre a cadeia de caracteres
        for (i=0; i<this.depth; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    matrixPush++;
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    matrixPush--;
                    this.scene.popMatrix();
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }

        for (i=0; i<matrixPush; i++) {
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}
