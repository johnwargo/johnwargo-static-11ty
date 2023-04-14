---
title: PHP Application Installation Problems
description: 
date: 2013-01-21
headerImage: 
categories: [Miscellaneous]
tags: post
---

I’m a big fan of open source content management systems (CMS) and I’ve built several web sites using Joomla!, Drupal and Concrete5 plus I experiment with many others. I’m also a huge fan of [FatCow](https://www.fatcow.com/join/index.bml?AffID=607551) and recommend them to anyone who is looking for a great hosting provider.

With all of my experience with these tools, I was really frustrated a while back when I stopped being able to install many of these tools in my hosting account. My existing application installations worked great, I simply couldn’t install anything new. I would create a SQL database on my server, FTP the application’s files to a folder on the server then start the installation process only to have it fail. For the Joomla! 2.5 install for example, it would get to a page during the installation process and simply hang.  I looked in the server’s error logs and really couldn’t find specifics about what was going wrong.

Well, I think I finally found the problem.

FatCow had upgraded to PHP 5.3 a while back and I switched my server over to the new version. These applications I was installing were making use of PHP sessions and in my hosting provider’s PHP setup they incorrectly configured the environment. PHP uses a configuration setting called session.save\_path to specify the location where the PHP server should place its session data for each user. By default, the variable is configured like this:{codecitation class="brush:text; gutter:false"}session.save\_path = "/var/php\_sessions"{/codecitation}

but on my server, that folder was not accessible by me (or apparently the PHP server). So, to fix the problem, I modified the PHP server’s configuration file and pointed the variable to a folder I did have access to (I created a new folder called php\_sessions off my server’s root). I ended up with something like the following:{codecitation class="brush:text; gutter:false"}session.save\_path = "/full\_path\_to\_account\_home/php\_sessions"{/codecitation}

Once I did that, all of a sudden everything started to work.

I think perhaps my hosting provider had created a php\_sessions folder for my account some time back and I’d deleted it not knowing what it was (something I know you should never do on a server, but sometimes I can’t help myself). But with this fix in place everything’s good again.