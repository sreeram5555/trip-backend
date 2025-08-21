import userModel from "../models/userModel.js";

export const getuserdata = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "user not found" });

    res.json({
      success: true,
      userData: {
        name: user.name,
        isaccountverified: user.isaccountverified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
