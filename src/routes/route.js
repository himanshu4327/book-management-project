const express = require("express")
const router = express.Router()

const { CreateUser,  userLogin  } = require('../controllers/userController')
const {CreateBook,GetAllBooks,GetSpecificBookById,UpdateBookById,DeleteBookById} = require('../controllers/bookController')
const auth = require('../middleware/auth')

//user api
router.post('/register/user', CreateUser)
router.post('/login', userLogin)

//book api    
router.post('/create-book',auth,CreateBook)
router.get('/get-books',auth,GetAllBooks) 
router.get('/get-book/by/:book_id',auth,GetSpecificBookById)
router.put('/update-book/by/:book_id',UpdateBookById)
router.delete('/delete-book/by/:book_id',DeleteBookById)








module.exports = router 