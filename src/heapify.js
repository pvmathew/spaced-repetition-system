/* eslint-disable no-param-reassign */
import { ROOT_INDEX } from './constants';

// bubble-down method from Heapify.js
export function bubbleDown(keys, priorities, index) {
  const key = keys[index];
  const priority = priorities[index];

  const halfLength = ROOT_INDEX + (keys.length >>> 1); // no need to check the last level
  const lastIndex = keys.length + ROOT_INDEX;
  while (index < halfLength) {
    const left = index << 1;

    // pick the left child
    let childPriority = priorities[left];
    let childKey = keys[left];
    let childIndex = left;

    // if there's a right child, choose the child with the smallest priority
    const right = left + 1;
    if (right < lastIndex) {
      const rightPriority = priorities[right];
      if (rightPriority < childPriority) {
        childPriority = rightPriority;
        childKey = keys[right];
        childIndex = right;
      }
    }

    if (childPriority >= priority) {
      break; // if children have higher priority, heap property is satisfied
    }

    // bubble the child up to where the parent is
    keys[index] = childKey;
    priorities[index] = childPriority;

    // repeat for the next level
    index = childIndex;
  }

  // we finally found the place where the initial item should be; write it there
  keys[index] = key;
  priorities[index] = priority;
}
