---
title: Domino & BlackBerry Java Applications - Part 1
date: 2009-09-07
categories: [IBM Lotus Domino]
tags: post
---

Introduction
============

**Note:** removed obsolete attachments November 11, 2022

When I worked at Research In Motion and after, I’ve presented at [Lotusphere](http://www.lotusphere.com) and the [View Domino Developer Conference](http://www.lotusdeveloper2010.com/) on how to access Domino applications from BlackBerry devices.

Of course, the lead approach was to use the browser to access mobile friendly Domino applications. It’s not a very exciting demo though – you take a domino database and scrunch it down so it fits the smaller screen and uses rich media sparingly.

The other option I discussed was to create Web Services in a Domino application then use Research In Motion’s MDS Runtime technology to access the operations exposed by these services. It was a truly amazing demonstration to illustrate the web service then build a rich (non-browser) BlackBerry application that talked to it in minutes. With Research In Motion’s recent announcement of the end of life of MDS Runtime and associated development tools – developers need another option for building a (non-browser) rich client application that talks to web services. I’m sure there’s a way to do it from a BlackBerry Widget but I still haven’t had a chance to play with that technology yet.  The only other option is to consume the Web Service from a Java application and for my presentation this year at the View Domino Developer conference I built a Java version of the application I’d been demonstration for years using MDS Runtime.

A few weeks ago I posted here that I was going to write some articles about how to build that application. From the responses I received, it seems that there are a lot of you who are interested in the information, so here we go…

I’m going to split this topic into three parts:

*   Part 1: (this article) How to build the Domino Web Service used in the sample application
*   [Part 2: How to create the Web Service Stub called by the Java application](index.php?option=com_content&view=article&id=47:dbja2&catid=2&Itemid=4)
*   [Part 3: How to build the Java application (for BlackBerry of course) that talks to the service](index.php?option=com_content&view=article&id=67:bbdja3&catid=2&Itemid=4)

Before we begin, it’s important to highlight that Research In Motion has published a lot of information about connecting to a Domino application from a BlackBerry device – be sure to check out [na.blackberry.com/eng/developers/started/develop/ibm.jsp](http://na.blackberry.com/eng/developers/started/develop/ibm.jsp) for additional information on the topic.

Learning How to Build a Domino Web Service
==========================================

When I first set about learning about how to build Web Services in Domino, there really wasn’t much information available. The first I’d heard about it was from some old articles that Gary Devendorf (now at Microsoft, go figure) on how to do web services in ND6 (that’s Notes & Domino 6 for the uninitiated). It was quite a mess; you had to build an agent that could read and write XML and had to hand craft the service’s WSDL to use with some tools.

With the release of Domino 7, IBM made it much easier to build web services. Ultimately, the way I learned how to create the sample application in this article was from reading this: [http://www.ibm.com/developerworks/lotus/library/nd7-webservices/](http://www.ibm.com/developerworks/lotus/library/nd7-webservices/). If you don’t know how to do web services in Domino, that’s a great place to start reading.

About the Project
=================

When I first started looking for a good sample application for Domino developers I looked for something that would appeal to the widest audience of developer. I thought about how every Domino environment I’d ever worked with had at least one (sometimes more) additional contact databases outside of the standard Domino Directory. Since the BlackBerry already provided search capabilities against the Domino Directory, it seemed like a good idea to build a web service that would allow BlackBerry applications to lookup contacts in one of these other databases.

Assuming that most of these additional contact databases were created against a copy of the Domino Directory, I built the web service using that template as a starting point. If you use this web service against a database that wasn’t built off of that template, you will have to change the view, column and field names to match the needs of the target database.

Building the Web Service
========================

The web service is used to lookup contact information for a particular person in the database. It contains two operations: GetUserList and GetUserDetails. GetUserList takes as a parameter a portion of the last name being searched for and returns an array containing the names of all contacts who’s last name begins with the specified string. GetUserDetails takes as a parameter the name of a contact and returns a UserInfo object containing several fields from the selected Contact document in the database.

Let’s get started building the web service. To do this, you will need to use Domino Designer 7 or higher – the screen shots in this article were taken in Domino Designer 8.5. The database you’re creating will need to reside on a Domino server with the HTTP task enabled in order to be able to be accessed by the BlackBerry Java application we’ll create in Part 3.

Open Domino Designer and open the contact database in design mode (it would be best to do this in a template, but that’s up to you). In designer, expand the ‘Code’ section of the design element hierarchy as shown in Figure 1. Right-click on ‘Web Services Providers’ and select ‘New Web Service Provider…’ as shown in the figure.

![](images/stories/dbja1-1.jpg)  
Figure 1

Designer will create a new Web Service and prompt for the properties for the service. In the first tab of the Web Service properties (shown in Figure 2) you will need to provide a name for your service. In this case, I am calling it ‘DomDirLookup’ – the class name for the Web Service must match the name you enter here.  In this example, I named the service and the Port Type Class the same.

![](images/stories/dbja1-2.jpg)  
Figure 2

On the security tab (shown in Figure 3) you will want to set the appropriate security properties for the Web Service. Depending on how confidential the data is in the database, you may want to force users to authenticate to the database before being granted access or you can just set the ACL default access to Reader to allow anyone in. If you need to be able to track access to the database, you will want to enable the ‘Run as web user’ checkbox so when the agent runs, it runs under the credentials of the person accessing the database.

![](images/stories/dbja1-3.jpg)  
Figure 3

In the propeller head tab on the Web Services properties (shown in Figure 4) are settings that effect your ability to access the Web Service from a Java application. As shown in Figure 3, the Web Service’s ‘Programming Model’ must be set to ‘RPC’ and the ‘SOAP message format’ must be set to ‘Doc/Literal.’ I found that without these settings, the Sun Java Wireless Toolkit was not able to create the necessary stub program needed to access the service from a Java application.

![](images/stories/dbja1-4.jpg)  
Figure 4

Once you have all of the properties set, you must now start writing the code for the service. For this particular Web Service, I wrote all of the code in LotusScript. Because of the way I write agents and because of the way I loop through result sets in the agent, I added the following code to the ‘Options’ section of the Web Service.

{codecitation class="brush:vb; gutter:false"}Option Public  
Option Declare  
Option Base 1{/codecitation}

The rest of the code goes into the ‘Declarations’ section of the Service. Since we’re not running this code like an agent, the ‘Initialize’ and ‘Terminate’ sections of the Web Service aren’t used – everything is in the ‘Declarations.’ I could have broken some of the code out into subroutines, but that wasn’t needed for this simple service.

![](images/stories/dbja1-5.jpg)

Figure 5

At this point, let’s take a look at the core portion of the code:

The first thing the code does is declare objects for the NotesDatabase and NotesSession objects.:

{codecitation class="brush:vb; gutter:false"}'Some Notes objects we'll need  
Dim db As NotesDatabase  
Dim s As NotesSession{/codecitation}

In the code that follows, the Web Service defines the UserList class which will return an array of Strings containing the list of contacts that matched the search criteria:

{codecitation class="brush:vb; gutter:false"}'The following class defines an array of strings  
'that will be returned by the function GetUserList  
Class UserList  
Public users() As String   
End Class{/codecitation}

Domino can’t return an array of string to the Web Service consumer, so I had to wrap the array into a class and return the class – the calling program will automatically convert the class to the appropriate array.

Next I define a UserInfo class that contains the different values returned from the selected contact record (person document). In this case it’s just a bunch of fields I thought would be cool to use in the program – you may find that you need different fields returned for your particular application:

{codecitation class="brush:vb; gutter:false"}'the following class defines the user details  
'that we will be returning for a detailed lookup  
Class UserInfo  
Public FirstName As String  
Public LastName As String  
Public FullName As String  
Public EmailAddress As String  
Public OfficePhone As String  
Public MobilePhone As String  
End Class{/codecitation}

Ok, that’s it for the setup – now we need to actually write the code that does all of the work.  The first thing you must do is create the class defined when you gave the Web Service a name in Figure 2.  After that comes one subroutine and two functions:

{codecitation class="brush:vb; gutter:false"}Class DomDirLookup  
  
Sub New  
'Initialize our Notes session object  
Set s = New NotesSession  
'Then get a handle to the current database  
Set db = s.CurrentDatabase     
End Sub  
  
Function GetUserList(searchStr As String) As UserList  
  
End Function  
  
Function GetUserDetails(searchStr As String) As UserInfo  
  
End Function  
  
End Class{/codecitation}  
The ‘New’ subroutine does some simple setup for the Web Service – gives it access to the current Session and the current database. This is code any experienced Domino developer has written hundreds of times, although not normally in a ‘New’ subroutine but rather in ‘Initialize.’

The ‘GetUserList’ function is setup for the input parameter and returns the UserList class when it’s all finished. The ‘GetUserDetails’ works the same way, although it returns a UserInfo class as shown in the sample.

Once the framework for the service has all been defined, all you have to do is plunk in the rest of the code needed to implement the functionality required for the GetUserList and GetUserDetail functions. Now, before you take a look at the completed code – please try to remember that I wrote this code to demonstrate how to consume a Domino Web Service from a BlackBerry device. I did not make any effort to make the code as clean and efficient as possible, I just wrote the code to have something to call – realizing that the BlackBerry stuff was cooler. If you look at the code and think there’s a better way to do it, then you’re probably right – please don’t tell me about it. ;-)

All right, that being said – here’s the complete code for the Web Service. I tried to put in a bunch of comments so it will be easy to understand what I’m doing here. I’ll attach a Notes database with the full source code for the service to this article when I publish it.

{codecitation class="brush:vb; gutter:false"}'Notes Objects  
Dim db As NotesDatabase  
Dim s As NotesSession  
Dim userView As NotesView  
Dim userDoc As NotesDocument  
  
'Other objects  
Dim i As Integer  
  
Const errorStr = "ERROR"  
  
'The following class defines an array of strings  
'that will be returned by the function GetUserList  
Class UserList  
Public users() As String   
End Class  
  
'the following class defines the user details  
'that we will be returning for a detailed lookup  
Class UserInfo  
Public FirstName As String  
Public LastName As String  
Public FullName As String  
Public EmailAddress As String  
Public OfficePhone As String  
Public MobilePhone As String  
End Class  
  
Class DomDirLookup  
  
Sub New  
'Initialize our Notes session object  
Set s = New NotesSession  
'Then get a handle to the current database  
Set db = s.CurrentDatabase     
End Sub  
  
Function GetUserList(searchStr As String) As UserList  
  
'Local Notes objects  
Dim tmpName As NotesName     
Dim ve As NotesViewEntry  
Dim vec As NotesViewEntryCollection  
  
'Put something out to the console so we know we're running  
Print "Starting GetUserList"  
'Make a new user list for our result set  
Set GetUserList = New UserList     
'Populate the list with a default value  
Redim GetUserList.Users(1)  
GetUserList.Users(1) = "Error retrieving user list"     
'Open the view we're going to lookup against  
Set userView = db.GetView("($VIMPeopleByLastName)")  
If Not userView Is Nothing Then           
'Do we have a search string?  
If Len(Trim(searchStr)) > 0 Then  
'See if we can find any users by the search string  
Set vec = userView.GetAllEntriesByKey(searchStr)  
Print |Searching contacts for "| & searchStr & |"|  
Else  
'Otherwise get all documents  
Set vec = userView.AllEntries  
Print |Retrieving all contacts|  
End If       
'Now, if we have any entries - put them into the array  
If vec.Count > 0 Then  
Print |Located "| & vec.Count & |" contacts|  
'Redimension the array to the size of the result set  
Redim GetUserList.Users(vec.count)  
'Process all of the entries in the View Entry Collection  
For i = 1 To vec.Count  
Set ve = vec.GetNthEntry(i)  
If Not ve Is Nothing Then  
Set userDoc = ve.Document  
If Not userDoc Is Nothing Then  
Set tmpName = New NotesName(userDoc.FullName(0))  
If Not tmpName Is Nothing Then  
Print |Adding "| & tmpName.Common & |" to the contact list|  
GetUserList.Users(i) = tmpName.Common             
Else  
Print |Unable to access contact information|  
GetUserList.Users(i) = errorStr  
End If  
Else  
Print |Unable to access contact document|  
GetUserList.Users(i) = errorStr  
End If             
Else  
Print |Unable to access view entry collection|  
GetUserList.Users(i) = errorStr             
End If  
Next  
Else  
Print |No contacts found|  
GetUserList.Users(1) = "No contacts found matching search criteria"     
End If  
End If     
Print "Leaving GetUserList"  
End Function  
  
Function GetUserDetails(searchStr As String) As UserInfo  
  
'Temporary storage as we manipulate the contact name  
Dim tmpName As NotesName     
  
'Put something out to the console so we know we're running  
Print "Starting GetUserDetails"  
'Make a new user list for our result set  
Set GetUserDetails = New UserInfo     
'Initialize our default return value  
GetUserDetails.FullName = "Unable to locate specified user"         
'Do we have a search string?  
If Len(Trim(searchStr)) > 0 Then  
'Open the view we're going to lookup against  
'this is a different view because we're searching against  
'the full name where above we're using last name  
Print |Opening $VIMPeople view|  
Set userView = db.GetView("($VIMPeople)")  
'Make sure we have the view  
If Not userView Is Nothing Then  
'Try to get the user document using abbreviated full name as a key  
'This should work because the view is sorted that way.  
Print |Searching for  "| & searchStr & |"|  
Set userDoc = userView.GetDocumentByKey(searchStr)  
If Not userDoc Is Nothing Then  
'Populate the result fields           
Set tmpName = New NotesName(userDoc.FullName(0))  
GetUserDetails.FullName = tmpName.Abbreviated  
GetUserDetails.LastName = userDoc.LastName(0)  
GetUserDetails.FirstName = userDoc.FirstName(0)  
GetUserDetails.EmailAddress = userDoc.InternetAddress(0)  
GetUserDetails.OfficePhone = userDoc.OfficePhoneNumber(0)  
GetUserDetails.MobilePhone = userDoc.CellPhoneNumber(0)   
Else  
Print |Unable to open contact document|  
End If         
Else  
Print |Unable to open $VIMPeople View|  
End If  
Else  
Print "No contact name provided, exiting"  
End If           
Print "Leaving GetUserDetails"   
End Function  
  
End Class{/codecitation}

In the Next Installment
=======================

In the next installment in this series I’ll demonstrate how to use the Sun Java Wireless Toolkit to generate the Java stub code needed to call this service from a Java application. Stay tuned!