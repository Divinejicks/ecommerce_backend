import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthSigninDto, AuthSignupDto } from "./dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtRefreshGuard } from "./guard/jwt-refresh.guard";

@ApiTags('Auth')
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("signup")
    @ApiOperation({ summary: "Sign up a new user" })
    signup(@Body() dto: AuthSignupDto) {
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("signin")
    @ApiOperation({ summary: "User sign in" })
    login(@Body() dto: AuthSigninDto) {
        return this.authService.signin(dto);
    }

    @UseGuards(JwtRefreshGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refresh(@Req() req: any) {
        const user = req.user; 
        return this.authService.refreshTokensLaunch(user.sub, user.email, user.roles); 
    }
}