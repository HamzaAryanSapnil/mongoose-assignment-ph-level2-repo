import { Request, Response } from "express";
import BorrowBook from "./borrowBooks.model";
import Book from "../books/book.model";

// * Save borrow book
export const saveBorrowBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const data = await BorrowBook.create(payload);
    await Book.updateAvailability(data.book);
    res.status(201).send({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: "Validation Failed",
        success: false,
        error: {
          name: error.name,
          message: error.message,
        },
      });
    } else {
      res.status(400).send({
        message: "Unknown error occurred",
        success: false,
        error: {
          name: "UnknownError",
          message: JSON.stringify(error),
        },
      });
    }
  }
};

export const borrowedBookSummery = async (req: Request, res: Response) => {
  try {
    const data = await BorrowBook.aggregate([
      {
        $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookinfo",
        },
      },

      { $unwind: "$bookinfo" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookinfo.title",
            isbn: "$bookinfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(201).send({
      success: true,
      message: "Borrowed books summary retrieved successfully",
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
