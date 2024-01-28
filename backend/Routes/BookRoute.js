import express from "express";
import { Book } from "../model/bookmodel.js";
const Route =express.Router();
// Route for save a new Book
Route.post('/',async(request,response)=>{
    try {
        if(!request.body.title||
            !request.body.author ||
            !request.body.publishYear
            ){
                return response.status(400).send({
                    message:'send all requried fileds:title,author,publishYear',
                });
            }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
    });
    // Route for Get Al Books frm databae
    Route.get('/',async(request,response)=>{
        try {
            const books = await Book.find({});
            return response.status(200).json({
                 count:  books.length,
                 data:books
             }
               
    
            );
        } catch (error) {
            console.log(error.message);
            response.status(500).send({message:error.message});
        }
    });
    // Route for Get Al Books frm databae by id
    Route.get('/:id',async(request,response)=>{
        try {
            const {id} = request.params;
            const books = await Book.findById(id);
            return response.status(200).json(books);
        } catch (error) {
            console.log(error.message);
            response.status(500).send({message:error.message});
        }
    })
    // Route for Update a book
    Route.put('/:id',async(request,response)=>{
        try {
            if(!request.body.title||
                !request.body.author ||
                !request.body.publishYear
                ){
                    return response.status(400).send({
                        message:'send all requried fileds:title,author,publishYear',
                    });
                }
            const {id} = request.params;
            const result = await Book.findByIdAndUpdate(id,request.body);
            if(!result){
                return  response.status(404).json({message:'book not found'});
            }
            return response.status(200).send({message:"book updated sucessfully"});
        } catch (error) {
            console.log(error.message);
            response.status(500).send({message:error.message});
        }
    });
    //Route for Delete a book
    Route.delete('/:id',async(request,response)=>{
        try {
            const {id} = request.params;
            const result = await Book.findById(id);
            if(!result){
                return  response.status(404).json({message:'book not found'});
            }
            return response.status(200).send({message:'book was deleted'});
        } catch (error) {
            console.log(error.message);
            response.status(500).send({message:error.message});
        }
    });
    export default Route;