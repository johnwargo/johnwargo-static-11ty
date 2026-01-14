---
title: FatCow Fail
description: Describes my continued disappointment with FatCow hosting.
date: 2016-09-22
headerImage: 
categories: [Miscellaneous]
tags: post
---

I'm about done with FatCow. As you may know, I've been a big fan of FatCow and many, many years now. I've been a customer for about 15 years and have been recommending their service to anyone I know who needs to host email or web sites. I have multiple accounts with them and even pay an extra fee every month to get higher level support – mostly just so I could give them more money since I think (thought) they provided such a great product.

So, what happened?

## False Positive

Well, in order to better protect their customers' sites and to help generate additional sales for their SiteLock product offering, FatCow has started performing periodic, free security scans. What's weird is that they're selling SiteLock, but not using SiteLock for the scans. The issue for me is that scanner repeatedly kicks out false positives and its driving me crazy.

Let me give you some examples.

Every week or so, I receive the same email from the FatCow Security team:

"During a routine scan, the security team at FatCow discovered infected files in your "account_name" account. Typically, these security vulnerabilities are due to the presence of an outdated application or script in your account.

You can view a list of the infected files in the /stats directory of your account, in a file named 'websitescan.txt.' You can find more information on how to access this file, interpret its contents, and remove infected files in the article below: [https://fatcow.com/knowledgebase/beta/article.bml?ArticleID=437](https://fatcow.com/knowledgebase/beta/article.bml?ArticleID=437){target="_blank"}.

Please make sure to check any file backup(s) you have for a clean copy of the infected files. If you have clean copies, you can upload those. If not, once you get the infected files cleaned or removed, we recommend you keep regular backups of your website going forward

However, If you don't feel comfortable removing the infected files yourself, or would like to talk to a security expert, we recommend that you contact our preferred partner, SiteLock. You can find out about their security solutions at https://fatcow.com/product/sitelock, or call them directly at 1-855-378-6200.

Finally, to learn more about how to keep your site safe, visit the article below: https://fatcow.com/knowledgebase/beta/article.bml?ArticleID=2324#Nugget_5264 .

Sincerely,  
The FatCow Team"

That's cool, right? Proactive scanning of my site coupled with providing me with all sorts of information about what this means and how to fix it. So, I quickly jumped on my site and looked at the file; here's the contents:

```text
Scan started at - Tue Apr 19 14:52:35 EDT 2016  
/home/log/admintools_breaches.log.1: EIG.PHP.Backdoor.ArbEval-7.UNOFFICIAL FOUND

\----------- SCAN SUMMARY -----------  
Infected files: 1  
Time: 751.499 sec (12 m 31 s)  
Scan ended at - Tue Apr 19 15:05:07 EDT 2016
```

The infected file? It's a log file created by the Akeeba Admin Tools plugin. I use this tool on my Joomla sites to block attacks and, when it recognizes an attack, it blocks the IP address of the attacker then logs the activity to a log file.

That's not an infected file, it's a file containing information describing a thwarted attack, a false positive. So, I'm regularly pestered with these alarming emails telling me my site's infected when it's actually not. I want them scanning my site and I'm actually paying for the SiteLock service on most of my accounts, but it's really not doing much good for me right now.

I've also gotten these infected file notifications on FatCow's server-generated system log files. They send me a notice telling me to clean up these 'infected' files when the files in question are being generated directly by the server, not by anything I'm running. My simple CMS-based sites don't even have access to the folder where these system generated log files are placed, but they're still marking them as being infected when they're not.

So, I told the folks at FatCow that they're getting false positives and I get the following response:

"Hello,  
Thank you for your reply.

You have received the message from sitelock saying there are infected files in the account. If you have removed the infected files from the account and if you wish to scan the account again, please let us know. With authentication to the account: You can provide us the authentication of the account by answering security question set in the account: Question removed for security? You can check the security answer by going to: https://fatcow.com/secureControl/security-question.html?pid=4059212 .

Also, we have given below some suggestions to safeguard your website:

* generate a strong password combination for account, FTP, database and mailboxes.
* scan local computer with good antivirus, antispyware programs and clean bad programs.
* keep the software up-to-date with vendors/developers, and seek their support/forums for any known vulnerabilities/fixes/workarounds available.
* upgrade all the applications in your account to the latest version – this also applies to plugins, themes, modules, etc.

If you have any further questions, please feel free to contact us, We are available 24x7."

So, I' haven't removed anything from the site as there's no infected files but let them know about the issue and all the FatCow security team can think of is to let me know that I can have the scan repeated if I email them some additional security information. This conversation so far has been a complete waste of time.

Sigh.

That's probably my biggest, long-term issue with FatCow support. They're excellent when you call them, but from an email support standpoint, all support personnel seem to want to do is ignore the actual details of your request and simply respond with boilerplate information that has nothing to do with the initial request.

As I wrote this blog post, I got fed up and decided to call their support line to see if I can get them moving on this. Now, remember that I pay a monthly fee for premier support, and I've been sitting on hold waiting for them to answer for the last 35 minutes (so far) with no response.

It gets worse.

## Shutdown Account

My sun was a Cub Scout and I helped setup and run my son's Cub Scout Pack web site. We've both since moved on, but they reach out to me every once in a while, when they're having a problem. At one point, FatCow shut down the site and, because it's a volunteer organization running it, nobody noticed the email from FatCow explaining why they did it. That's not good.

So, I logged into the pack's FatCow account and found the following:

"Hello,

This message is to inform you that we have detected spam emails originating from a script in your account. Our monitoring tools have suspected the following file:

/home/administrator/index.php

As a result, we had to suspend your account, to avoid problems for site visitors or other customers. If this is your script, then you will need to take necessary action to remove or limit the script's usage to the following:

200 messages per hour  
2000 messages per day  
100 recipients per execution

Once you have taken the necessary action, please reply back to us with the confirmation. I suggest you to use bulk mailer service for emailing purpose. You can use Constant Contact to send out emails. To learn more about this, please refer the URL https://fatcow.com/product/constantcontact.bml .

If this is not your script, it suggests that your account has been compromised. To learn more about reasons for account getting hacked and the ways to prevent it, please visit the KB link: https://fatcow.com/knowledgebase/beta/article.bml?ArticleID=2324#Nugget_5264 .

In order to re-enable the account, we ask you or your administrator reply to this message after taking necessary action on the script specified above.

Sincerely,

Ganesh P  
Senior Technical Specialist"

Um, yeah, we're not sending spam, I'm sure of it. So I responded and told them we were not sending spam and that they needed to unlock the account. Here's what they said:

"I can understand your concern.

Please download 'logs.txt' file which is inside 'stats' folder from Filemanager tool which will show logs of email sending from script /administrator/index.php. If you analyze this mail log, you can notice email sending to webmaster@sitename.org with subject 'Automatic_IP_blocking_notification_for' . This seems like issue with configuration settings inside Joomla admin panel.

I have now removed suspension on website and CGI service for your account. Please log in to admin panel of website at https://sitename.org/administrator/ and recheck the configuration settings.

Thank you for clarification about Joomla module. Our server monitoring tool taken it as a suspicious activity and thus suspended services for your account. However, we have revoked the suspension on your account. In any case if you are exceeding the email limits, it will take it as spamming. This is the reason we are suspending the services for your account."

What's wild about this is that in their response, they actually provide the proof that the server isn't sending spam. By their very words, they're describing that the server is sending out emails notifying the webmaster that someone is trying to break into the site. Automated threat detection systems are great, but in this case, automatically shutting down the site was a really bad idea.

What I'd like to see is them trying to actually block the hackers from trying to get into my site rather than shutting down my site because they think my server's sending spam in response to the attack.

Anyway, I took a look at the admin tools console and noticed the following:

<img src="src/images/2016/website-login-surge-640.png" alt="Website login surge" />
Figure 1

As you can see from the figure, the server was humming along, then suddenly had more than 8,000 bad login attempts in a very short period of time. This site has a maximum of about 100 users, no more than 10 or so would ever be on the site at the same time, so clearly there's a problem. Does my hosting account need to be shut down because of it? No, not really. Are the hackers getting in? Nope, they're not, and each IP address is being blocked, so they have to come up with a new one to try again. Clearly there's a botnet at work here.

FatCow's made some serious changes to their support policies. Where I could create a new support ticket or call them any time I wanted, they've since removed those abilities and force everyone to have an online chat first. What's funny is the content to submit a ticket and the phone number are still on the support page, they simply hide them after the page renders in order to force you through the chat process. Chat doesn't work very well when there's a long wait. The first time I tried it, the hold time was like 20 minutes, so I got to work on something else as I waited. A technician finally got on the chat, but I'd forgotten that I'd started a chat and couldn't figure out what that chiming was from my PC.

## Making Some Progress

Now, I've been pretty vocal with FatCow about this issue, every week, when they send me an infection notice, I sometimes politely, but sometimes not so politely let them know it's a false positive. When they send the notification, FatCow also notifies SiteLock, so their folks quickly call me trying to sell me more services. I've discussed this with SiteLock, and that's how I know it's the FatCow malware scanner, not SiteLock's that's causing the false positive.

Eventually, my rants were escalated, and a senior technician jumped in and is trying to help. Apparently, they won't change their scanner to identify this particular false positive. They say that it can't be done, but as an experienced software developer I'm having a hard time believing that. I'm sure it's an investment thing, WordPress is more popular than Joomla, so I imagine they have more customers on WordPress than any other. I've proven this actually as I have an equal number of WordPress and Joomla sites, and their scanners only find issues with WordPress sites.

The final solution? They simply let their support technicians know not to send me a malware notification if it's that one file. It works for me, but that's not really the best solution. At least they're trying (finally) and at least they're proactively scanning their sites for malware.

I'm going to stick with FatCow for now, but the more I work with them, the more I realize that I really need a different solution. Stay tuned.