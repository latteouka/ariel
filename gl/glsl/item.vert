uniform float u_progress;
uniform vec4 u_resolution;
uniform vec3 u_lightPos;

varying vec3 vPos;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vSurfaceToLight;

void main(){
  vPos = position;
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // surface position
  vec3 mv = vec3(modelViewMatrix * vec4(position, 1.0));
  vec3 worldLightPos = vec3(viewMatrix * vec4(u_lightPos, 1.0));

  vSurfaceToLight = normalize(worldLightPos - mv);
}

