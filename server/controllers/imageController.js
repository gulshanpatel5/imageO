import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";
import 'dotenv/config';

const CLIPDROP_API_KEY = process.env.CLIPDROP_API;

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({ success: false, message: "Missing userId or prompt" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({
        success: false,
        message: "Insufficient credits",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {
        "x-api-key": CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    const updatedBalance = user.creditBalance - 1;

    await userModel.findByIdAndUpdate(user._id, { creditBalance: updatedBalance });

    res.json({
      success: true,
      message: "Image generated successfully",
      resultImage,
      creditBalance: updatedBalance,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

