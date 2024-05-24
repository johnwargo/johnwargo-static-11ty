---
title: A New RESTful Service
description: 
date: 2011-09-07
headerImage: 
categories: [IBM Lotus Domino]
tags: post
---

I have published several articles on this site that illustrated different types of web services for Domino that I have used in some mobile applications. Domino easily supports XML-based web services and platforms such as BlackBerry and Windows Mobile have inherent capabilities that allow applications to consume XML-based web services. Other platforms on the other hand don't have built-in support for XML-based web services, so I've had to implement RESTful services for applications built for other platforms such as Android and iOS. More recently I've decided to make a change to the RESTful agent I've been using for my applications and thought I'd document the changes here.

With my original web services, the idea was that a mobile application would send a request for a list of contacts that matched a search string then, when an application user selected a user, the application would make another call to the server to obtain the details for the selected contact. This process is illustrated in Figure 1.

{% image "src/images/2011/drawing1.png", "Figure 1 – Two-part Request Process", "image-full" %}
Figure 1 – Two-part Request Process

When I first started doing mobile development, performance was important. The networks were slow and mobile devices had limited processing power, memory and battery life. In order to make the most efficient use of the network and increase performance and battery life for the device, I built the services to make the best use of network and processing power. What this meant was that the services would be designed to send a little data as possible over the wireless network and to ensure that data that would possibly not be used by the mobile application wouldn't be sent across the wireless network.

So, in my design, I deliberately built the services so the first request simply retrieved a list of contacts that matched the search string then allowed the application to get detailed contact information only after they determined which contact they were interested in.

It seemed like a good approach and has served me rather well. The problem with this approach though is that it makes building the mobile application more difficult. There are two calls to the server and the results have to be parsed twice as well. If the mobile user selects one contact, then decides it's the wrong one and switches to another, there's another trip to the server for more data.

It's efficient on the network, but inefficient within the application. The thing is, mobile users and mobile device manufacturers stopped caring about network usage and battery life a long time ago. Users want whatever they want and they want it now.

Apple's Dashcode IDE has some pretty cool features that make it easy to work with remote data sets. When you build a Browser project using one of Dashcode's wizards, the application expects a list of records and the details behind the list to all be delivered to the application at one time. The result is only one trip to the server, and a better user experience. There's only one trip forth and back from the server which makes the user feel better, but we're delivering data to the mobile device application that the user may never look at. Oh well.

So, I decided to rewrite my Domino Directory lookup agent so all of the relevant data could be retrieved with a single call to the RESTful agent as shown in Figure 2.

{% image "src/images/2011/drawing2.png", "Figure 2 – Single Part Request Process", "image-full" %}
Figure 2 – Single Part Request Process

With this new service, a single call is made to the server using the following URL:

```text
https://server/database.nsf/contactlookuprest?openagent&ss=SEARCH_STRING
```

where SEARCH_STRING represents the first three characters (or so) of the contact name the user will be searching for. As an example, a call to the server using the following URL:

```text
https://server/database.nsf/contactlookuprest?openagent&ss=war
```

would return the following JSON data (or something like it):

```json
[{ "FullName":"Anna Wargo", "LastName":"Wargo", "FirstName":"Anna", "EmailAddress":"awargo@somecompany.com", "OfficePhone":"330.665.1234", "MobilePhone":"330.999.1234"},   {"FullName":"John Wargo", "LastName":"Wargo", "FirstName":"John", "EmailAddress":"john@johnwargo.com", "OfficePhone":"330.123.4567", "MobilePhone":"330.987.6543"}]
```
  
The JSON text returned from the server in this case is an array of JavaScript objects. If you expand the JSON text to show the structure of the data, the data will look like the following:

```json
[  
 {  
  "FullName":"Anna Wargo",  
  "LastName":"Wargo",  
  "FirstName":"Anna",  
  "EmailAddress":"awargo@somecompany.com",  
  "OfficePhone":"330.665.1234",  
  "MobilePhone":"330.999.1234"  
 },  
 {  
  "FullName":"John Wargo",  
  "LastName":"Wargo",  
  "FirstName":"John",  
  "EmailAddress":"john@johnwargo.com",  
  "OfficePhone":"330.123.4567",  
  "MobilePhone":"330.987.6543"  
 }  
]
```
  
I can use this data in my application by only pulling out the list of FullName values when presenting a list of contacts, then digging in and displaying the contact details only after a contact has been selected within the application.

The brackets (the `[` and `]` characters) are used to define an array and the curly braces ( the '{' and '}' characters) are used to define a JavaScript object. So, what you're seeing is a essentially a two element array, where each element is a complete JavaScript object describing contact details for a user defined in the Domino Directory database.

To obtain this output, all you need is a simple agent in a Domino Directory database. To create the RESTful service, create a new agent in your Domino Directory and set the agent properties shown in Figure 3. The agent is a web agent; it is triggered by a URL request triggered by the mobile application (or web browser). It uses an 'On Event' trigger and the event is defined as 'Agent list selection.'

{% image "src/images/2011/image3.png", "Figure 3 – Domino RESTful Agent Properties", "image-full" %}
Figure 3 – Domino RESTful Agent Properties

Most of the agent's work is done in the Initialize subroutine which performs the following steps:

1. Parse the incoming URL to determine the search string being passed in by the calling program.  
2. Search the ($VIMPeopleByLastName) view to locate all users defined in the database whose last name begins with the characters provided in the search string.  
3. Loop through the search results and create the JSON array described previously.  
4. Print the JSON array text to the console which causes it to be returned to the program that triggered the URL.

In the code, the GetCmdLineValue function is used to parse the HTTP QUERY_STRING variable to retrieve values passed on the URL.

