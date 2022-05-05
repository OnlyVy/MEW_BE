import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const accountSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    coin: {
      type: mongoose.Schema.Types.Decimal128,
      default: 1.222222,
    }
  },
  {
    timestamps: true,
  }
);

accountSchema.pre('save', async function (next) {
  const account = this;

  if (account.isModified('password')) {
    account.password = await bcrypt.hash(account.password, SALT_ROUNDS);
  }
  next();
});

const Account = mongoose.model('Account', accountSchema);
export default Account;