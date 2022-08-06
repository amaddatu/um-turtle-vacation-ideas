const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 7;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
    // .+ at least one of any character (1+ wildcard)
    // @ is just an @ symbol
    // \. means escaped period (just a period)
    // .+             @               .+              \.             .+
    // 1+ wildcard    @               1+ wildcard     period         1+ wildcard
    // turtle         @               turtle          .              com
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    match: [/[a-zA-Z0-9!-]+/i, "Must use a-z or 0-9 or ! or -"]
  }
});

// hooks for password updates/creations???
userSchema.pre('save', function(next) {
  var user = this;
  console.log({hookThis: user});

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();


  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

userSchema.pre('insertMany', async function(next, docs) {
  if (Array.isArray(docs) && docs.length > 0){
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    const hashedUsers = docs.map( async (user) => {
        // hash the password using our new salt
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      return user;
    });
    const results = await Promise.all(hashedUsers);
    // console.log(results);
    next();
  }
  else{
    return next(new Error("User list should not be empty"));
  }
});
// userSchema.pre('save', (next, ...args) => {
//   console.log({hookThis: this});
//   console.log(args);
//   next();
// });

userSchema.methods.comparePassword = async function(candidatePassword) {
  try{
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log(isMatch);
    return isMatch;
  }catch(err){
    console.log(err);
    return false;
  }
};

const User = model('User', userSchema);

module.exports = User;
