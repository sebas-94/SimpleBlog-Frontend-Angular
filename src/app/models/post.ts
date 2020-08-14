export class Post {

  constructor(
    public id: number,
    public userId: number,
    public categoryId: number,
    public title: string,
    public content: string,
    public image: string,
    public createAt: any
  ) {}

}
