import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://greatstack:33858627@cluster0.xaf4f.mongodb.net/Food_Ordering_System').then(()=>console.log("DB Connected"));
}