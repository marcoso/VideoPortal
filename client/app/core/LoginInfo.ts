// Container for passing user entered data to the component so then password is encrypted and login can be performed
export class LoginInfo {
	constructor(
	  public username: string,	  
	  public password: string
	  ) { }
}