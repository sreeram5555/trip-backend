import User from "../models/userModel.js";

// --- NEW, SIMPLIFIED CONTROLLER ---

// POST /api/adventure/save
// POST /api/adventure/save
export const saveAdventure = async (req, res) => {
  try {
    const { tripPlan } = req.body;

    if (!tripPlan || typeof tripPlan !== "object") {
      return res.status(400).json({ success: false, message: "A valid tripPlan JSON object is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.adventures.push({ tripPlan });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Trip plan saved successfully!",
      adventures: user.adventures,
    });
  } catch (err) {
    console.error("Error saving adventure:", err);
    res.status(500).json({ success: false, message: "Server error while saving trip plan" });
  }
};


export const getAdventures = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("adventures");
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, adventures: user.adventures });
  } catch (err) {
    console.error("Error getting adventures:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};