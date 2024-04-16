---
title: Google Cloud Exposed Service Key
description: 
date: 2024-03-22
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Cloud Development
---

At the beginning of the year, I published a post  called [Leaked Credentials from Google Cloud Project](/posts/2024/google-cloud-support-notice/){target="_blank"} that described an issue I had, well it was an issue I created, with my Google Cloud account. I wanted to show some Google Analytics stats on this site and the only way I, at the time, could figure out how to do it was to run some code at build time that collected the data I needed from Google's APIs and added it to the site. To do this, the code required an API key for my Google Analytics data. I created a read-only key and included that key in my site repository on GitHub. Google freaked out and sent me a series of emails yelling at me for what I did.

Now, part of the issue was that Google setup its Analytics data SDK to require a big ass API key. I tried saving it as an environment variable, but I couldn't get it to work. My only option, based on how I chose to implement it, was to store the API key in the repository. I reasoned that since it was a read-only key, what harm could a bad actor do?  Right?

Anyway, after being yelled at by the Google Cloud team for several months, I finally gave in and migrated the code to a set of Google Cloud Functions and made all of that code private. Problem solved and I learned a few things I was able to write about here: [Google Cloud Multiple Functions in a Project](/posts/2024/google-cloud-multiple-functions/){target="_blank"} and [Coding Google Functions Using TypeScript](/posts/2024/google-cloud-functions-typescript/){target="_blank"}.

Cool stuff.

Fast forward to today and I received yet another email from the Google Cloud team:

> Dear John,
>
>We’re writing to let you know that Google Cloud is introducing an organizational policy change on June 16, 2024. This change allows organization administrators to define how Google Cloud should respond if we become aware that a private Service Account Key has been publicly exposed. We are integrated with several programs, including the GitHub scanning program, to identify publicly exposed private Service Account Keys.
>
>What do you need to know?
>
>Service account keys must be kept private, and exposing them publicly can compromise your Google Cloud environment. A compromised Service Account Key could be used by bad actors to access, modify, or delete your data and/or consume expensive resources. We understand this could be disruptive to your organization and we are taking proactive measures to protect your environment.
>
>To enhance the security of your environment, this organizational policy change will take effect on June 16, 2024. This change will proactively disable any publicly exposed Service Account Keys that we become aware of. This will affect all uses of the exposed Service Account Key.
>
>What do you need to do?
>
>You have the ability to modify this behavior ahead of time by taking one of the following actions:
> - Opt-in early by setting the IAM.serviceAccountKeyExposureResponse constraint to DISABLE_KEY which will enable the protection immediately.
> - Opt-out anytime by setting the IAM.serviceAccountKeyExposureResponse constraint to WAIT_FOR_ABUSE which will disable the protection.
> - Do nothing, in which case Google will enable the protection on your behalf on June 16, 2024.
>
>Again, we understand that these changes might require some planning, but they are designed to enhance security for your environment, which remains a top priority at Google.
>
>Thank you for choosing Google Cloud.

Apparently they decided it was way to dangerous to let me deal with the issue on my own, instead, whenever they find an API key in the wild, they'll just disable the key automatically. That makes perfect sense (I'm being serious here, just in case you think otherwise), protecting me from myself. If they'd taken that approach last year when they discovered my little issue, they would have shut down that feature of this site and forced me to take corrective action sooner. 
