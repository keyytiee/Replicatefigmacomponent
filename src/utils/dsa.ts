import type { Transaction } from '../App';

// ===========================
// 1. MERGE SORT IMPLEMENTATION
// ===========================
export function mergeSort(
  transactions: Transaction[],
  sortBy: 'amount' | 'date',
  order: 'asc' | 'desc' = 'asc'
): Transaction[] {
  if (transactions.length <= 1) return transactions;

  const mid = Math.floor(transactions.length / 2);
  const left = mergeSort(transactions.slice(0, mid), sortBy, order);
  const right = mergeSort(transactions.slice(mid), sortBy, order);

  return merge(left, right, sortBy, order);
}

function merge(
  left: Transaction[],
  right: Transaction[],
  sortBy: 'amount' | 'date',
  order: 'asc' | 'desc'
): Transaction[] {
  const result: Transaction[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    const comparison = compareTransactions(left[i], right[j], sortBy, order);
    if (comparison <= 0) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function compareTransactions(
  a: Transaction,
  b: Transaction,
  sortBy: 'amount' | 'date',
  order: 'asc' | 'desc'
): number {
  let comparison = 0;

  if (sortBy === 'amount') {
    comparison = a.amount - b.amount;
  } else if (sortBy === 'date') {
    const dateA = new Date(a.date + ' ' + a.time).getTime();
    const dateB = new Date(b.date + ' ' + b.time).getTime();
    comparison = dateA - dateB;
  }

  return order === 'asc' ? comparison : -comparison;
}

// ===========================
// 2. BINARY SEARCH TREE (BST)
// ===========================
class BSTNode {
  transaction: Transaction;
  left: BSTNode | null = null;
  right: BSTNode | null = null;

  constructor(transaction: Transaction) {
    this.transaction = transaction;
  }
}

export class BinarySearchTree {
  root: BSTNode | null = null;
  private compareKey: 'amount' | 'date';

  constructor(compareKey: 'amount' | 'date' = 'amount') {
    this.compareKey = compareKey;
  }

  insert(transaction: Transaction): void {
    this.root = this.insertNode(this.root, transaction);
  }

  private insertNode(node: BSTNode | null, transaction: Transaction): BSTNode {
    if (node === null) {
      return new BSTNode(transaction);
    }

    const comparison = this.compare(transaction, node.transaction);
    if (comparison < 0) {
      node.left = this.insertNode(node.left, transaction);
    } else {
      node.right = this.insertNode(node.right, transaction);
    }

    return node;
  }

  private compare(a: Transaction, b: Transaction): number {
    if (this.compareKey === 'amount') {
      return a.amount - b.amount;
    } else {
      const dateA = new Date(a.date + ' ' + a.time).getTime();
      const dateB = new Date(b.date + ' ' + b.time).getTime();
      return dateA - dateB;
    }
  }

  // In-order traversal (returns sorted array)
  inOrderTraversal(): Transaction[] {
    const result: Transaction[] = [];
    this.inOrder(this.root, result);
    return result;
  }

  private inOrder(node: BSTNode | null, result: Transaction[]): void {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.transaction);
      this.inOrder(node.right, result);
    }
  }

  // Search for transactions within a range (for filtering)
  searchRange(min: number, max: number): Transaction[] {
    const result: Transaction[] = [];
    this.searchRangeHelper(this.root, min, max, result);
    return result;
  }

  private searchRangeHelper(
    node: BSTNode | null,
    min: number,
    max: number,
    result: Transaction[]
  ): void {
    if (node === null) return;

    const value = this.compareKey === 'amount' 
      ? node.transaction.amount 
      : new Date(node.transaction.date + ' ' + node.transaction.time).getTime();

    if (value > min) {
      this.searchRangeHelper(node.left, min, max, result);
    }
    if (value >= min && value <= max) {
      result.push(node.transaction);
    }
    if (value < max) {
      this.searchRangeHelper(node.right, min, max, result);
    }
  }
}

