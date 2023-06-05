import _stg_books from "framework/resources/testdata/stg_books copy.json";
import _prod_books from "framework/resources/testdata/prod_books.json";
import { BookDto } from "framework/dto/Book.dto";

//Note: approach with test data may very a lot from project to project. It always depends
//Here used simple approach to store test data in .json files
export class TestDataProvider {
  private books: BookDto[];

  constructor() {
    const env = process.env.ENV_FILE_TO_LOAD;
    switch (process.env.ENV_FILE_TO_LOAD) {
      case ".env.stg":
        this.books = _stg_books as unknown as BookDto[];
        break;
      case ".env.prod":
        this.books = _prod_books as unknown as BookDto[];
        break;
      default:
        throw new Error(
          `Unknown environment ${env}. Add case statement for this env and make sure appropriate .json file added to testdata/ folder`
        );
    }
  }

  getAllBooks(): BookDto[] {
    return this.books;
  }

  getBook(): BookDto {
    if (this.books.length === 0) {
        throw new Error('Books array is empty. Check that your test data file is filled and properly loaded');
    }
    return this.books[0];
  }
}
