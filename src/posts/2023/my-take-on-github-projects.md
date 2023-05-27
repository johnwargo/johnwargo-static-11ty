---
tags: post
title: My Take On GitHub Projects
description: 
date: 2023-05-27
headerImage: 
categories:
  - Developer Tools
---

I worked at GitHub when they/we released GitHub projects and the capability was a nice addition to the source code repository. Most of the Azure DevOps Engineering team had just moved over to GitHub and GitHub Projects was, I think, supposed to be a first step toward adding Azure DevOps like capabilities to GitHub.

With GitHub Projects, you could:

* Add multiple task tracking lists and boards to a repository
* Do all of your work related to the repository in the repository

I recently did a big site migration from Joomla to Eleventy and I wanted a place to track all of the action items I made for myself as I worked through the migration. Remembering that GitHub Projects would likely give me what I needed, I opened a browser window, navigated to the repository, then clicked on the Projects tab. 

{% image "src/images/2023/github-projects-01.png", "GitHub Repository", "image-full" %}

What I saw there confused me. Instead of the **Create Project** button I expected, instead I saw an option to Link a Project. **Link a project**? What does that mean?  

{% image "src/images/2023/github-projects-02.png", "GitHub Projects Page", "image-full" %}

It took me a few seconds to realize the button was also a drop-down, so I clicked the arrow and found the **New Project** button I expected. When I clicked the button, Projects gives me the opportunity to select the type of project I want as shown below.

{% image "src/images/2023/github-projects-03.png", "GitHub Projects New Project", "image-full" %}

I created a Board since I wanted a Kanban board for my tasks and got to work.

What I didn’t understand was that projects are no longer actually associated with the repository. GitHub now associates projects with the GitHub Organization or Account, not the repository as shown below. You can still access the project from the repository, but scoping the project to the account breaks everything I expect from Projects.

{% image "src/images/2023/github-projects-04.png", "GitHub Repository Global Projects List", "image-full" %}

I understand that GitHub is trying to replicate capabilities from Azure DevOps, for small time single developers this doesn’t make sense. It also makes it much more complicated to use Projects for what I want to use them for. 

Let me explain.

When you create a new task in the board, it shows on the board like this:

{% image "src/images/2023/github-projects-05.png", "GitHub Project Board New Task", "image-full" %}

Apparently the task is on the board, but for some bizarre reason the task is in Draft mode. Draft has no context here, I created it and added it to the board column I wanted, there is no draft context here.

I had to start searching around on the Internet to find the answer to this one. In Projects, Draft status means that it’s not connected to an issue in a repository in the account or organization. Not only can I not make a task and have it stick, I have to manually create an issue from the task before the task will move out of draft mode. This makes absolutely no sense to me, but wait, it gets worse.

To convert the task to an issue, you must hover over the task and click the little three-button thingie that appears. Once you do that you see an option to convert the task to an issue.

{% image "src/images/2023/github-projects-06.png", "GitHub Projects Convert to Issue", "image-full" %}

Once you select that option, you’re prompted to select the repository you want to link the task to. 

{% image "src/images/2023/github-projects-06.png", "GitHub Projects Repository List", "image-full" %}

OK, that makes sense when you look at this from an organizational standpoint and GitHub thankfully puts the current repository (the repository I created the project in) as the first option in the list. What doesn’t make sense is that I have to do this at all.

What GitHub should do is automatically create the associated issue in the current repository, then give users the option to move it somewhere else.

One I figured this out, I manually created issues for all these tasks even though the project should have done this for me automatically. Next, I worked through my workflow, moving tasks from ideas to todo, in-progress, all the way to done. 
What happened to my issues through all of this? Nothing. Not a damn thing.

Putting tasks in as drafts makes no sense. Letting me assign them to issues makes some sense, but, again, I want this to be automatic. Updating the issues as I work on them is MVP in my mind. 

So I now have all of these issues in my repository and a board to manage them, but the board does nothing to manage them. 

Now, I know (or at least I assume) I can setup automation to enable the workflow process I’m using but honestly I expected this to happen automatically. You gave me the board template, so you know how people expect it to work. Why force another manual task on me?

I don’t get it. 

Knowing that I’m a single developer working in this repository, GitHub should deliver the board experience that fits with a single user. When I’m in an organization, all this other stuff could make sense, especially when the board pulls issues from multiple repositories. 

What this means for me is that I dropped using GitHub Project for task management and instead activated my [Trello](https://trello.com/){target="_blank"} account.
