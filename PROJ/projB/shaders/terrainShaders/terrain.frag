#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float height;

uniform sampler2D uSampler;
uniform sampler2D gradient;

void main() {
    float weight = 1.0;

    vec2 gradientPos = vec2(0, 1.0-height);
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 gradientColor = texture2D(gradient, gradientPos);

    vec4 finalColor = (color + gradientColor*weight)/2.0;

    gl_FragColor = finalColor;
}