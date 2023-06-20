export default class SessionDto {
    constructor(session) {
      this.Session = "Active";
      this.Role= session.role;
      this.FullName = session.first_name + " " + session.last_name;
      this.Age = session.age;
    }
  }