# Make the Youtube with these three stacks : Typescript, Node.js, MongoDB

1. Protect User Password from bcrypt

```javascript
import bcrypt from "bcrypt";

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
```

2. check the duplicate elements, use {$or} method from mongoose

**But cannot using a each error message.
likes already to email, already to user name**

```javascript
const userNameExists = await User.exists({ $or: [{ email }, { userName }] });
```
