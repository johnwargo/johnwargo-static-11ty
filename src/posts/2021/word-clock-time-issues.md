---
title: Word Clock Time Issues
description: The clock's been running in our guest bathroom for more than a year now and I recently noticed that the clock wasn't keeping time very well. It was about 20 minutes fast. The original project is based on the Adafruit Trinket device which doesn't have a Wi-Fi connection, so it can't get it's time through Network Time Protocol (NTP). Instead, sets the clock to the compile date/time for the currently running sketch.
date: 2021-07-14
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

I'm a big fan of Andy Doro's Word Clock ([https://andydoro.com/wordclockdesktop/](https://andydoro.com/wordclockdesktop/){target="_blank"}) project. As soon as I saw the project highlighted in Make Magazine, I immediately ordered the parts and assembled the desktop version of the project. The clock's been running in our guest bathroom for more than a year now and I recently noticed that the clock wasn't keeping time very well. It was about 20 minutes fast.

Well, I grabbed the source code and looked for an easy way to fix this. The original project is based on the Adafruit Trinket device which doesn't have a Wi-Fi connection, so it can't get it's time through Network Time Protocol (NTP). Instead, the project has the following code which tries to initialize the realtime clock (RTC) and, if it can't (because there's no time stored in it), it sets the clock to the compile date/time for the currently running sketch.

```c
RTC.begin(); // begin clock  
if (! RTC.isrunning()) {  
 Serial.println("RTC is NOT running!");  
 // following line sets the RTC to the date & time this   
 // sketch was compiled  
 RTC.adjust(DateTime(\_\_DATE\_\_, \_\_TIME\_\_));  
 // DST? If we're in it, let's subtract an hour from the RTC   
 // time to keep our DST calculation correct. This gives us  
 // Standard Time which our DST check will add an hour back to   
 // if we're in DST.  
 DateTime standardTime = RTC.now();  
 // check whether we're in DST right now. If we are, subtract an hour.  
 if (dst\_rtc.checkDST(standardTime) == true) {   
 standardTime = standardTime.unixtime() - 3600;  
 }  
 RTC.adjust(standardTime);  
}
```

This is a great solution for initially setting the clock, since the first time you run the sketch it automatically sets the clock with the current time. Unfortunately, this code doesn't work for my situation.

So, I came up with two potential solutions for this problem. I implemented the first one and it worked great for me. The second one sounded great on paper, but it wouldn’t work, I’ll describe it later. So, the only solution I have is to change the sketch’s code so it lets me reset the clock at will. 

The first thing I did was add a new define to the sketch:

```c
/* 
 *  Over time, the RTC may lose accuracy. Since the Trinket
 *  doesn't have a Wi-Fi connection, it can't reset its own clock
 *  periodically. When this happens, uncomment the following line 
 *  and deploy to the trinket. It will reset the RTC to the compile
 *  date and time, giving the clock a more accurate time. Once that's
 *  done, comment out the line again, build, and deploy the sketch to 
 *  the trinket to reset the sketch to its original behavior. 
 *  
 *  But, thinking of it, the sketch no longer needs the original
 *  code in this scenario since we've forced a time on the device,
 *  that code will never run again.
*/
//#define RESETCLOCK
```

It's commented out right now because I only want it uncommented (applied) when I want to reset the clock. 
Next, I took the code that sets the RTC to the compiled sketch date/time, and moved it into a separate function:

```c
void setTime() {
  Serial.println("Resetting RTC");
  // following line sets the RTC to the date & time this sketch was compiled
  RTC.adjust(DateTime(__DATE__, __TIME__));
  // DST? If we're in it, let's subtract an hour from the RTC time to keep our DST calculation correct. This gives us
  // Standard Time which our DST check will add an hour back to if we're in DST.
  DateTime standardTime = RTC.now();
  if (dst_rtc.checkDST(standardTime) == true) { // check whether we're in DST right now. If we are, subtract an hour.
    standardTime = standardTime.unixtime() - 3600;
  }
  RTC.adjust(standardTime);
}
```

Finally, I removed this code from the setup() function:

```c
if (! RTC.isrunning()) {
  Serial.println("RTC is NOT running!");
  // following line sets the RTC to the date & time this 
  // sketch was compiled
  RTC.adjust(DateTime(__DATE__, __TIME__));
  // DST? If we're in it, let's subtract an hour from the 
  // RTC time to keep our DST calculation correct. This gives us
  // Standard Time which our DST check will add an hour back to 
  // if we're in DST.
  DateTime standardTime = RTC.now();
  // check whether we're in DST right now. If we are, 
  // subtract an hour.
  if (dst_rtc.checkDST(standardTime) == true) { 
    standardTime = standardTime.unixtime() - 3600;
  }
  RTC.adjust(standardTime);
}
```

And replaced it with this code:

```c
#ifdef RESETCLOCK
  setTime();
#else
  if ( !RTC.isrunning()) {
    Serial.println("RTC is NOT running!");
    setTime();
  }
#endif
```

With that in place, I uncommented the define line:

```c
#define RESETCLOCK
```

Then I compiled and deployed the code to the device. When that finished, my clock’s time was reset to the current time (win!). Next, I commented out the define line:

```c
//#define RESETCLOCK
```
Then compiled and deployed the code a second time (with the define commented out) and the code’s back to its default behavior.

Now this isn’t a perfect solution, but its the best one I could come up with. I submitted this change as a PR to the original repo, but I’m not sure if Andy is accepting contributions.

I thought perhaps I could pull the battery and let the RTC memory clear, but as soon as I put the battery back in and power it up, the clock will set to the compile date/time for the sketch. The only way to make this work is to wipe the Trinket device, pull the battery, then compile and deploy the latest version of the sketch to the device. Since the clock is already assembled, and I’d have to take apart the case to do this, I decided to abandon that approach. That just seems like too much work to me. 

I could deploy a new version of the sketch to the device, then pull the battery and put it back in again. That would work and the time would only be off by however long it took to pull the battery, put it back in, and power-on the device. Still more work than I want to do considering I’d have to disassemble the enclosure to get at the battery.

I have the hardware to build a 12-inch version of the Word Clock; once I get that one built, I’ll publish the details somewhere.
