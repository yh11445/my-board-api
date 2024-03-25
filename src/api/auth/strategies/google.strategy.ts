import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { UsersService } from "@api/users/users.service";
import setting from "@config/setting";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: setting.GOOGLE_CLIENT_ID,
      clientSecret: setting.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/redirect",
      scope: ["email", "profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log("hihihi");
    const { id, name, emails } = profile;
    console.log(accessToken);
    console.log(refreshToken);

    const providerId = id;
    const email = emails[0].value;

    // const user: User = await this.userService.findByEmailOrSave(email, name.familyName + name.givenName, providerId);

    return profile;
  }
}
