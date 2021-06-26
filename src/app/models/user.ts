export class User{
    constructor(
        public id:number,
        public name:string,
        public email:string,
        public img:string,
        public password:string,
        public roles:any
    ){}
}