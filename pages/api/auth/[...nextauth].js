// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
	providers: [
		CredentialsProvider({
			id: "payload",
			name: "Payload",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const res = await fetch(`${process.env.PAYLOAD_API_URL}/api/users/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						//"API-Key": YOUR_PAYLOAD_API_KEY,
					},
					body: JSON.stringify({
						email: credentials.email,
						password: credentials.password,
					}),
				});

				const data = await res.json();

				if (data.user) {
					return {

						id: data.user.id,
						firstName: data.user.firstName,
						lastName: data.user.lastName,
						roles: data.user.roles,
						email: data.user.email,
						payloadToken: data.token,
					};
				} else {
					return null;
				}
			},
		}),
	],
	database: process.env.DATABASE_URL,
	callbacks: {
		async jwt(token, user) {
			if (user) {
				token.id = user.id;
				token.firstName = user.firstName;
				token.lastName = user.lastName;
				token.roles = user.roles;
				token.email = user.email;
				token.payloadToken = user.payloadToken;
			}
			return token;
		},

		async session(session, token) {
			// Do not include the token in the session object
			// session.payloadToken = token.payloadToken;
			return session;
		},
	},
});
