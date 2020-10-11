#ifdef GL_ES
precision mediump float;
#endif

void main(){
    vec3 transformed = position.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed.xyz, 1.);
}