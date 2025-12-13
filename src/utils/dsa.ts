// filename: dsa.ts

// 1. DATA TYPES
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

export interface HistoryState {
  transactions: Transaction[];
  balances: any;
  action: string;
  timestamp: number;
}

// 2. STACK IMPLEMENTATION (For Undo/Redo)
class StackNode<T> {
  data: T;
  next: StackNode<T> | null = null;
  constructor(data: T) { this.data = data; }
}

export class UndoRedoStack<T> {
  private top: StackNode<T> | null = null;
  private size: number = 0;
  private maxSize: number;

  constructor(maxSize: number = 50) {
    this.maxSize = maxSize;
  }

  push(data: T): void {
    const newNode = new StackNode(data);
    if (this.top === null) this.top = newNode;
    else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.size++;
    if (this.size > this.maxSize) this.removeBottom();
  }

  undo(): T | null {
    if (this.top === null) return null;
    const poppedData = this.top.data;
    this.top = this.top.next;
    this.size--;
    return poppedData;
  }

  isEmpty(): boolean { return this.top === null; }

  private removeBottom(): void {
    if (!this.top) return;
    let current = this.top;
    while (current.next && current.next.next) current = current.next;
    current.next = null;
    this.size--;
  }
}

// 3. MERGE SORT IMPLEMENTATION (For Sorting by Date)
export function mergeSortTransactions(transactions: Transaction[]): Transaction[] {
  if (transactions.length <= 1) return transactions;
  const middle = Math.floor(transactions.length / 2);
  const left = transactions.slice(0, middle);
  const right = transactions.slice(middle);
  return merge(mergeSortTransactions(left), mergeSortTransactions(right));
}

function merge(left: Transaction[], right: Transaction[]): Transaction[] {
  let result: Transaction[] = [];
  let leftIndex = 0; 
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const dateLeft = new Date(left[leftIndex].date + " " + left[leftIndex].time).getTime();
    const dateRight = new Date(right[rightIndex].date + " " + right[rightIndex].time).getTime();

    // Sort Descending (Newest First)
    if (dateLeft > dateRight) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// 4. BST IMPLEMENTATION (For Filtering by Amount)
class BSTNode {
  data: Transaction;
  left: BSTNode | null = null;
  right: BSTNode | null = null;
  constructor(data: Transaction) { this.data = data; }
}

export class TransactionBST {
  root: BSTNode | null = null;

  insert(transaction: Transaction) {
    this.root = this.insertRec(this.root, transaction);
  }

  private insertRec(root: BSTNode | null, t: Transaction): BSTNode {
    if (root === null) return new BSTNode(t);
    if (t.amount < root.data.amount) root.left = this.insertRec(root.left, t);
    else root.right = this.insertRec(root.right, t);
    return root;
  }

  inOrderTraversal(): Transaction[] {
    const result: Transaction[] = [];
    this.inOrderRec(this.root, result);
    return result;
  }

  private inOrderRec(root: BSTNode | null, result: Transaction[]) {
    if (root !== null) {
      this.inOrderRec(root.left, result);
      result.push(root.data);
      this.inOrderRec(root.right, result);
    }
  }
}
