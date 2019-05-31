/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);
        this.axiom = "X"
        let lightningProperties = [
            10.0, 10.0, 0.0, 1.0,     //Ambient    
            0.0, 0.0, 0.0, 1.0,     //Diffuse
            0.0, 0.0, 0.0, 1.0		//Specular
        ];
        this.lightningMaterial = new MyMaterial(this.scene, undefined, undefined, 20, lightningProperties);
        this.isAnimating = false;
        this.init();
    }

    init(){
        // cria o lexico da gramática
        this.initGrammar();
        this.generateLightning();
        this.audio = new Audio('thunder.mp3');
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
                            "F[/X][X]F[\\X]+FX",
                            "F[^X][X]F[&X]+FX"
                    ]
                },
                30,
                3,
                0.5);
    }
    
    update(t) {
        if(!this.isAnimating)
            return;
        else {
            if(this.depth >= this.axiom.length) {
                this.isAnimating = false;
                this.depth = 0;
            }
            else
                this.depth = (t-this.startTime)/1000 * this.axiom.length;
        }
    }

    startAnimation(t) {
        this.isAnimating = true;
        this.startTime = t;
        this.depth = 0;
        this.audio.play();
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

                case "\\":
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case "/":
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "^":
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    this.scene.rotate(-this.angle, 0, 1, 0);
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
                        this.lightningMaterial.apply();
                        this.scene.pushMatrix();
                        this.scene.scale(0.1, 1, 0.1); 
                        primitive.display();
                        this.scene.popMatrix();
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
