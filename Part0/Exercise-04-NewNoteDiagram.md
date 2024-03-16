## Exercise - 04: Diagram Depicting the Situation of request and response
Here is the simple diagram depicting the situation where the user creates a new note on the page [https://studies.cs.helsinki.fi/exampleapp/notes](https://studies.cs.helsinki.fi/exampleapp/notes) 

# Diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: This request goes to the server When I click on the save button. 
    Note right of browser: This is not by JS, this is by HTML Form. check the below Image

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: 302 - HTML document/redirect
    deactivate server
```

<figure>
<img src="../Image/part0-formForSaveButton.png" alt="Form Tag for sending POST request to the action url"/>
<figure-caption>Figure 1. Form Tag for sending POST request to the action url.</figure-caption>
</figure>

# Diagram in Points

1. First Enter the text
<figure>
<img src="../Image/part0-enterTextImage.png" alt="Enter Text in input field Image"/>
<figure-caption>Figure 2. Enter Text in input field Image.</figure-caption>
</figure>

1. When I click on the **Save** Button, the Form tag make a POST request for this url **https://studies.cs.helsinki.fi/exampleapp/new_note**. As you can see in following image, and Server respond the  <span style="color: orange;">**302 Status Code**</span>, That means request is done and it redirect me to same page, (I think this because it want to reload the page for show the changes)
<figure>
<img src="../Image/part0-requestGoesToNewNotesFile.png" alt="Enter Text in input field Image"/>
<figure-caption>Figure 3. Enter Text in input field Image.</figure-caption>
</figure>

# I think I explained it very well. If I made any mistake please let me know.