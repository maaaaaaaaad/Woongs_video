# Make the Youtube with these three stacks : Typescript, Node.js, MongoDB

1. Protect User Password from bcrypt

```javascript
import bcrypt from "bcrypt";

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
```
