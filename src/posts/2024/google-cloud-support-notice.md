---
title: Leaked Credentials from Google Cloud Project
description: Describes an issue I had connecting Google Analytics to this site; Google Cloud Security complained mightily about access credentials I stored in the site's public repo.
date: 2024-01-06
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Cloud Development
  - Eleventy
  - Web Development
---

When I migrated this site from Joomla to [Eleventy](https://www.11ty.dev/){target="_blank"}, a couple of the features I added pulled data from Google Analytics (GA):

* The site's [Home](/){target="_blank"} page uses GA to pull in the 10 most popular posts. 
* The site's [Statistics](/statistics){target="_blank"} page uses GA to display some access statistics.

For the GA integration, I used instructions I found on [fjolt.com](https://fjolt.com/article/javascript-ga-api-most-popular-posts){target="_blank"}. The article was pretty clear, so I was able to code the integration in no time. One issue though, was that the [Google Analytics Data: Node.js Client](https://www.npmjs.com/package/@google-analytics/data){target="_blank"} uses an external credential file and that's where this story begins.

## The Problem

A few months after I launched the site, I received an email from [Google Cloud Support](mailto:cloudsupport@google.com) complaining about **Leaked Credentials**. Here's the email content, cleaned up and sterilized:

> Hello, 
> Case Subject: Leaked Credentials from Google Cloud Project jmw-static-site
> We have detected potentially compromised Service Account authentication credentials associated with the following Google Cloud Platform account: blahblahblah@jblah.iam.gserviceaccount.com with key ID <some-random-key> This key was found at the following URL: https://github.com/johnwargo/johnwargo-static-11ty.
> Based on our investigation of the issue, we believe that you or your organization may have inadvertently published the affected Service Account credentials in public sources or websites (for instance, if credentials were mistakenly uploaded to a service like GitHub). Immediate action is required to secure your account(s). We strongly recommend that you take the following steps: --- Log in to the Google Cloud Console (cloud.google.com/console) and review the activity on your account. -- Revoke all (or listed) credentials for compromised Service Accounts. As every resource accessible to the Service Account may have been affected, it is best to revoke and reissue all credentials on potentially affected projects. 
> For more details, review the instructions available at https://cloud.google.com/security/compromised-credentials ---Delete all unauthorized VMs or resources. ---Take immediate steps to ensure that your Service Account credentials are not embedded in public source code systems, stored in download directories, or unintentionally shared in other ways. The security of your Google Cloud Platform account(s) is important to us. You can find more information on securely using IAM at https://cloud.google.com/iam/docs/using-iam-securely and also recommend best practices for keeping service accounts keys safe at https://cloudplatform.googleblog.com/2017/07/help-keep-your-Google-Cloud-service-account-keys-safe.html. Please let us know if you have additional questions by responding to this message.
> Please review your case and take any actions as requested. If you have any questions or require immediate assistance, please reply to this email to contact Google Cloud Support.
> You can also view and comment on your case by logging into our support portal
> Thanks for choosing Google Cloud Platform.
> —The Google Team

**Note:** I was a little appalled at the format for the email, it was missing some punctuation and the whole email was one big blob of text. I added a bunch of carriage returns to the content above so it would be more easily readable.

Now I know I probably shouldn't publish the key file in this site's public repository, but when I setup the key, I only gave it read access to my site's Analytics property so I didn't think that was a security risk.

Anyway, I acknowledge it was a bit of a security risk, so I set about finding some way to eliminate the risk.

## Research

Now, I want the site's code to be publicly available. I'm not an Eleventy expert, but there's a lot of cool code in there and I wanted to be able to both write about it and let people access the source. Pulling the site's repo down (changing its visibility) wasn't an option.

Next, I started playing around with using environment variables on my local system and my hosting project on [Netlify](https://www.netlify.com/){target="_blank"} and feed the key or key values into the code at build time. Unfortunately, the key object was too large to store in an environment variable. Playing around further, I tried to just store the key itself in an environment variable, but it was too long as well.

I thought about putting the key in a cloud key vault, but after poking at a couple of them, I abandoned that approach because none of them allowed me to store an existing key in a vault. I even played around with storing the file in a cloud blob storage account and pulling it down during the build process. I tried it on Azure, but struggled to find a simple way to keep the key file secure but still access it using a public URL. I used to be a Product Manager for an Azure service, so I thought I knew it pretty well, but after hours of searching for a solution I simply gave up. The docs are just not useful.

## Resolution

I finally gave up last week and pulled all of the offending code out of the public repo and migrated all of it to a Cloud Functions project. 

I tried first to do it in Firebase Functions (FF); I like FF because it lets me create a single project that contains multiple functions. None, and I do mean none, of the other cloud providers allow you to do that. FF also allows me to manage, build, and deploy multiple functions with a single CLI command. I'll show you in a later post how I got around those limitations, stay tuned.

The FF approach didn't work because there's no way (that I could find anyway) to connect a new Firebase project to an existing Google Cloud property. My Google Analytics for this site's been running for years on my Google Cloud account and I didn't want to start over.

I ended up creating a new Google Cloud Functions project and migrated all of my code there. I will not make that project public since I don't want any further nastygrams from the Google Cloud folks. 

## Next Steps

I wanted to write my functions in TypeScript (FF supports this out of the box, I couldn't find any information for how to do this in the Google Cloud Functions documentation), so I found a source online and got it working. The source I found wasn't very clear on a couple of points, so in my next post here, I'll cover that topic.

I also want to manage all of my site's functions in a single repository, so I figured that out as well. I'll share what I did, including building a single script that allows me to publish all of my functions at once, after I publish the TypeScript post described in the previous paragraph.
