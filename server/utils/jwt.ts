import dotenv from "dotenv";
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";
dotenv.config();


interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// The sameSite attribute in a cookie is used to control when cookies are sent with a request. It helps prevent CSRF (Cross-Site Request Forgery) attacks. Setting it to "lax" means that the cookie will only be sent in a top-level navigation, such as clicking on a link.

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // upload session to redis
    redis.set(user._id, JSON.stringify(user) as any);

  // parseInt(x,10) converts x into an integer using base 10 (decimal number)
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE,
    10
  )*24*60*60*1000 || 24*60*60*1000;  // access token will be valid for number of days written in .env or 1 day by default
  
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE,
    10
  )*24*60*60*1000 || 5*24*60*60*1000;  // refresh token will be valid for number of days written in .env or 5 days by default

  // options for cookies
  const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire),
    maxAge: accessTokenExpire,
    httpOnly: true,
    sameSite: "lax",
  };

  const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire),
    maxAge: refreshTokenExpire,
    httpOnly: true,
    sameSite: "lax",
  };

  // only set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);
  
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
