import express from 'express';
import { newContact, getContact, singleContact, deleteContact, editContact } from '../controllers/Newcontact.js';

const router = express.Router()

// User and Mail routes
router.post('/newContact', newContact); 
router.get('/contact', getContact)  
router.get('/:id', singleContact)     
router.delete('/:id', deleteContact)
router.patch('/:id', editContact)               

export default router;