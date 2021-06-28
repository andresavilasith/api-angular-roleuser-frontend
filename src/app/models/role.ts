export class Role{
    constructor(
        public id:number,
        public name:string,
        public slug:string,
        public description:string,
        public full_access:string,
        public permissions:any
    ){}
}