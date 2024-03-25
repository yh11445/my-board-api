import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GoogleAuthGuard } from "./auth.guard";

@Controller("api/auth")
export class AuthController {
  // constructor() {}

  @Get("/google/login")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    console.log("google login");
  }

  @Get("/google/redirect")
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log("google redirect");
    const { user } = req;
    return res.send(user);
  }
}
