import mongoose from "mongoose";
import {ContactSchema} from "../models/crm.Model.js"

const Contact = mongoose.model('contact', ContactSchema);

export const addContact = (req, res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if(err){
            res.send(err);
        }
        res.json({contact})
    })
}

export const getContact = (req, res) => {
    Contact.find({}, (err, contact) => {
        if(err){
            res.send(err);
        }
        res.json({contact})
    })
}

export const getById = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    })
}

export const update = (req, res) => {
    let data = req.body;
    Contact.findOneAndUpdate({_id: req.params.contactId}, data, {new: true}, (err, contact) => {
        if(err) {
            res.send(err);
        }
        res.json({
            status: 'user updated successfully',
            ...contact
        })
    }) 
}

export const deleteContact = (req, res) => {
    Contact.remove({_id: req.params.contactId}, (err, contact) => {
        if(err){
            res.send(err);
        }
        res.json({
            status: 'contact deleted successfully',
            ...contact
        })
    })
}