# Make the Youtube with these three stacks : Typescript, Node.js, MongoDB

## 1.Protect User Password from bcrypt

```javascript
import bcrypt from "bcrypt";

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
```

## 2.check the duplicate elements, use {$or} method from mongoose

**But cannot using a each error message.
likes already to email, already to user name**

```javascript
const userNameExists = await User.exists({ $or: [{ email }, { userName }] });
```

## 3.Express-session saved information

index.d.ts

```javascript
class Session {
        private constructor(request: Express.Request, data: SessionData);
        id: string;
        cookie: Cookie;
        loggedIn: boolean; //new add
        user: UserForm & Document<any, any> //new add
```

Saved user session

```javascript
export const postLogin = async (req: Request, res: Response) => {
  const { userName, password }: CheckNameAndPassword = req.body;

  const userExists = await User.findOne({ userName });
  if (!userExists) {
    return res.status(400).render("login", {
      pageTitle: "SIGN IN",
      errorMessage: "Not found an Account",
    });
  }

  const checkingPassword = await bcrypt.compare(password, userExists.password);
  if (!checkingPassword) {
    return res.status(400).render("login", {
      pageTitle: "SIGN IN",
      errorMessage: "No password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = userExists;
  return res.redirect("/");
```
