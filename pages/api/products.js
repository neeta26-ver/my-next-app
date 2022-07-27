const { connectToDatabase } = require('../../dbconnection/connect');
const ObjectId = require('mongodb').ObjectId;


export default async function handler(req, res) {
    
    console.log("req.method >>>>>>>>  ",req.method);
    switch (req.method) {
        case 'GET': {
            return getProducts(req, res);
        }

        case 'POST': {
            return addProduct(req, res);
        }

        case 'PUT': {
            return updateProduct(req, res);
        }

        case 'DELETE': {
            return deleteProduct(req, res);
        }
    }
}


async function getProducts(req,res){
    try {
        
        let { db } = await connectToDatabase();
        
        let products = await db
            .collection('products')
            .find({})
            .toArray();
            console.log("productttss : ",products);
        
        return res.json({
            message: JSON.parse(JSON.stringify(products)),
            success: true,
        });
    } catch (error) {
        
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}


async function addProduct(req, res) {
    try {
        
        let { db } = await connectToDatabase();
        
        await db.collection('products').insertOne(JSON.parse(req.body));
        
        return res.json({
            message: 'Product added successfully',
            success: true,
        });
    } catch (error) {
        
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}


async function updateProduct(req, res) {
    try {
        
        let { db } = await connectToDatabase();

        
        await db.collection('products').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        
        return res.json({
            message: 'Product updated successfully',
            success: true,
        });
    } catch (error) {

        
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}


async function deleteProduct(req, res) {
    try {
        
        let { db } = await connectToDatabase();

        
        await db.collection('products').deleteOne({
            _id: new ObjectId(req.body),
        });

        
        return res.json({
            message: 'Product deleted successfully',
            success: true,
        });
    } catch (error) {

        
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}