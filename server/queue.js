'use strict';

class _Node {
	constructor(question) {
		this.question=	{
			image: question.image,
		  answer: question.answer,
		  position: question.position,	
			correctAnswer: question.correctAnswer
		};
		this.next = null;
		this.prev = null;
	}
}

class Queue {
	constructor(first = null, last = null) {
		this.first = first; 
		this.last = last;
	}

	enqueue(data) {
		console.log('enter enqueue', data);
		let newNode = new _Node(data);
		//check for empty queue
		if (this.first === null) {
			this.first = newNode;
			console.log('enqueue the first node: ', newNode.question);
		}

		if (this.last !== null) {
			newNode.next = this.last;
			this.last.prev = newNode;
		}
		this.last = newNode;
	}

	dequeue() {
		if (this.first === null) {
			throw new Error('List is empty, no more animals to adopt');
 		}

		const node = this.first;
		this.first = node.prev;
		if (this.first === this.last)
			this.last = null;

		return node.value;
	}
  

	//return top element from the queue 
	peek(queue) {
		if (queue.first === null) {
			throw new Error('No more pets to adopt');
		}
		console.log('this is the first question  ', queue.first.question);
		return queue.first.question;
	}

	//display all the elements in the queue
	display(queue) {
		const arr = []; 
		if (queue.first === null) {
			console.log('list is empty, nothing to display');
			return;
		}
		let node = queue.first;
		let i = 1;
		while (node !== null) {
			arr.push(node);
			node = node.prev;
			i++;
		}
		return arr;		
	}

}//end Queue class

module.exports = Queue;