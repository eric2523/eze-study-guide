# AJAX
**A**synchronous **J**avaScript **A**nd **X**ML

Used in the front-end to fetch data from a web server and display/use that data in web pages through JavaScript & HTML. 

Pros:
* Allows web pages to fetch data asynchronously without interfering with the page's existing display. 
  * can update parts of a webpage without a complete reload 
* Can reduce bandwidth usage and increase speed by fetching only data that is required

Cons:
  * Can increase client-side load on web server (ex: auto-updating features)

### Example request with jQuery library
```js
$.ajax({
    method: "post",
    url: `/api/users/${userId}/user_follows`,
  })
```