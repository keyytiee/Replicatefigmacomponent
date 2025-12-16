// Data Structures and Algorithms for the app

// Stack Node for Undo/Redo functionality
class StackNode<T> {
  value: T;
  next: StackNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

// History State for undo/redo operations
export interface HistoryState {
  transactions: any[];
  balances: any;
  action: string;
  timestamp: number;
}

// Stack implementation for Undo/Redo
export class UndoRedoStack {
  private top: StackNode<HistoryState> | null = null;
  private size: number = 0;
  private maxSize: number;

  constructor(maxSize: number = 50) {
    this.maxSize = maxSize;
  }

  push(state: HistoryState): void {
    const newNode = new StackNode(state);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;

    // Remove oldest entries if we exceed maxSize
    if (this.size > this.maxSize) {
      this.removeBottom();
    }
  }

  pop(): HistoryState | null {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.top!.value;
    this.top = this.top!.next;
    this.size--;
    return value;
  }

  peek(): HistoryState | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.top!.value;
  }

  isEmpty(): boolean {
    return this.top === null;
  }

  getSize(): number {
    return this.size;
  }

  clear(): void {
    this.top = null;
    this.size = 0;
  }

  private removeBottom(): void {
    if (this.isEmpty() || this.size <= 1) {
      return;
    }

    let current = this.top;
    let prev = null;

    // Traverse to the second-to-last node
    while (current!.next !== null) {
      prev = current;
      current = current!.next;
    }

    // Remove the last node
    if (prev) {
      prev.next = null;
      this.size--;
    }
  }
}

// Undo/Redo Manager - Proper DSA implementation for managing both stacks
export class UndoRedoManager {
  private undoStack: UndoRedoStack;
  private redoStack: UndoRedoStack;

  constructor(maxSize: number = 50) {
    this.undoStack = new UndoRedoStack(maxSize);
    this.redoStack = new UndoRedoStack(maxSize);
  }

  /**
   * Save current state before performing a new action
   * This clears the redo stack since we're creating a new timeline
   */
  saveState(state: HistoryState): void {
    this.undoStack.push(state);
    this.redoStack.clear(); // Clear redo stack on new action
  }

  /**
   * Undo the last action
   * Returns the previous state and saves current state to redo stack
   */
  undo(currentState: HistoryState): HistoryState | null {
    const previousState = this.undoStack.pop();
    if (previousState) {
      // Save current state to redo stack before undoing
      this.redoStack.push(currentState);
      return previousState;
    }
    return null;
  }

  /**
   * Redo the last undone action
   * Returns the next state and saves current state to undo stack
   */
  redo(currentState: HistoryState): HistoryState | null {
    const nextState = this.redoStack.pop();
    if (nextState) {
      // Save current state to undo stack before redoing
      this.undoStack.push(currentState);
      return nextState;
    }
    return null;
  }

  /**
   * Check if undo is available
   */
  canUndo(): boolean {
    return !this.undoStack.isEmpty();
  }

  /**
   * Check if redo is available
   */
  canRedo(): boolean {
    return !this.redoStack.isEmpty();
  }

  /**
   * Get the size of undo stack
   */
  getUndoSize(): number {
    return this.undoStack.getSize();
  }

  /**
   * Get the size of redo stack
   */
  getRedoSize(): number {
    return this.redoStack.getSize();
  }

  /**
   * Clear both undo and redo stacks
   */
  clearAll(): void {
    this.undoStack.clear();
    this.redoStack.clear();
  }

  /**
   * Clear only the redo stack
   */
  clearRedoStack(): void {
    this.redoStack.clear();
  }

  /**
   * Peek at the next undo state without removing it
   */
  peekUndo(): HistoryState | null {
    return this.undoStack.peek();
  }

  /**
   * Peek at the next redo state without removing it
   */
  peekRedo(): HistoryState | null {
    return this.redoStack.peek();
  }
}

// Hash Map for category management
export class HashMap<K, V> {
  private buckets: Array<Array<{ key: K; value: V }>>;
  private size: number = 0;
  private capacity: number;

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.buckets = new Array(capacity);
    for (let i = 0; i < capacity; i++) {
      this.buckets[i] = [];
    }
  }

  private hash(key: K): number {
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % this.capacity;
  }

  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }

    // Add new key-value pair
    bucket.push({ key, value });
    this.size++;
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].value;
      }
    }

    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  getSize(): number {
    return this.size;
  }

  keys(): K[] {
    const result: K[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        result.push(entry.key);
      }
    }
    return result;
  }

  values(): V[] {
    const result: V[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        result.push(entry.value);
      }
    }
    return result;
  }

  entries(): Array<[K, V]> {
    const result: Array<[K, V]> = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        result.push([entry.key, entry.value]);
      }
    }
    return result;
  }
}

// Merge Sort for sorting transactions
export function mergeSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compareFn);
  const right = mergeSort(arr.slice(mid), compareFn);

  return merge(left, right, compareFn);
}

