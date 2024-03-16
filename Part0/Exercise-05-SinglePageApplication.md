## Exercise - 05: Diagram depicting the situation where the user goes to the single page app of the note app
Here is the simple diagram depicting the situation where the user goes to the single page app of notes App [https://studies.cs.helsinki.fi/exampleapp/spa](https://studies.cs.helsinki.fi/exampleapp/spa) 

# Diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: 200 - HTML document
    deactivate server

    Note right of browser: This css file request is initiate from HTML document <link></link> tag.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: 200 - CSS stylesheet

    Note right of browser: This js file request is initiate from HTML document <script></script> tag.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: 200 - JS script

    Note right of browser: After JS loads, It sends a http GET request using XMLHTTPREQUEST [See Image 1].

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: 200 - Type xhr / Data JSON

    Note right of browser: After that json response JS execute the redrawNotes() function [See Image 1]
```
<figure>
<img src="../Image/part0-Exer-05-JS-image-01.png" alt="Enter Text in input field Image"/>
<figure-caption>Figure 1. JS execute XML HTTP request to <em>/exampleapp/data.json</em></figure-caption>
</figure>


# I think I explained it very well. If I made any mistake please let me know.