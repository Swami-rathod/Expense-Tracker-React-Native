import { createContext, useReducer } from "react";
const DummyExpenses = [
    {
        id: 1,
        description : "A pair of Shoes",
        amount: 98.78,
        date : new Date('2024-2-24')
    },
    {
        id: 2,
        description : "A pair of Trouser",
        amount: 58.78,
        date : new Date('2024-3-1')
    },
    {
        id: 3,
        description : "A pair of Jeans",
        amount: 78.78,
        date : new Date('2024-3-2')
    },
    {
        id: 4,
        description : "A pair of Hooddies",
        amount: 88.78,
        date : new Date('2022-03-16')
    },
    {
        id: 5,
        description : "A pair of Shoes",
        amount: 98.78,
        date : new Date('2020-12-24')
    },
    {
        id: 6,
        description : "A pair of Trouser",
        amount: 58.78,
        date : new Date('2020-12-03')
    },
    // {
    //     id: 7,
    //     description : "A pair of Jeans",
    //     amount: 78.78,
    //     date : new Date('2020-11-03')
    // },
    // {
    //     id: 8,
    //     description : "A pair of Hooddies",
    //     amount: 88.78,
    //     date : new Date('2022-03-16')
    // },
    // {
    //     id: 9,
    //     description : "A pair of Shoes",
    //     amount: 98.78,
    //     date : new Date('2020-12-24')
    // },
    // {
    //     id: 10,
    //     description : "A pair of Trouser",
    //     amount: 58.78,
    //     date : new Date('2020-12-03')
    // },
    // {
    //     id: 11,
    //     description : "A pair of Jeans",
    //     amount: 78.78,
    //     date : new Date('2020-11-03')
    // },
    // {
    //     id: 12,
    //     description : "A pair of Hooddies",
    //     amount: 88.78,
    //     date : new Date('2022-03-16')
    // }
]
export const ExpenseContext = createContext({
    expenses:[],
    addExpenses: ({description, amount, date})=>{},
    deleteExpenses: (id)=>{},
    setExpenses : (expenses)=>{},
    updateExpenses: (id,{description,amount,date})=>{},
});

function expenseReducer(state,action){
    switch(action.type){
        case "ADD":
         
            return [action.payload,...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case "UPDATE":
            const updatableExpenseIdx = state.findIndex((expense) =>
                 expense.id ===action.payload.id
            );
            const updatableExpense = state[updatableExpenseIdx];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIdx]= updatedItem;
            return updatedExpenses;

        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload)
        default :
        return state;
    }
}

function ExpenseContextProvider({children}){

    const [expenseState, dispatch]= useReducer(expenseReducer,[]);

    function addExpenses(expenseData){
        dispatch({type :"ADD", payload : expenseData})
    }
    function setExpenses(expenses){
        dispatch({type :"SET", payload : expenses})
    }
    function deleteExpenses(id){
        dispatch({type:"DELETE", payload: id})
    }
    function updateExpenses(id,expenseData){
        dispatch({type:"UPDATE", payload:{id:id, data:expenseData}})
    }
    const value ={
        expenses : expenseState,
        addExpenses : addExpenses,
        updateExpenses : updateExpenses,
        deleteExpenses: deleteExpenses,
        setExpenses : setExpenses
    }
    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContextProvider;