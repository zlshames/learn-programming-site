export class Invitee {
  constructor(
    public name: string,
    public email: string,
    public position: string,
    public field: string,
    public skill_level: string
  ) { }

  public toString(): string {
    return `${this.name} is a ${this.position} in ${this.field}!`
  }
}