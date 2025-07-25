import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  
  try {
    const { prompt, userId } = req.body;
    
    const user = await userModel.findById(userId);
    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (user.creditBalance <= 0) { // Correct and simpler
  return res.json({
    success: false,
    message: "Insufficient credits",
    creditBalance: user.creditBalance,
  });
}
    const formData = new FormData()
    formData.append("prompt", prompt);

    const { data } = await axios
      .post("https://clipdrop-api.co/text-to-image/v1", formData, {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer"

        
      })

      const base64Image = Buffer.from(data, "binary").toString("base64");
      const resultImage = `data:image/png;base64,${base64Image}`;
      await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1});
        res.json({
            success: true, message: "Image generated successfully", resultImage,
            creditBalance: user.creditBalance - 1,
        });
      
  } catch (error) {
    console.error("Error generating image:", error);

    res.json({ success: false, message: "Error generating image" });
  }
};
