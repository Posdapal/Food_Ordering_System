import { emitWarning } from "process";
import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item
const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true, message:"Food Add Successfully!"})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// all food list 
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch(error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// update food item
// const updateFood = async (req, res) => {
//     try {
//         const { id, name, description, price, category } = req.body;
//         const food = await foodModel.findByIdAndUpdate(
//             id,
//             { name, description, price, category },
//             { new: true } // Return the updated document
//         );
//         if (!food) {
//             return res.json({ success: false, message: "Food not found" });
//         }
//         res.json({ success: true, message: "Food Updated" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };

const updateFood = async (req, res) => {
    try {
      const { id, name, description, price, category } = req.body;
      let updateData = { name, description, price, category };
  
      // If a new image is uploaded, delete the old one and update the filename
      if (req.file) {
        const food = await foodModel.findById(id);
        if (food && food.image) {
          fs.unlink(`uploads/${food.image}`, () => {}); // Delete old image
        }
        updateData.image = req.file.filename; // Update with new image filename
      }
  
      const updatedFood = await foodModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedFood) {
        return res.json({ success: false, message: "Food not found" });
      }
      res.json({ success: true, message: "Food Updated" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };

export {addFood,listFood,removeFood,updateFood}