import {v2 as cloudinary} from 'cloudinary'
import {Product} from '../models/product.model.js';

const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestSeller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});

                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        const product = new Product(productData);
        await product.save();

        res.status(200).json({success:true,   message:"Product added successfully"});
    } catch (error) {
        console.log(error);
        res.status(401).json({success:false, message:error.message});
    }
}

const listProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        
        res.status(200).json({success: true, products});
    } catch (error) {
        res.status(401).json({success: false, message: error.message})
    }
}

const removeProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id);

        res.status(200).json({success: true, message: "Product Removed"});
    } catch (error) {
        res.status(401).json({success: false, message: error.message});
    }
}
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await Product.findById(productId);
        res.status(200).json({success: true, product});
    } catch (error) {
        res.status(401).json({success: false, message: error.message})
    }
}

export {listProducts, addProduct, removeProduct, singleProduct};