# Make the Youtube with these three stacks : Typescript, Node.js, MongoDB

**Stack(SSR)**

1. Back-End: Node JS with Typescript
2. Template engine: Pug

- In this project haven't CSS design and Front-End engine

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

## 4.Login continue with Github

```javascript
export const startGithubLogin = (req: Request, res: Response) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config: any = {
    client_id: process.env.GITHUB_CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const loginUrl = `${baseUrl}?${params}`;
  return res.redirect(loginUrl);
};

export const callbackGithubLogin /*🌟 Important*/ = async (
  req: Request,
  res: Response
) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config: any = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };

  const params = new URLSearchParams(config).toString();
  const loginUrl = `${baseUrl}?${params}`;
  try {
    const data = await fetch(loginUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    const jsonFile: string = await data.json();
    console.log(jsonFile);
    res.send(JSON.stringify(jsonFile));
  } catch (error) {
    console.log(error.message);
  }
};
```

**Special constructor is new URLSearchParams()**

```javascript
const params = new URLSearchParams(...).toString();
```

## 5.User email scope

1. Create a new type
2. Using fetch url as get a token from github api
3. Inspect email primary and verified how a find method in array prototype

```javascript
type EmailReq = {
  email: string,
  primary: boolean,
  verified: boolean,
  visibility: string | null,
};

const emailReq: Array<EmailReq> = await (
  await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `token ${access_token}`,
    },
  })
).json();
const email = emailReq.find(
  (emailItems) => emailItems.primary === true && emailItems.verified === true
);
```

## 6.Route protect or public

```javascript
export const protectorMiddleware = (
  req: Request,
  res: Response,
  next: () => any
) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (
  req: Request,
  res: Response,
  next: () => any
) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
```

## 7.File upload middleware

- In this code excute img viewer in browser.
- Express static method have folder(file) router.
- If not find "uploads" base url, excute a "uploads" file.

```javascript
app.use("/uploads", express.static("uploads"));
```

## 8.Awesome mongoose populate

- Basically, populate have connect object model.
- For example, connection between user profile and user data

```javascript
const videoData = new VideoModel({
  title,
  fileUrl,
  owner: _id,
  description,
  hashtags: hashForm(hashtags),
});
await videoData.save();
```

Create video data and next..

```javascript
const selectedVideo = await VideoModel.findById(id).populate("owner");
```

```javascript
owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
```

Important ref: "User" to owner object. It's load User Shema model to owner.

```javascript
const myVideos = await VideoModel.find({ owner: user._id });
```

Finally, find to data that match user data.
