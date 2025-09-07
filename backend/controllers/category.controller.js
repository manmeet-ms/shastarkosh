import Category from "../models/Category.model.js";

export const getCategories = async () => {
  try {
    const resCat = await Category.find();
    const result = resCat;
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const getSingleCategory = async () => {
  try {
    const { cId } = req.params;
    console.log(cId);
    const resCat = await Category.findById(cId);

    const result = resCat;
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const createCategory = async () => {
  try {
    const result = await Category.create({ ...req.body });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const updateCategpy = async () => {
  try {
    const { cId } = req.params;
    console.log(cId);
    const resCat = await Category.findByIdAndUpdate(cId);

    const result = resCat;
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const delCategory = async () => {
  try {
    const { cId } = req.params;
    console.log(cId);
    const resCat = await Category.findByIdAndDelete(cId);

    const result = "";
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const flushCategories = async () => {
  try {
    const result = await Category.deleteMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
