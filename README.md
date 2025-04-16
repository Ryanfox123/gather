This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```
Method      endpoint                            Authenication
POST        /auth                               public

GET         /users/:userid                      public
DELETE      /users/:userid                      private
PATCH       /users/:userid                      private
PATCH       /users/:userid/auth                 private
GET         /users/:userid/events               public
PATCH       /users/:userid/events/:eventid      private

POST        /events                             private
GET         /events                             public
GET         /events/:eventid                    public
PATCH       /events/:eventid                    private
DELETE      /events/:eventid                    private
GET         /events/:eventid/users              public
PATCH       /events/:eventid/users/:userid      private
```
