'use strict';

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)
  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

//*El arbol se crea como una lista enlazada

function BinarySearchTree(value) {
this.value = value;
this.right = null;
this.left = null;
}


//metodo para insertar un nuevo nodo a la raiz, recordar que los menores van a la izquierda y los mayores a la derecha 
BinarySearchTree.prototype.insert = function (value) { 
  if(value < this.value){ //pregunta si el valor del árbol(nodo) que voy a poner es menor al del árbol anterior LEFT
     if(this.left){//si tengo algo a la izquierda
     this.left.insert(value); /// aca estariamos insertando el nuevo árbol luego del árbol que ya estaba. 
   }else {
      this.left = new BinarySearchTree(value); //si no tengo nada a la izquierda
      return value;
     } // RIGHT
  } else { if(value > this.value) { //Si es mayor
      if(this.right) {//si no tengo nada a la derecha
         this.right.insert(value);
      } else {
         this.right = new BinarySearchTree(value);  //si no hay nada a la derecha
         return value;
      }
   }
  }
};

BinarySearchTree.prototype.contains = function (value) { 
  if(this.value === value) return true; //nos preguntamos si el árbol tiene el valor, si lo tiene retorna true
  if(this.left && this.left.contains(value)) return true;  //Si la ejecución de arriba no se cumple pregunta, si tengo algo a la izquierda y, si el valor esta en la misma. Con la funcion contains (linea 44)
  if(this.right && this.right.contains(value)) return true;
  return false; //si el valor no se encuentra
};

//funcion que suma los nodos del árbol
BinarySearchTree.prototype.size = function () { 
   let count = 1;
   if(this.left){
      count += this.left.size(); //aca suma todo lo que hay en left y lo suma con lo que haya en right (linea de ejecución 53) al count
   }
   if(this.right){
      count += this.right.size();
   }
   return count;
};

//* debemos decirle a la funcion que recorra con el DFS, segun el orden que use cualquiera de los tres.. Recordar que el funcionamiento es, los va recorriendo segun el caso.
//buscar estructura switch *//
BinarySearchTree.prototype.depthFirstForEach = function (cb, type) { 
  switch (type) { //recorre los casos, si no son ninguno de los anteriores es default, en este ultimo seria "in-order"
   case "pre-order":
      cb(this.value); //ejecutamos la cb (toma cb como nodo) 
      if(this.left) this.left.depthFirstForEach(cb, type); //preguntamos si tengo algo en el lado (left o right) y le decimos que ejecute la funcion en el lado ese, le ponemos la cb y el tipo de recorrido (type) como parametros.
      if(this.right) this.right.depthFirstForEach(cb, type); 
    break;

   case "post-order":
      if(this.left) this.left.depthFirstForEach(cb, type); //preguntamos si tengo algo en el lado (left o right) y le decimos que ejecute la funcion en el lado ese
      if(this.right) this.right.depthFirstForEach(cb, type); 
      cb(this.value); 
      break;

   default: //in-order
      if(this.left) this.left.depthFirstForEach(cb, type); //preguntamos si tengo algo en el lado (left o right) y le decimos que ejecute la funcion en el lado ese
      cb(this.value); 
      if(this.right) this.right.depthFirstForEach(cb, type);
      break;
  }

};


//Hacemos un recorrido que va por niveles. Y lo guardamos todo en una Queue.  [B, C, ]
BinarySearchTree.prototype.breadthFirstForEach = function (cb, arrQueue) { 
   if(!arrQueue) { //si no tengo una queue de pendientes, usa la que paso a continuacion. 
   var arrQueue = [];
   }

   cb(this.value); //ejecuto la cb para el nodo que sigue en el orden de BFS
   if(this.left)arrQueue.push(this.left) //pregunto¿si tengo un hijo? pusheo los nodos hijos en la queue
   if(this.right)arrQueue.push(this.right)
  
//antes de continuar la ejecucion, me tengo que preguntar si hay algo, en la ejecucion anterior se guardaron B y C, segun deberian continuar sus hijos es decir B: D y F, C: F, G
 
   if(arrQueue.length>0) {
     arrQueue.shift().breadthFirstForEach(cb, arrQueue); //voy sacando los nodos de la queue de pendientes, para poder ejecutar la funcion para el nodo. Le paso por parametros la lista de pendientes, ya que cada ejecucion, debe saber cual sigue en la queue. 
   }

};

const arbol = new BinarySearchTree(10);
arbol.insert(5);
arbol.insert(19);
console.log(arbol);




// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
   BinarySearchTree,
};
