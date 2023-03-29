import * as THREE from "three";
import vertex from "../glsl/item.vert";
import fragment from "../glsl/item.frag";
import { MyObject3D } from "../webgl/myObject3D";
import { Update } from "../libs/update";
import { Func } from "../core/func";
import { MousePointer } from "../core/mousePointer";

export class Item extends MyObject3D {
  private _mesh: THREE.Mesh;
  constructor() {
    super();

    const geometry = new THREE.SphereGeometry(1, 32);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        u_Time: { value: Update.instance.cnt },
        u_progress: {
          value: 0,
        },
        u_mouse: {
          value: new THREE.Vector2(),
        },
        u_lightPos: {
          value: new THREE.Vector3(0, 0, 0),
        },
        u_lightColor: {
          value: new THREE.Color(0xf8cfcf),
        },
        u_color: {
          value: new THREE.Color(0xffffff),
        },
        u_lightIntensity: {
          value: 1,
        },
      },
    });

    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.scale.set(Func.instance.sw(), Func.instance.sh(), 1);
    this.add(this._mesh);
  }

  protected _update(): void {
    super._update();

    const material = this._mesh.material as THREE.ShaderMaterial;
    material.uniforms.u_lightPos.value.set(
      MousePointer.instance.x - Func.instance.sw() / 2,
      -MousePointer.instance.y + Func.instance.sh() / 2,
      5
    );
  }

  protected _resize(): void {
    super._resize();
    this._mesh.scale.set(Func.instance.sw(), Func.instance.sh(), 1);
  }
}
