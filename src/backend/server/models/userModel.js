import mongoose from "mongoose";

// --- NEW, SIMPLIFIED ADVENTURE SCHEMA ---
// It now holds the entire trip plan JSON object in a single field.
const adventureSchema = new mongoose.Schema({
  tripPlan: { 
    type: mongoose.Schema.Types.Mixed, // 'Mixed' allows us to store any JSON structure
    required: true 
  }
}, { timestamps: true });


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyotp: { type: String, default: "" },
  verifyotpexpireat: { type: Number, default: 0 },
  isaccountverified: { type: Boolean, default: false },
  resetotp: { type: String, default: "" },
  resetotpexpireat: { type: Number, default: 0 },
  adventures: [adventureSchema]
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;