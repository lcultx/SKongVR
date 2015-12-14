export interface IDynamic extends THREE.Object3D{
  update(delta?:number);
}

export interface AsyncLoadable{
  load(callback:(obj?:any)=>void);
}
