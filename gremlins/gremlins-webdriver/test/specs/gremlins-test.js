function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }
  var horde = window.gremlins.createHorde();
  horde.seed(1234);

  horde.after(callback);
  window.onbeforeunload = stop;
  var formFillerGremlin = gremlins.species.formFiller();
  var clickerGremlin = gremlins.species.clicker();

  //Modificación para que solo intente actuar sobre elementos que se pueden llenar
  horde.gremlin(formFillerGremlin
    .canFillElement(function(element) { 
      if (element.nodeName == "INPUT" || element.nodeName == "TEXTAREA" || element.nodeName == "SELECT") {
        return true;
      }
      else {
        return false;
      }; 
    }) );
  
  //Modificación para que solo haga click sobre botones o links
  horde.gremlin(clickerGremlin
    .canClick(function(element) { 
      if (element.nodeName == "A" || element.nodeName == "BUTTON") {
        return true;
      }
      else {
        return false;
      }; 
    }) );  

  setTimeout(stop, ttl);
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});