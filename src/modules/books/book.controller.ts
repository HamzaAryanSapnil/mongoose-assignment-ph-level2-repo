import { Request, Response } from "express";
import Book from "./book.model";
import { Types } from "mongoose";

// * Get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(201).send({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      message: "Validation Failed",
      success: false,
      error,
    });
  }
};
// * get a single book
export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);
    res.status(201).send({
      success: true,
      message: "Book Created Successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      message: "Validation Failed",
      success: false,
      error,
    });
  }
};
// * save books
export const postBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const data = await Book.create(payload);
    res.status(201).send({
      success: true,
      message: "Book Created Successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      message: "Validation Failed",
      success: false,
      error,
    });
  }
};
// * update a book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const payload = req.body;
    await Book.findOneAndUpdate({ _id: bookId }, payload, {
      runValidators: true,
      new: true,
    });
    await Book.updateAvailability(bookId);
    const data =await Book.findById(bookId);
    res.status(201).send({
      success: true,
      message: "Book Updated Successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      message: "Validation Failed",
      success: false,
      error,
    });
  }
};

// * delete single books
export const deleteSingleBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    await Book.findByIdAndDelete(bookId);
    res.status(201).send({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      message: "Validation Failed",
      success: false,
      error,
    });
  }
};
