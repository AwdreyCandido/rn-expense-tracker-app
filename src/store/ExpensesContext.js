import { createContext, useReducer } from "react";

const EXPENSES = [
  {
    id: "e1",
    description: "A book",
    amount: 59.99,
    date: new Date("2024-2-22"),
  },
  {
    id: "e2",
    description: "Hamburguer",
    amount: 8.99,
    date: new Date("2024-4-3"),
  },
  {
    id: "e3",
    description: "Chocolate",
    amount: 4.99,
    date: new Date("2024-3-19"),
  },
  {
    id: "e4",
    description: "Shoes",
    amount: 94.99,
    date: new Date("2024-3-1"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 14.99,
    date: new Date("2024-3-10"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = Math.log2(Math.random(1, 100)) + Math.sin(Math.random(1, 100));
      return [{ id, ...action.payload.expenseData }, ...state];
    case "UPDATE":
      const expenseIndex = state.findIndex((expense) => {
        return expense.id === action.payload.id;
      });
      const expenseToUpdate = state[expenseIndex];
      const updatedExpense = { ...expenseToUpdate, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    case "DELETE":
      const filtered = state.filter((expense) => {
        return expense.id !== action.payload.id;
      });
      return [...filtered];
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  //   const [expenses, setExpenses] = useState([]);

  const [expenses, dispatch] = useReducer(expensesReducer, EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: { expenseData } });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: { id } });
  }

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
