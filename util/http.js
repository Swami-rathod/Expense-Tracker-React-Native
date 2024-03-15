import axios from "axios";

const BACKEND_URL = "https://react-native-course-7dfe4-default-rtdb.firebaseio.com"
 

async function  storeExpense(expenseData){
    console.log("Store Expense");
   const response = await axios.post(BACKEND_URL+"/expenses.json", expenseData);
   console.log(response)
   const id= response.data.name;
   return id;
}

export async function fetchExpenses(){
    console.log("Before calling fecth api")
        const response = await axios.get(BACKEND_URL+'/expenses.json');
        const expenses=[];
      console.log("This is fetch ddata:"+response)

        for(const key in response.data){
            const expenseObj = {
                id:key,
                amount: response.data[key].amount,
                description: response.data[key].description,
                date : new Date(response.data[key].date),

            }
            expenses.push(expenseObj);

        }
       
        return expenses;
}

export function updateExpense(id , expenseData){
    console.log("This is upddate")

   const response=  axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
   console.log(response);
   return;
}

 export function deleteExpense(id){
    return axios.delete(BACKEND_URL + `expenses/${id}.json`);

}

export default storeExpense;