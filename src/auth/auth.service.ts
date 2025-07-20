import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { AuthSigninDto, AuthSignupDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
    async signup(dto: AuthSignupDto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName
                }
            })
    
            const { passwordHash, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === "P2002") {
                    throw new ForbiddenException("Credentials taken");
                }
            }
            throw error; 
        }
    }
    
    async signin(dto: AuthSigninDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if(!user) {
            throw new ForbiddenException("Credentials incorrect");
        }

        const passwordMatches = await argon.verify(user.passwordHash, dto.password);
        if(!passwordMatches) {
            throw new ForbiddenException("Credentials incorrect");
        }
        
        return this.signToken(user.id, user.email, user.roles);
    }

    async signToken(userId: number, email: string, roles: string[]) : Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
            roles
        }
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: this.config.get("JWT_SECRET")
        });

        return {
            access_token: token
        };
    }

    async refreshToken(userId: number, email: string) : Promise<{ refresh_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "7d",
            secret: this.config.get("JWT_SECRET")
        });

        return {
            refresh_token: token
        };
    }
}