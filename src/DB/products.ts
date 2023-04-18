import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, require: true},
    description: {type: String, require: true},
    category: {type: String, require: true},
    prices: {type: Number, require: true},
    image: {type: String},
    quantity: {type: Number, require: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

export const ProductModel = mongoose.model('Product', ProductSchema);

export const getProducts = () => ProductModel.find();
export const getProductsByUser = (user: string) => ProductModel.findOne({user});
export const getProductById = (id: string) => ProductModel.findById(id);
export const createProduct = (values: Record<string, any>) => new ProductModel(values)
.save().then((product) => product.toObject());
export const deleteProductById = (id : string) => ProductModel.findOneAndDelete({_id: id});
export const updateProductById = (id : string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values);