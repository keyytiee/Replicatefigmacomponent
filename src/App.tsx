import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Dashboard from "./components/Dashboard";
import { UndoRedoStack, type HistoryState } from "./utils/dsa";

export interface Transaction {
  id: string;
  category: string;
  title: string;
  description: string;
  amount: number;
  cardType: 'bank' | 'cash' | 'savings';
  date: string;
  time: string;
}

export interface Income {
  id: string;
  title: string;
  description: string;
  amount: number;
  cardType: 'bank' | 'cash' | 'savings';
  date: string;
  time: string;
}

export interface CardBalances {
  bank: number;
  cash: number;
  savings: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "dashboard">("splash");
  const [balances, setBalances] = useState<CardBalances>({
    bank: 5000.00,
    cash: 2000.00,
    savings: 10000.00
  });
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      category: "Transportation",
      title: "Malacañang Palace",
      description: "Malacañang Palace",
      amount: 22,
      cardType: "bank",
      date: "November 27, 2025",
      time: "8:00 PM"
    },
    {
      id: "2",
      category: "Food & Grocery",
      title: "SM Supermarket",
      description: "SM Supermarket",
      amount: 99,
      cardType: "bank",
      date: "November 27, 2025",
      time: "8:00 PM"
    },
    {
      id: "3",
      category: "Healthcare",
      title: "St. Luke's Hospital",
      description: "St. Luke's Hospital",
      amount: 500,
      cardType: "cash",
      date: "November 27, 2025",
      time: "8:00 PM"
    },
    {
      id: "4",
      category: "Education",
      title: "MSU-IIT",
      description: "MSU-IIT",
      amount: 1000,
      cardType: "savings",
      date: "November 27, 2025",
      time: "8:00 PM"
    },
    {
      id: "5",
      category: "Utilities",
      title: "Meralco Payment",
      description: "Meralco Payment",
      amount: 3000,
      cardType: "bank",
      date: "November 27, 2025",
      time: "8:00 PM"
    },
    {
      id: "6",
      category: "Leisure",
      title: "Cinema",
      description: "Cinema",
      amount: 300,
      cardType: "cash",
      date: "November 27, 2025",
      time: "8:00 PM"
    }
  ]);

  const [incomes, setIncomes] = useState<Income[]>([
    {
      id: "1",
      title: "Salary",
      description: "Monthly salary",
      amount: 5000,
      cardType: "bank",
      date: "December 1, 2025",
      time: "9:00 AM"
    },
    {
      id: "2",
      title: "Freelance Work",
      description: "Project payment",
      amount: 2000,
      cardType: "cash",
      date: "December 5, 2025",
      time: "2:30 PM"
    }
  ]);
  
  // Undo/Redo Stack for transaction history
  const [undoStack] = useState(() => new UndoRedoStack(50));
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [undoMessage, setUndoMessage] = useState("");

  useEffect(() => {
    // Auto-advance to dashboard after 3 seconds
    const timer = setTimeout(() => {
      setCurrentScreen("dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSplashClick = () => {
    setCurrentScreen("dashboard");
  };

  // Save current state before making changes
  const saveStateToHistory = (action: string) => {
    const state: HistoryState = {
      transactions: [...transactions],
      balances: { ...balances },
      action,
      timestamp: Date.now()
    };
    undoStack.push(state);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    // Save state before adding
    saveStateToHistory('add_transaction');
    
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    
    // Update transactions (Queue - FIFO: newest first)
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update balance
    setBalances(prev => ({
      ...prev,
      [transaction.cardType]: prev[transaction.cardType] - transaction.amount
    }));
    
    // Show undo toast
    setUndoMessage(`Transaction of ₱${transaction.amount.toFixed(2)} added`);
    setShowUndoToast(true);
  };

  const addIncome = (income: { amount: number; cardType: 'bank' | 'cash' | 'savings'; title: string; description: string; date: string; time: string }) => {
    // Save state before adding income
    saveStateToHistory('add_income');
    
    const newIncome: Income = {
      ...income,
      id: Date.now().toString()
    };
    
    // Update incomes list (newest first)
    setIncomes(prev => [newIncome, ...prev]);
    
    // Update balance (add income)
    setBalances(prev => ({
      ...prev,
      [income.cardType]: prev[income.cardType] + income.amount
    }));
    
    // Show undo toast
    setUndoMessage(`Income of ₱${income.amount.toFixed(2)} added`);
    setShowUndoToast(true);
  };

  const deleteTransaction = (transactionId: string) => {
    const transactionToDelete = transactions.find(t => t.id === transactionId);
    if (!transactionToDelete) return;

    // Save state before deleting
    saveStateToHistory('delete_transaction');
    
    // Remove transaction
    setTransactions(prev => prev.filter(t => t.id !== transactionId));
    
    // Restore balance
    setBalances(prev => ({
      ...prev,
      [transactionToDelete.cardType]: prev[transactionToDelete.cardType] + transactionToDelete.amount
    }));
    
    // Show undo toast
    setUndoMessage(`Transaction deleted`);
    setShowUndoToast(true);
  };

  const editTransaction = (transactionId: string, updatedTransaction: Omit<Transaction, 'id'>) => {
    const originalTransaction = transactions.find(t => t.id === transactionId);
    if (!originalTransaction) return;

    // Save state before editing
    saveStateToHistory('edit_transaction');
    
    // Update transaction
    setTransactions(prev => prev.map(t => 
      t.id === transactionId 
        ? { ...updatedTransaction, id: transactionId }
        : t
    ));
    
    // Adjust balances
    // First restore the original amount
    const balanceAfterRestore = balances[originalTransaction.cardType] + originalTransaction.amount;
    // Then deduct the new amount
    const finalBalance = updatedTransaction.cardType === originalTransaction.cardType
      ? balanceAfterRestore - updatedTransaction.amount
      : balances[updatedTransaction.cardType] - updatedTransaction.amount;
    
    setBalances(prev => ({
      ...prev,
      // Restore original card balance
      [originalTransaction.cardType]: originalTransaction.cardType === updatedTransaction.cardType 
        ? finalBalance 
        : prev[originalTransaction.cardType] + originalTransaction.amount,
      // Update new card balance (if different)
      ...(originalTransaction.cardType !== updatedTransaction.cardType && {
        [updatedTransaction.cardType]: prev[updatedTransaction.cardType] - updatedTransaction.amount
      })
    }));
    
    // Show undo toast
    setUndoMessage(`Transaction updated`);
    setShowUndoToast(true);
  };

  const deleteIncome = (incomeId: string) => {
    const income = incomes.find(i => i.id === incomeId);
    if (!income) return;

    // Save state before deletion
    saveStateToHistory('delete_income');
    
    // Remove income
    setIncomes(prev => prev.filter(i => i.id !== incomeId));
    
    // Restore balance (subtract income)
    setBalances(prev => ({
      ...prev,
      [income.cardType]: prev[income.cardType] - income.amount
    }));
    
    // Show undo toast
    setUndoMessage(`Income of ₱${income.amount.toFixed(2)} deleted`);
    setShowUndoToast(true);
  };

  const editIncome = (id: string, updatedIncome: Omit<Income, 'id'>) => {
    const oldIncome = incomes.find(i => i.id === id);
    if (!oldIncome) return;

    // Save state before editing
    saveStateToHistory('edit_income');
    
    // Update income
    setIncomes(prev => prev.map(i => 
      i.id === id ? { ...updatedIncome, id } : i
    ));
    
    // Adjust balances (remove old income, add new income)
    setBalances(prev => {
      let newBalances = { ...prev };
      
      // Subtract old income
      newBalances[oldIncome.cardType] -= oldIncome.amount;
      
      // Add new income
      newBalances[updatedIncome.cardType] += updatedIncome.amount;
      
      return newBalances;
    });
    
    // Show undo toast
    setUndoMessage(`Income updated`);
    setShowUndoToast(true);
  };

  const handleUndo = () => {
    const previousState = undoStack.undo();
    if (previousState) {
      setTransactions(previousState.transactions);
      setBalances(previousState.balances);
      setShowUndoToast(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen w-full">
      <div className="bg-white relative w-[428px] h-[926px] overflow-hidden shadow-2xl">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentScreen === "splash" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleSplashClick}
        >
          <SplashScreen />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentScreen === "dashboard" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Dashboard 
            balances={balances}
            transactions={transactions}
            incomes={incomes}
            onAddTransaction={addTransaction}
            onAddIncome={addIncome}
            onDeleteTransaction={deleteTransaction}
            onEditTransaction={editTransaction}
            onDeleteIncome={deleteIncome}
            onEditIncome={editIncome}
            showUndoToast={showUndoToast}
            undoMessage={undoMessage}
            onUndo={handleUndo}
            onCloseUndoToast={() => setShowUndoToast(false)}
          />
        </div>
      </div>
    </div>
  );
}