// ===========================
// 3. BINARY SEARCH
// ===========================
export function binarySearch(
  sortedTransactions: Transaction[],
  target: number,
  searchBy: 'amount' = 'amount'
): Transaction | null {
  let left = 0;
  let right = sortedTransactions.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = sortedTransactions[mid].amount;

    if (midValue === target) {
      return sortedTransactions[mid];
    } else if (midValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
}

// Search for closest match (for approximate search)
export function binarySearchClosest(
  sortedTransactions: Transaction[],
  target: number
): Transaction[] {
  if (sortedTransactions.length === 0) return [];

  let left = 0;
  let right = sortedTransactions.length - 1;
  let closestIndex = 0;
  let closestDiff = Math.abs(sortedTransactions[0].amount - target);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = sortedTransactions[mid].amount;
    const diff = Math.abs(midValue - target);

    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = mid;
    }

    if (midValue === target) {
      break;
    } else if (midValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Return matches within 10% of target
  const threshold = target * 0.1;
  return sortedTransactions.filter(t => Math.abs(t.amount - target) <= threshold);
}

// ===========================
// 4. HASH MAP (Category Management)
// ===========================
export class TransactionHashMap {
  private map: Map<string, Transaction[]>;

  constructor() {
    this.map = new Map();
  }

  // O(1) insertion
  insert(transaction: Transaction): void {
    const category = transaction.category;
    if (!this.map.has(category)) {
      this.map.set(category, []);
    }
    this.map.get(category)!.push(transaction);
  }

  // O(1) retrieval
  getByCategory(category: string): Transaction[] {
    return this.map.get(category) || [];
  }

  // Get all categories
  getAllCategories(): string[] {
    return Array.from(this.map.keys());
  }

  // Get transaction count by category
  getCategoryCount(category: string): number {
    return this.map.get(category)?.length || 0;
  }

  // Clear and rebuild
  rebuild(transactions: Transaction[]): void {
    this.map.clear();
    transactions.forEach(t => this.insert(t));
  }
}

// ===========================
// 5. STACK (Undo/Redo Operations)
// ===========================
export interface HistoryState {
  transactions: Transaction[];
  balances: {
    bank: number;
    cash: number;
    savings: number;
  };
  action: string;
  timestamp: number;
}

export class UndoRedoStack {
  private undoStack: HistoryState[];
  private redoStack: HistoryState[];
  private maxSize: number;

  constructor(maxSize: number = 50) {
    this.undoStack = [];
    this.redoStack = [];
    this.maxSize = maxSize;
  }

  // Push new state to undo stack
  push(state: HistoryState): void {
    this.undoStack.push(state);
    // Clear redo stack when new action is performed
    this.redoStack = [];
    
    // Maintain max size
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }
  }

  // Undo operation
  undo(): HistoryState | null {
    if (this.undoStack.length === 0) return null;
    
    const state = this.undoStack.pop()!;
    this.redoStack.push(state);
    
    return state;
  }

  // Redo operation
  redo(): HistoryState | null {
    if (this.redoStack.length === 0) return null;
    
    const state = this.redoStack.pop()!;
    this.undoStack.push(state);
    
    return state;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }
}

// ===========================
// 6. QUEUE (Transaction Processing)
// ===========================
export class TransactionQueue {
  private queue: Transaction[];

  constructor() {
    this.queue = [];
  }

  // Enqueue (add to end)
  enqueue(transaction: Transaction): void {
    this.queue.push(transaction);
  }

  // Dequeue (remove from front)
  dequeue(): Transaction | null {
    return this.queue.shift() || null;
  }

  // Peek at front
  peek(): Transaction | null {
    return this.queue[0] || null;
  }

  // Get all items
  getAll(): Transaction[] {
    return [...this.queue];
  }

  // Check if empty
  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  size(): number {
    return this.queue.length;
  }
}

// ===========================
// 7. LINKED LIST (Transaction Chain)
// ===========================
class ListNode {
  transaction: Transaction;
  next: ListNode | null = null;
  prev: ListNode | null = null;

  constructor(transaction: Transaction) {
    this.transaction = transaction;
  }
}

export class TransactionLinkedList {
  private head: ListNode | null = null;
  private tail: ListNode | null = null;
  private size: number = 0;

  // Add to front (newest transaction)
  addFirst(transaction: Transaction): void {
    const newNode = new ListNode(transaction);
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // Add to end (oldest transaction)
  addLast(transaction: Transaction): void {
    const newNode = new ListNode(transaction);
    if (this.tail === null) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Remove by ID
  remove(id: string): Transaction | null {
    let current = this.head;
    while (current !== null) {
      if (current.transaction.id === id) {
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;
        if (current === this.head) this.head = current.next;
        if (current === this.tail) this.tail = current.prev;
        this.size--;
        return current.transaction;
      }
      current = current.next;
    }
    return null;
  }

  // Convert to array
  toArray(): Transaction[] {
    const result: Transaction[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.transaction);
      current = current.next;
    }
    return result;
  }

  getSize(): number {
    return this.size;
  }
}
