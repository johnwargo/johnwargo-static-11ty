---
title: Arduino ESP32 Running Tasks On Multiple Cores
description: This article demonstrates how to assign different tasks to separate processor cores using the Arduino platform and multiple core microcontrollers. I always wanted to learn how to do this, but the examples on the web are so full of ads that I wanted to publish a version with no advertisements as a super clean example.
date: 2023-08-25
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Internet of Things (IoT)
  - ESP32
---

I've been coding and building on the Arduino platform (both hardware and software) for a long time. Looking back on this site, I see that I created my [First Arduino Project](http://posts/2014/first-arduino-project/) back in 2014, almost 10 years ago.

Over the years, microcontrollers got more capable with faster processors, more memory, and, happily, multiple processor cores. I always wanted to learn how to split tasks across multiple processor cores in an Arduino project, but every time I tried following one of the tutorials I failed. Another issue, for me anyway, is that many of the tutorials were so full of advertisements, that it was too distracting to use them.  What I wanted was to be able to look at a small, simple but complete, example of how to do what I wanted to do.

After failing several times, I finally found some time to dedicate to making this work and quickly succeeded. You can find the complete code for this project in [Arduino ESP32 Multiple Cores](https://github.com/johnwargo/arduino-esp32-multiple-cores){target="_blank"}.

For this project, I used a [Seeed Studio Xiao ESP32](https://www.seeedstudio.com/xiao-series-page){target="_blank"} device. I picked the ESP32 because it's multi-core (a requirement for this project), very small, and very inexpensive. 

Wasting no more time, lets get into the code...

The ESP32 libraries for Arduino include a task handle type: [TaskHandle_t](https://github.com/greiman/FreeRTOS-Arduino/blob/master/libraries/FreeRTOS_ARM/org_files/task.h){target="_blank"}. Using a task handle, your Arduino project points to a block of code (a function) you want executed on a specific core then assigns that code to the specified core. Note: I've not studied the code, that's just my simple layman's view of how this works.

So, to assign code to separate processor cores, you create one or more task handles like this:

```c
TaskHandle_t Task0;
TaskHandle_t Task1;
```
 
Next, the sketch uses the `xTaskCreatePinnedToCore` method to assign the appropriate code to the selected processor. Since the sketch only needs to do this once, add the calls to `xTaskCreatePinnedToCore` to the `setup` function in the sketch as shown below.

```c
void setup() {
  Serial.begin(115200);
  Serial.println();

  //create a task that executes the Task0code() function, with priority 1 and executed on core 0
  xTaskCreatePinnedToCore(Task0code, "Task0", 10000, NULL, 1, &Task0, 0);
  //create a task that executes the Task0code() function, with priority 1 and executed on core 1
  xTaskCreatePinnedToCore(Task1code, "Task1", 10000, NULL, 1, &Task1, 1);
}
```

The `xTaskCreatePinnedToCore` method is an ESP32-specific method (apparently not part of the FreeRTOS the ESP32 runs) provided by Espressif (the makers of the ESP32 device). You can read more about it in the [Espressif documentation](https://docs.espressif.com/projects/esp-idf/en/v4.3/esp32/api-reference/system/freertos.html){target="_blank"}. 

The following table describes the parameters passed in the call to `xTaskCreatePinnedToCore`.

| Parameter | Description |
| --------- | ----------- |
| `pvTaskCode` | The name of the function that contains the code you want running on the assigned processor core. |
| `pcName` | The friendly name for the task |
| `usStackDepth` | The amount of bytes allocated for the task stack. I don't know how to allocate this, so I just use `10000` which I've seen in several examples. |
| `pvParameters` | A pointer pointing to any parameters you want passed to the task code. |
| `uxPriority` | The task priority; I always use 1 across all tasks, but if you have long-running tasks with different priorities, you can tune how much attention they get by playing around with priority. |
| `pvCreatedTask` | A pointer to the task the sketch can use to reference the task later (for example to terminate it). |
| `xCoreID` | The processor core to assign the task to. |

So, taking a look at this line of code from the example:

```c
xTaskCreatePinnedToCore(Task0code, "Task0", 10000, NULL, 1, &Task0, 0);
```

What's happening is I'm taking a function in my sketch called `Task0Code`, giving it the human-readable name of `Task0` with a stack of 10k bytes and a priority of 1 then assigning it to run on processor core 0.

If you've worked with Arduino for a while, you're used to putting your code that runs as long as the device is powered-on into a function called `loop`:

```c
void loop(){

}
```

In this case, my sketch has two blocks of code, and I'm assigning each block of code to a separate processor core, so I really don't need to do anything in my `loop` function. To prove that the code in the `loop` function executes as well as the code I assigned to the different processor cores, I added a little delay and wrote some text to the Serial monitor:

```c
void loop() {
  // nothing to do here, everything happens in the Task0Code and Task1Code functions
  Serial.println("Loop");
  delay((int)random(1000, 3000));
}
```

OK, now everything's setup. All that's left to do is show you the code that runs on the processors. Here's an example for the code assigned to processor core 0:

```c
void Task0code(void* pvParameters) {
  Serial.print("Task0 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;) {
    Serial.println("Core 0 processing");
    delay((int)random(100, 1000));
  }
}
```

Notice the `pcParameters` in the function declaration, this is the variable that receives the pointer to the parameter object passed during core assignment. If you had a long-running task you wanted to fire up for different actions in your sketch, you could fire up a task, pass in the parameters needed to tell the task's code what to do, then destroy the task when its done. In my example, I didn't need to do that, so I pass no parameters to the task. 

At the top of the function is some code that writes some text to the Serial Monitor letting me know what processor the task is running on. This code executes once, when the sketch assigns the task to the processor, so you'll only see the `Task0 running on core 0` message once in the Serial Monitor.

The next piece of code is critical to getting this to work correctly for this scenario:

```c
for (;;) {
  Serial.println("Core 0 processing");
  delay((int)random(100, 1000));
}
```

It defines an infinite loop (remember, replacing the `loop` method in the main sketch) that does whatever this task is supposed to do on the assigned processor. In this case, I simply write some text to the Serial Monitor then wait a random amount of time before doing it again. 

**Note:** In most examples you see online for this topic, they have you turn a LED on and off in this loop, but I wanted you to be able to build a functional multi-core Arduino app without having to wire up any hardware.

The `Task1Code` code is almost exactly the same, only the text sent to the Serial Monitor changes, so I'm not going to explain that code. I will show you the output though:

```text
Task0 running on core 0
Loop
Task1 running on core 1
Core 1 processing
Core 0 processing
Core 1 processing
Core 1 processing
Core 0 processing
Loop
Core 0 processing
Core 0 processing
Core 1 processing
Core 0 processing
Core 0 processing
Core 1 processing
Loop
Core 1 processing
Core 0 processing
Core 0 processing
Core 1 processing
Core 1 processing
```

As you can see, my `loop`, `Task0Code`, and `Task1Code` all run in random order just as expected. Notice that the first `loop` executes before the `Task1` assignment completes. That is, I think, because the core assignment takes a little time.  If it matters that both core assignments happen before the `loop` code executes, simply add a short delay after each assignment as shown below:

```c
void setup() {
  Serial.begin(115200);
  Serial.println();

  //create a task that executes the Task0code() function, with priority 1 and executed on core 0
  xTaskCreatePinnedToCore(Task0code, "Task0", 10000, NULL, 1, &Task0, 0);
  delay(500);
  //create a task that executes the Task0code() function, with priority 1 and executed on core 1
  xTaskCreatePinnedToCore(Task1code, "Task1", 10000, NULL, 1, &Task1, 1);
  delay(500);
}
```

## What Can Go Wrong?

Well, during several of my failed attempts, I kept panicking the processor with an unhandled exception:

```shell
ESP-ROM:esp32s3-20210327
Build:Mar 27 2021
rst:0xc (RTC_SW_CPU_RST),boot:0x8 (SPI_FAST_FLASH_BOOT)
Saved PC:0x40376fa8
SPIWP:0xee
mode:DIO, clock div:1
load:0x3fce3808,len:0x44c
load:0x403c9700,len:0xbe4
load:0x403cc700,len:0x2a68
entry 0x403c98d4
Task1 running on core 0
Task2 running on core 1
Guru Meditation Error: Core  0 panic'ed (IllegalInstruction). Exception was unhandled.
Memory dump at 0x420022e0: fff2e507 0000f01d f7522100
Core  0 register dump:
PC      : 0x420022e4  PS      : 0x00060630  A0      : 0x00000000  A1      : 0x3fcf7490  
A2      : 0x000000ff  A3      : 0x00000000  A4      : 0x00000000  A5      : 0x00000000  
A6      : 0x00000000  A7      : 0x00000000  A8      : 0x82002320  A9      : 0x3fcf7460  
A10     : 0x3fc954a7  A11     : 0x00000019  A12     : 0x0000000a  A13     : 0x00000000  
A14     : 0x3fcec788  A15     : 0x80000001  SAR     : 0x00000020  EXCCAUSE: 0x00000000  
EXCVADDR: 0x00000000  LBEG    : 0x40056f08  LEND    : 0x40056f12  LCOUNT  : 0x00000000  


Backtrace: 0x420022e1:0x3fcf7490




ELF file SHA256: d34fd9b1c3edaeca

Rebooting...
```

This is what made me quit only to try again later. I could not tell what the offending code was that generated the exception since I followed the tutorials to the letter. Did I? I think not.

When I played around with this, I didn't setup the two LEDs most writers include in their tutorials - each core controlling one LED. Instead I put in simple `Serial.println()` commands so I could see what was happening. I did something like this:

```c
void Task1code(void* pvParameters) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

  // do something interesting
  Serial.println("hey, this is core 0");

}
```

But, if you remember what said earlier about the infinite loop, that code executes just like I want it to, then exits the function. There's no infinite loop to keep me in the function and the processor panics because it knows its supposed to be executing code and it no longer has any to execute. As soon as I put the code in an infinite loop, the panic went away.

```c
void Task1code(void* pvParameters) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;) {
    // do something interesting
    Serial.println("hey, this is core 0");
  }
}
```

But, that caused another problem. That code generated the following error:

```shell
Task0 running on core 0
Task1 running on core 1
E (23337) task_wdt: Task watchdog got triggered. The following tasks did not reset the watchdog in time:
E (23337) task_wdt:  - IDLE (CPU 0)
E (23337) task_wdt: Tasks currently running:
E (23337) task_wdt: CPU 0: Task0
E (23337) task_wdt: CPU 1: loopTask
E (23337) task_wdt: Aborting.

abort() was called at PC 0x4200b730 on core 0

Backtrace: 0x403774d2:0x3fc95910 0x4037cd09:0x3fc95930 0x40382a5d:0x3fc95950 0x4200b730:0x3fc959d0 0x403789c9:0x3fc959f0 0x400559dd:0x3fca8070 |<-CORRUPTED

ELF file SHA256: cbe304622d553d8e

Rebooting...
```

Ugh, foiled again. Digging into this problem, I quickly found the solution. The OS running on the ESP32 device runs a several watchdogs, one of which is a task watchdog, the Task Watchdog Timer (TWDT) as described in the [documentation](https://docs.espressif.com/projects/esp-idf/en/v4.4.2/esp32/api-reference/system/wdts.html){target="_blank"}. If the TWDT doesn't get some processor cycles periodically, it triggers and reboots the device. 

If the code you run on the core (in the infinite loop) has little breaks here and there, you're probably OK and won't see this error. For my example, the loop is really, really tight and there's not time for the TWDT to get some love. The solution for this is really simple, just add a small delay in the loop and it solves the problem:

```c
void Task1code(void* pvParameters) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;) {
    // do something interesting
    Serial.println("hey, this is core 0");
    // Add a small delay to let the watchdog process
    //https://stackoverflow.com/questions/66278271/task-watchdog-got-triggered-the-tasks-did-not-reset-the-watchdog-in-time
    delay(25);
  }
}
```

## Complete Project Code

Here's the complete project code (below); you can also find it [here](https://github.com/johnwargo/arduino-esp32-multiple-cores){target="_blank"}.

```c
/*********************************************************
* Arduino Multiple Cores
*
* Demonstrates how to run tasks on separate processor
* cores with Arduino
*
* By John M. Wargo
* https://johnwargo.com
**********************************************************/

TaskHandle_t Task0;
TaskHandle_t Task1;

void setup() {
  Serial.begin(115200);
  Serial.println();

  //create a task that executes the Task0code() function, with priority 1 and executed on core 0
  xTaskCreatePinnedToCore(Task0code, "Task0", 10000, NULL, 1, &Task0, 0);
  //create a task that executes the Task0code() function, with priority 1 and executed on core 1
  xTaskCreatePinnedToCore(Task1code, "Task1", 10000, NULL, 1, &Task1, 1);
}

void loop() {
  // nothing to do here, everything happens in the Task1Code and Task2Code functions
  Serial.println("Loop");
  delay((int)random(1000, 3000));
}


void Task0code(void* pvParameters) {
  Serial.print("Task0 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;) {
    Serial.println("Core 0 processing");
    delay((int)random(100, 1000));
  }
}

void Task1code(void* pvParameters) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;) {
    Serial.println("Core 1 processing");
    delay((int)random(100, 1000));
  }
}
```

## Conclusion

In this post, I demonstrated a simple and clean Arduino project that runs different code on the ESP32 processor cores. I did all this work to prepare you for my next post where I run a web server on one of the cores. Why? Because I wanted a web server running on a postage stamp sized microcontroller. Look for that post in a few days, possibly tomorrow.
