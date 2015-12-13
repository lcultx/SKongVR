export interface IDynamic {
  update(delta?:number);
}

export interface AsyncLoadable{
  load(callback:(obj?:any)=>void);
}
