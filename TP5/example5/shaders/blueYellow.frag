#ifdef GL_ES
precision highp float;
#endif

varying float yPos;

uniform sampler2D uSampler;

void main() {
    vec4 color;
	if (yPos < 0.5)
		color=vec4(0.0, 0.25, 1.0, 1.0);
	else
	    color=vec4(0.8, 0.7, 0.0, 1.0);

    gl_FragColor = color;
}
