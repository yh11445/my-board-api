import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "../users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    // console.log("serializeUser", user);
    done(null, user);
  }

  async deserializeUser(payload: any, done: (err: Error, payload: any) => void): Promise<any> {
    console.log("deserializeUser", payload);
    // const user = await this.usersService.getUser();
    const user = { email: payload };

    if (!user) {
      done(new Error("No User"), null);
      return;
    }
    // const { password, ...userInfo } = user;

    done(null, user);
  }
}
