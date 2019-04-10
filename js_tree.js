"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Emmanuel Cortes Castaneda
   Date: 4.5.19

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throughout the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/

// Each one of these variables are set to an initial value of 0
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;

// Upon the window loading up the makeTree function will be ran
window.onload = makeTree;


function makeTree() {
      var aside = document.createElement("aside");
      aside.setAttribute("id", "treeBox");
      var h1 = document.createElement("h1");
      h1.textContent = "Node Tree";
      aside.appendChild(h1);
      document.getElementById("main").appendChild(aside);

      var nodeList = document.createElement("ol");
      aside.appendChild(nodeList);
      var sourceArticle = document.querySelector("#main article");

      makeBranches(sourceArticle, nodeList);

      document.getElementById('totalNodes').textContent = nodeCount;
      document.getElementById('elemNodes').textContent = elemCount;
      document.getElementById('textNodes').textContent = textCount;
      document.getElementById('wsNodes').textContent = wsCount;

}

function makeBranches(treeNode, nestedList) {
      nodeCount++;

      var liElem = document.createElement("li");
      liElem.innerHTML += "+--";
      var spanElem = document.createElement("span");


      liElem.appendChild(spanElem);
      nestedList.appendChild(liElem);

      if (treeNode.nodeType === 1) {
            elemCount++;
            spanElem.setAttribute("class", "elementNode");
            spanElem.textContent = "<" + treeNode.nodeName + ">";
      } else if (treeNode.nodeType === 3) {
            textCount++;
            var textString = treeNode.nodeValue;
            //good
            if (isWhiteSpaceNode(textString) === true) {
                  wsCount++;
                  spanElem.setAttribute("class", "whiteSpaceNode");
                  spanElem.textContent = "#text";
            } else if (isWhiteSpaceNode(textString) === false) {
                  spanElem.setAttribute("class", "textNode");
                  spanElem.textContent = textString;
            }
      }
      //good
      if (treeNode.childNodes.length > 0) {
            var newList = document.createElement("ol");
            newList.innerHTML = "|";
            nestedList.appendChild(newList);

            for (var n = treeNode.firstChild; n !== null; n = n.nextSibling) {
                  makeBranches(n, newList);
            }
      }
}

function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}