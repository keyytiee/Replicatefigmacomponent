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
  action: string;
  data: any;
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

// Queue Node for transaction ordering
class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

// Queue implementation for transaction ordering
export class Queue<T> {
  private front: QueueNode<T> | null = null;
  private rear: QueueNode<T> | null = null;
  private size: number = 0;

  enqueue(value: T): void {
    const newNode = new QueueNode(value);
    
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear!.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.front!.value;
    this.front = this.front!.next;
    
    if (this.front === null) {
      this.rear = null;
    }
    
    this.size--;
    return value;
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.front!.value;
  }

  isEmpty(): boolean {
    return this.front === null;
  }

  getSize(): number {
    return this.size;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.front;
    
    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }
}

// Binary Search Tree Node
class BSTNode<T> {
  value: T;
  key: number;
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;

  constructor(key: number, value: T) {
    this.key = key;
    this.value = value;
  }
}

// Binary Search Tree for data organization
export class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;

  insert(key: number, value: T): void {
    const newNode = new BSTNode(key, value);
    
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: BSTNode<T>, newNode: BSTNode<T>): void {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(key: number): T | null {
    return this.searchNode(this.root, key);
  }

  private searchNode(node: BSTNode<T> | null, key: number): T | null {
    if (node === null) {
      return null;
    }

    if (key === node.key) {
      return node.value;
    }

    if (key < node.key) {
      return this.searchNode(node.left, key);
    } else {
      return this.searchNode(node.right, key);
    }
  }

  inorderTraversal(): T[] {
    const result: T[] = [];
    this.inorder(this.root, result);
    return result;
  }

  private inorder(node: BSTNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inorder(node.left, result);
      result.push(node.value);
      this.inorder(node.right, result);
    }
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

// Binary Search for efficient searching
export function binarySearch<T>(
  arr: T[],
  target: T,
  compareFn: (a: T, b: T) => number
): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = compareFn(arr[mid], target);

    if (comparison === 0) {
      return mid;
    } else if (comparison < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Not found
}
