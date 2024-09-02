// package com.fin.oopsproject.Controllers;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import java.util.Date;

// public class JwtUtil {
//     private static final String SECRET_KEY = "your_secret_key";
//     private static final long EXPIRATION_TIME = 86400000; // 1 day

//     public static String generateToken(Long userId) {
//         return Jwts.builder()
//                 .setSubject(String.valueOf(userId)) // the token is generated based
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                 .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
//                 .compact();
//     }
// }
