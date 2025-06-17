// Modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// UserSchema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: { type: String },
    plan: {
      type: String,
      enum: ["free", "creator", "lifetime", "trial"],
      default: "free",
    },
    certCount: { type: Number, default: 0 },
    lastCertReset: { type: Date, default: Date.now },
    stripeCustomerId: { type: String },
    isSubscribed: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Password hasing before saving user to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare passwords method
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
