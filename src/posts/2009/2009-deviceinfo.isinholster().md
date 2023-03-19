---
title: DeviceInfo.isInHolster()
date: 2009-05-18
tags: BlackBerry
---

I'm working on a BlackBerry Java application that uses the DeviceInfo class to determine information about the device the application is running on. The original version of the program I wrote used DeviceInfo.isInHolster() to determine whether the device is in the holster or not, but the documentation says that method has been deprecated. The problem is that it doesn't say what to use in its place (actually, I finally noticed the 'Deprecated' link at the top of the JavaDocs that listed the objects, methods and fields that had been deprecated but that's not the point of this story).  
  
It turns out that the method has been implemented (of sorts) in net.rim.device.api.system.Sensor. Unfortunately, instead of returning a simple Boolean True or False, it has been implemented through a call to:  
{codecitation class="brush: java; gutter: false"}  
getState(Sensor.HOLSTER)  
{/codecitation}Which returns an integer value.I struggled with this because I'm just not a day to day Java developer. What I missed in the docs was that it returns an integer and the possible states are Sensor.STATE\_IN\_HOLSTER and Sensor.STATE\_OUT\_OF\_HOLSTER. Here's what it said:  
{codecitation class="brush: text; gutter: false"}  
getState  
  
public static int getState(int sensorId)  
  
Return the last known state of a sensor.  
  
Parameters:  
sensorId - The ID of sensor  
Returns:  
the last known state of the given sensor  
Throws:  
IllegalArgumentException - If sensorId does not represent a supported sensor  
Since:  
JDE 4.6.0

{/codecitation}

Anyway, I finally figured it out this morning with some help from Sanyu from RIM. Here's an application that uses a SensorListener to determine sensor state:  
{codecitation class="brush: java; gutter: true;"}  
package com.jwargo.SensorTest;  
  
import net.rim.device.api.ui.UiApplication;  
import net.rim.device.api.ui.component.Dialog;  
import net.rim.device.api.ui.component.LabelField;  
import net.rim.device.api.ui.container.MainScreen;  
import net.rim.device.api.system.Application;  
import net.rim.device.api.system.SensorListener;  
import net.rim.device.api.system.Sensor;  
  
public class SensorTest extends UiApplication implements SensorListener {  
  
public static void main(String\[\] args) {  
SensorTest st = new SensorTest();  
st.enterEventDispatcher();  
}  
  
public SensorTest() {  
pushScreen(new SensorTestScreen());  
Sensor.addListener(Application.getApplication(), this, Sensor.HOLSTER);  
}  
  
public void onSensorUpdate(int sensorId, int update) {  
if (update == Sensor.STATE\_IN\_HOLSTER) {  
Dialog.alert("Device is holstered");                
} else {  
Dialog.alert("Device is not holstered");  
}  
}  
  
}  
  
final class SensorTestScreen extends MainScreen {  
  
public SensorTestScreen() {  
super();  
// Create the screen's title  
LabelField lblTitle = new LabelField("Sensor Test", LabelField.ELLIPSIS  
| LabelField.USE\_ALL\_WIDTH);  
setTitle(lblTitle);  
}  
  
}

{/codecitation}