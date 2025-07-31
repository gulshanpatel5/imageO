import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";
import 'dotenv/config';

//generate image
export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    const user = await userModel.findById(userId);

    if (!userId || !prompt) {
      return res.json({ success: false, message: "Missing userId or prompt" });
    }


    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({success: false,message: "Insufficient credits", creditBalance: user.creditBalance});
    }

    const formData = new FormData()
    formData.append("prompt", prompt)

    const {data} = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,

      },
      responseType : 'arraybuffer',
  })
  
  const base64Image = Buffer.from(data, "binary").toString("base64")
    const resultImage = `data:image/png;base64,${base64Image}`;
    

    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

    res.json({
      success: true, message: "Image generated successfully",
      resultImage,
      creditBalance: user.creditBalance - 1,
      user: { name: user.name }
    });

  } catch (error) {
    console.error("Error generating image:", error);
    res.json({ success: false, message: "Error generating image" });
  }
};
