const Book = require('../models/bookModel')
require('dotenv').config();

 
exports.CreateBook = async (req, res) => {
    try {  
        const { title, author, summary } = req.body; 

        if (!title || !author || !summary) {
            return res.status(400).json({ status: false, message: 'Title, author, and summary are required fields' });
        }

        const existingBook = await Book.findOne({ title: { $regex: new RegExp(title, 'i') } });
        if (existingBook) {
            return res.status(400).json({ status: false, message: 'A book with this title already exists' });
        }

        const newBook = new Book({
            title,
            author,
            summary,
        });

        await newBook.save();
        return res.status(201).json({ status: true, message: 'Book data created', data: newBook });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}


exports.GetAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ _id: -1 });
        if (!books) {
            return res.status(400).json({ status: false, message: 'Book data not found' });
        }
        return res.status(200).json({ status: true, message: 'Successfully fetched all books', data: books })

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}



exports.GetSpecificBookById = async (req, res) => {
    try {
        const {book_id} = req.params;
        
        if(!book_id){
            return res.status(400).json({ status: false, message: "Please provide a valid book_id"})
        }

        const book = await Book.findById({ _id: book_id })
        if (!book) {
            return res.status(400).json({ status: false, message: 'Book data not found' });
        }
        return res.status(200).json({ status: true, message: 'Successfully fetched book', data: book })

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}

exports.UpdateBookById = async (req, res) => {
    try {
        const { book_id } = req.params;

        if(!book_id){
            return res.status(400).json({ status: false, message: "Please provide a valid book_id"})
        }

        const updateData = req.body;

        const book = await Book.findById(book_id);

        if (!book) { 
            return res.status(404).json({ status: false, message: 'book not found' });
        }


        if (updateData.title ) {
            const existingBook = await Book.findOne({ title: { $regex: new RegExp(updateData.title, 'i') }, _id: { $ne: book_id } });
            if (existingBook) {
                return res.status(400).json({ status: false, message: 'A book with this title already exists' });
            }
        }

        Object.assign(book, updateData);

       const data =  await book.save();
        res.status(200).json({ status: true, message: 'Book data updated successfully',updte_data:data });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.DeleteBookById = async (req, res) => {
    try {
        const {book_id} = req.params;

        if(!book_id){
            return res.status(400).json({ status: false, message: "Please provide a valid book_id"})
        }

        const book = await Book.findByIdAndDelete(book_id);
        if (!book) { 
            return res.status(404).json({ status: false, message: 'book already deleted ' });
        }
        return res.status(200).json({ status: true, message: 'book deleted' });
    } catch (error) {
        return res.status(400).json({ status: false, error: error.message });
    }
};