function merge<T>(left: T[], right: T[], compareFn: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (compareFn(left[i], right[j]) <= 0) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Linear Search for flexible searching with custom match function
/**
 * Linear Search Algorithm - O(n) time complexity
 * Performs sequential search through an array with a custom matching function
 * @param arr - The array to search through
 * @param matchFn - Function that returns true if an item matches the search criteria
 * @returns Array of items that match the search criteria
 */
export function linearSearch<T>(
  arr: T[],
  matchFn: (item: T) => boolean
): T[] {
  const results: T[] = [];
  
  // Iterate through each item in the array
  for (let i = 0; i < arr.length; i++) {
    // Check if the current item matches the search criteria
    if (matchFn(arr[i])) {
      results.push(arr[i]);
    }
  }
  
  return results;
}

// ==========================================
// CATEGORY MANAGER USING HASHMAP DSA
// ==========================================

/**
 * CategoryInfo - Information stored for each category
 */
export interface CategoryInfo {
  name: string;
  color: string;              // Solid color for light mode
  colorDark: string;          // Color for dark mode
}

/**
 * CategoryManager - Centralized category management using HashMap DSA
 * Singleton pattern ensures single source of truth for all 8 expense categories
 * Uses HashMap internally for O(1) category lookups
 */
export class CategoryManager {
  private static instance: CategoryManager;
  private categoryMap: HashMap<string, CategoryInfo>;

  private constructor() {
    this.categoryMap = new HashMap<string, CategoryInfo>(16);
    this.initializeCategories();
  }

  /**
   * Get singleton instance - ensures one CategoryManager across entire app
   * @returns CategoryManager singleton instance
   */
  public static getInstance(): CategoryManager {
    if (!CategoryManager.instance) {
      CategoryManager.instance = new CategoryManager();
    }
    return CategoryManager.instance;
  }

  /**
   * Initialize all 8 expense categories with their color mappings
   * Uses HashMap.set() for O(1) insertion
   */
  private initializeCategories(): void {
    // All 8 categories from your requirements
    this.categoryMap.set("Food & Grocery", { 
      name: "Food & Grocery",
      color: "#8baa4e",
      colorDark: "rgba(169,200,108,0.85)"
    });
    
    this.categoryMap.set("Transportation", { 
      name: "Transportation",
      color: "#6e86a9",
      colorDark: "rgba(150,174,209,0.85)"
    });
    
    this.categoryMap.set("Bills", { 
      name: "Bills",
      color: "#d99c42",
      colorDark: "rgba(230,180,102,0.85)"
    });
    
    this.categoryMap.set("Utilities", { 
      name: "Utilities",
      color: "#4a506f",
      colorDark: "rgba(104,110,141,0.85)"
    });
    
    this.categoryMap.set("Healthcare", { 
      name: "Healthcare",
      color: "#b45c4c",
      colorDark: "rgba(220,122,106,0.85)"
    });
    
    this.categoryMap.set("Leisure", { 
      name: "Leisure",
      color: "#e8c85e",
      colorDark: "rgba(248,228,124,0.85)"
    });
    
    this.categoryMap.set("Education", { 
      name: "Education",
      color: "#75689c",
      colorDark: "rgba(147,134,186,0.85)"
    });
    
    this.categoryMap.set("Miscellaneous", { 
      name: "Miscellaneous",
      color: "#b5afa8",
      colorDark: "rgba(185,179,168,0.85)"
    });
  }

  /**
   * Get category color using HashMap O(1) lookup
   * @param category - Category name
   * @param isDarkMode - Whether to return dark mode color
   * @returns Color string or default gray
   */
  public getCategoryColor(category: string, isDarkMode: boolean = false): string {
    const info = this.categoryMap.get(category);
    if (!info) {
      // Return default color if category not found
      return isDarkMode ? "rgba(150,150,150,0.85)" : "#b5afa8";
    }
    return isDarkMode ? info.colorDark : info.color;
  }

  /**
   * Check if category exists using HashMap O(1) lookup
   * @param category - Category name to check
   * @returns true if category exists
   */
  public hasCategory(category: string): boolean {
    return this.categoryMap.has(category);
  }

  /**
   * Get all category names - O(n) where n = 8
   * @returns Array of all category names
   */
  public getAllCategories(): string[] {
    return this.categoryMap.keys();
  }

  /**
   * Get category info object using HashMap O(1) lookup
   * @param category - Category name
   * @returns CategoryInfo object or undefined
   */
  public getCategoryInfo(category: string): CategoryInfo | undefined {
    return this.categoryMap.get(category);
  }

  /**
   * Get all categories as plain object (for backward compatibility)
   * Converts HashMap internal structure to plain object
   * @param isDarkMode - Whether to return dark mode colors
   * @returns Object mapping category names to colors
   */
  public getAllColorsAsObject(isDarkMode: boolean = false): { [key: string]: string } {
    const result: { [key: string]: string } = {};
    const categories = this.getAllCategories();
    
    for (const category of categories) {
      result[category] = this.getCategoryColor(category, isDarkMode);
    }
    
    return result;
  }
}