Here is the complete code for the agent:

```vb
%REM  
Agent ContactLookupREST  
Created Jan 13, 2010 by John M. Wargo  
Description: Modified the existing DomDirLookupREST agent  
so it returns the complete contact array rather than  
forcing a developer to create a second call to the agent  
after the user selects a contact. This would send more  
data over the network, but will make a mobile application  
that calls it more responsive.  
%END REM  
  
Option Public  
Option Declare  
Option Base 1  
  
'Notes Objects  
Dim db As NotesDatabase  
  
Sub Initialize()  
  
'Print out this line to force Domino to  
'not write it's own HTML gunk at the  
'beginning of the resulting page.  
Print "Content-Type:text/html"  
  
'some constants we'll need  
Const amp = |&|     
Const BR = |<br />|  
Const comma = |,|  
Const errorStr = |"ERROR: |  
Const jsonArrayStart = "["  
Const jsonArrayEnd = "]"  
Const jsonObjectStart = |{|  
Const jsonObjectEnd = |}|  
Const quoteStr = |"|  
  
'Notes Objects  
Dim doc As NotesDocument  
Dim s As NotesSession  
Dim tmpName As NotesName  
Dim userView As NotesView  
Dim userDoc As NotesDocument  
Dim ve As NotesViewEntry  
Dim vec As NotesViewEntryCollection  
  
'Other variables  
Dim i As Integer  
Dim jsonText As String  
Dim numContacts As Integer  
Dim queryStr As String  
Dim searchStr As String  
  
'Initialize our Notes session object  
Set s = New NotesSession  
'Then get a handle to the current database  
Set db = s.CurrentDatabase  
'Get a handle to the agent's context  
'(header variables and so on)  
Set doc = s.DocumentContext  
  
'Proper command line for the agent is:  
'https://servername/dbname/ContactLookupREST?openagent&ss=SEARCH_STRING  
queryStr = LCase(doc.Query_String_Decoded(0)) & amp  
searchStr = GetCmdLineValue(queryStr, "&ss=", amp)  
  
'Open the view we're going to lookup against  
Set userView = db.GetView("($VIMPeopleByLastName)")  
If Not userView Is Nothing Then  
'Do we have a search string?  
If Len(Trim(searchStr)) > 0 Then  
  'See if we can find any users by the search string  
  Set vec = userView.GetAllEntriesByKey(searchStr)  
Else  
  'Otherwise get all documents  
  Set vec = userView.AllEntries  
End If  
'Now, if we have any entries - put them into the array  
If vec.Count > 0 Then  
  'Get the number of contacts to use throughout the  
  ' rest of the code  
  numContacts = vec.Count  
  'Start the Array JSON text  
  jsonText = jsonArrayStart  
  'Process all of the entries in the View Entry Collection  
  For i = 1 To numContacts  
    Set ve = vec.GetNthEntry(i)  
    If Not ve Is Nothing Then  
      Set userDoc = ve.Document  
      If Not userDoc Is Nothing Then  
        'Populate the result fields  
        Set tmpName = New NotesName(userDoc.FullName(0))  
        'Start the JSON text we'll be returning  
        jsonText = jsonText & jsonObjectStart & _  
        |"FullName":| & quoteStr & _  
        tmpName.Abbreviated & _  
        quoteStr & comma & _  
        |"LastName":| &  quoteStr & _  
        userDoc.LastName(0) & _  
        quoteStr & comma & _  
        |"FirstName":| &  quoteStr & _  
        userDoc.FirstName(0) & _  
        quoteStr & comma & _  
        |"EmailAddress":| &  quoteStr & _  
        userDoc.InternetAddress(0) & _  
        quoteStr & comma & _  
        |"OfficePhone":| & quoteStr & _  
        userDoc.OfficePhoneNumber(0) & _  
        quoteStr & comma & _  
        |"MobilePhone":| &  quoteStr & _  
        userDoc.CellPhoneNumber(0) & quoteStr & _  
        jsonObjectEnd  
      Else  
            'Unable to get the document  
        jsonText = jsonText & errorStr & _  
        |Unable to open the contact document"|  
      End If  
    Else  
      'Unable to access the View Entry  
      jsonText = jsonText & errorStr & |Unable to access the ViewEntry"|  
    End If  
    'Add a comma if we need one (when there's  
    ' more than one name being returned)  
    If (i < numContacts) Then  
      jsonText = jsonText & comma  
    End If  
  Next i  
'Write our resulting JSON results to the browser  
  Print jsonText & jsonArrayEnd  
  Else  
    'We got nothing, so return an empty array to the  
    'calling program  
    Print jsonArrayStart & jsonArrayEnd  
  End If  
End If  
  
End Sub  
  
%REM  
Function GetCmdLineValue  
Description: Parses a string and returns  
the value between two delimeters  
%END REM  
Function GetCmdLineValue( textStr As String, delim1 As String, delim2 As String) As String  
  
Dim startPos As Integer  
Dim tmpInt As Integer  
Dim valLen As Integer  
  
'find the first ocurrance of the delimeter  
tmpInt = InStr( textStr, delim1)  
'Only continue if we've found something  
If (tmpInt > 0) Then  
  'Figure out where the value starts  
  startPos =  tmpInt + Len(delim1)  
  'Then look past there for the second delimeter  
  valLen = InStr(startPos, textStr, delim2) - startPos  
  'The value we're looking for is between the two delimeters  
  GetCmdLineValue = Mid( textStr, startPos, valLen)  
Else  
  GetCmdLineValue = ||  
End If  
  
End Function
```

After you've entered all of the code into the agent, be sure to test the results by pasting the service URL (using your own server and database values) into the desktop browser.