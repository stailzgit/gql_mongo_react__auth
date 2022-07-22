const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      //See if an old user exist with email attempting to register
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError(
          "A user is already registered with the email " + email,
          "USER_ALREADY_EXIST"
        );
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign({ user_id: newUser._id.email }, "UNSAVE_STRING", {
        expiresIn: "2h",
      });

      newUser.token = token;

      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });

      // if (user && (await bcrypt.compare(password, user.password))) {
      //   const token = jwt.sign(
      //     { user_id: newUser._id.email },
      //     "UNSAVE_STRING",
      //     { expiresIn: "2h" }
      //   );
      //   user.token = token;

      //   return {
      //     id: user.id,
      //     ...user._doc,
      //   };
      // } else {
      //   throw new ApolloError(
      //     "Incorrect login or password",
      //     "INCORRECT_LOGIN_OR_PASSWORD"
      //   );
      // }
      if (!user && !(await bcrypt.compare(password, user.password))) {
        throw new ApolloError(
          "Incorrect login or password",
          "INCORRECT_LOGIN_OR_PASSWORD"
        );
      }

      const token = jwt.sign({ user_id: user._id.email }, "UNSAVE_STRING", {
        expiresIn: "2h",
      });
      user.token = token;

      return {
        id: user.id,
        ...user._doc,
      };
    },
  },
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};
