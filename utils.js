!function  () {

	var Utils;

	Utils = function() {

    var __init__, onload, onclick, click, noOp, AJAX, selectElement, hide, show;

    hide = function(target) {
    	target.setAttribute('hidden', true);
    	return target;
    };

    show = function(target) {
      target.removeAttribute('hidden', false);
      return target;
    };

    selectElement = function(selector){

      // selector is a dom element id
      var collection;

      collection = [].slice.call(document.querySelectorAll(selector));

      if(!collection.length){
        throw new Error("Cannot find dom element: " + selector);
        return false;
      } else {

        collection.html = function(htmlString){
          
          var _self;
          _self = this;

          _self.forEach(function(node, index){
            node.innerHTML = htmlString;
          });
          return _self;

        };
        
        collection.css = function(css){
          
          var _self, applyStyles;
          _self = this;

          applyStyles = function (node, styles){
            for (attr in styles){
              node.style[attr] = styles[attr];
            }
          };

          _self.forEach(function(node, index){
            applyStyles(node, css);
          });

          return _self;

        };


      }

      return collection;

    };

    AJAX = function (httpMethod, url, callback) {
      
      var xhr;

      xhr = new XMLHttpRequest();
      xhr.open(httpMethod, url, true);
      xhr.send();

      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          callback(null, xhr);
        }
      };

      xhr.onerror = function() {
        callback(xhr);
      };
    }

    noOp = function() {
      return false;
    };
    

    __listeners__ = {
    	clicklisteners : {},
    	onloadlisteners : {}
    };

    onload = function(callback){
    	document.onreadystatechange = function (){
    		if (document.readyState === "complete") {
    			
			  }
    	};
    };

    /**
     *		Takes an {} full of methods to be executed onclick
     **/
  	onclick = function(methods) {

  		// sets global click listener
    	document.addEventListener('click', function (E){
        E.target.id ? click(E.target) : noOp();
      });

    	for (target in methods) {
    		__listeners__.clicklisteners[target] = methods[target];
    	}
    	return __listeners__.clicklisteners;
    };

    

    click = function(target){


      // selector = DOM Elem {}
      var _self, id, methods;
      id = target.id;
      methods = __listeners__.clicklisteners;

      methods.hasOwnProperty(id) ? methods[target.id](target) : noOp();

    };  // end



		// on page load
  	document.onreadystatechange = function () {
		  if (document.readyState === "complete") {
		    __init__();
		  }
		};

		__init__ = function() {

    	AJAX('GET', '../home.html', function (err, xhr) {
				if(err){
          console.log(err);
          return false;
        } else {
        	selectElement('body')
        		.html(xhr.response);
        }
			});

		};

		return {
	      selectElement : selectElement,
	      AJAX : AJAX,
	      onload : onload,
	      onclick : onclick
		};
	};

  U = window.Utils = Utils();

}();