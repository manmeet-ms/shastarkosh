import Category from "../models/Category.model.js";

export const getCategories = async (req, res) => {
  try {
    const resCat = await Category.find();

  //  console.log("info",resCat)
    res.status(200).json(resCat);
  } catch (err) {
    res.status(400).json(err.message);
  }
}; 
export const getSingleCategory = async (req,res) => {
  try {
    const { cId } = req.params;
    console.log(cId);
    const resCat = await Category.findById(cId);

    const result = resCat;

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export const createCategory = async (req,res) => {
  try {
    const result = await Category.create({ ...req.body });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export const updateCategpy = async (req,res) => {
  try {
    const { cId } = req.params;
    console.log(cId);
    const resCat = await Category.findByIdAndUpdate(cId);

    const result = resCat;
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export const delCategory = async (req,res) => {
  try {
    const { cId } = req.params;
    console.log(cId);
    const resCat = await Category.findByIdAndDelete(cId);

    const result = "";
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export const flushCategories = async (req,res) => {
  try {
    const result = await Category.deleteMany();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
