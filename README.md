ballpark.js
====================

ballpark.js is an in-browser app that gives you a ballpark estimate of how long a commonly used web asset takes to load. Given a queue of HTML files, ballpark.js loads each file into an iframe and logs the relevant Navigation Timing API values when these are set. When the queue is emptied, the user is presented with a table of results. 

Once a testrun is completed, the results are stored in the <code>location.hash</code> property in serialized JSON format. Like [SunSpider](http://www.webkit.org/perf/sunspider/sunspider.html), ballpark.js will recognize a hashed url, and render the corresponding results when the <code>onload</code> event occurs. This way, a URL with results can be passed around for verification and comparison. 

Ballpark.js is MIT-licensed, see LICENSE.txt.

## How are the results computed?

The result is arrived at by calculating <code>performance.loadEventEnd - performance.requestStart</code>. This determines the time (in ms) from the browser starts requesting resources from the server (after DNS has been resolved) to the moment the load event finishes.

## How do I run the tests?

After setting up the project on your webserver with correct .htaccess-settings and so forth (se below), point your webbrowser to the root-directory. The tests run in-browser - click 'engage' and you should be all set!

## How do I add my own tests?

1. Create a folder with all the assets you want, and an <code>index.html</code> that loads them.
2. If there is already a category in <code>/tests/</code> matching the content of your test, place your testfolder there. If not, create a new folder in <code>/tests/</code> named after the category in question, and place your testfolder in this newly created folder.
3. Update the <code>TESTRUNNER.data</code> object found in <code>tests.js</code>. The object has a property for each category, containing an array of tests. So if you have created, say, a test combining such-and-such images, add the title of your test to the images-category:

```javascript
...
    TESTRUNNER.data = {
        ...
        images: ["avatars", "1136-pixel-image","2880-pixel-image", "my_new_test"],
        ...
    }
```

## Deploying ballpark.js on an Apache-server 

We want Apache to send no-cache headers back to the client. Therefore, the project contains an <code>.htaccess</code> file that sets these headers. At this time we only have configuration details for Apache, not nginx or other systems.  

### Permitting directory-level configurations via .htaccess files

If you are unfamilliar with <code>.htaccess</code>-files, consult the [offical documentation](http://httpd.apache.org/docs/current/howto/htaccess.html).

Here is a crude heuristic tested on Debian 7. 

1. With root privileges, edit /etc/apache2/sites-available/default
2. Set 

```
    <Directory /var/www/>
    ...
    AllowOverride All
```
3. Test your configuration by writing gibberish in the <code>.htaccess</code>-file. This should trigger a 500 internal server error when accessing the project root folder from a browser.

## Roadmap

In the future, we want

* A deployment script that automatically creates <code>TESTRUNNER.data</code> from the directory structure in <code>/tests</code>.
* Enable the user to cherry-pick which tests are run via a checkbox in the browser, and let the user decide the number of iterations per test.
