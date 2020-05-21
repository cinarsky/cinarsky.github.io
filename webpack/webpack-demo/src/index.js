import _ from 'lodash';
import { cube } from './math.js';
 import printMe from './print.js';
import './style.css'
  function component() {
  //   var element = document.createElement('div');
  //  var btn = document.createElement('button');
  var element = document.createElement('pre');
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = [
            'Hello webpack!',
            '5 cubed is equal to ' + cube(5)
          ].join('\n\n');
  //  btn.innerHTML = 'Click me and check the console!';
  //  btn.onclick = printMe;

  //  element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());

  if (module.hot) {
        module.hot.accept('./print.js', function() {
          console.log('Accepting the updated printMe module!');
          printMe();
        })
      }