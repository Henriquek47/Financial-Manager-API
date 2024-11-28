export class CategoryExpensesDTO {
     name: string;
     totalSpent: number;
  
    constructor(name: string, totalSpent: number) {
      this.name = name;
      this.totalSpent = totalSpent;
    }
  }
  