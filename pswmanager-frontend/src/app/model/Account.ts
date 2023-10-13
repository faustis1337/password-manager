export class Account {
  id: string;
  url: string;
  username: string;
  password: string;

  constructor(url: string, username: string, password: string) {
    this.id = this.generateRandomId();
    this.url = url;
    this.username = username;
    this.password = password;
  }
  private generateRandomId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 5);
    return timestamp + randomPart;
  }
}
