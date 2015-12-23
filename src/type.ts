export interface IDynamic extends THREE.Object3D{
  update(delta:number,clock?:THREE.Clock);
}

export interface AsyncLoadable{
  load(callback:(obj?:any)=>void);
}
