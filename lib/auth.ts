import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'
import Google from 'next-auth/providers/google'

const googleClientId = process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID ?? ''
const googleClientSecret =
  process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET ?? ''

const emailServer = process.env.EMAIL_SERVER ?? process.env.AUTH_EMAIL_SERVER ?? ''
const emailFrom = process.env.EMAIL_FROM ?? process.env.AUTH_EMAIL_FROM ?? ''
const hasGoogleCredentials = Boolean(googleClientId && googleClientSecret)
const hasEmailCredentials = Boolean(emailServer && emailFrom)

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth
    },
  },
  providers: [
    ...(hasGoogleCredentials
      ? [
          Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : []),
    ...(hasEmailCredentials
      ? [
          Email({
            server: emailServer,
            from: emailFrom,
          }),
        ]
      : []),
  ],
})
