MyProgress for Firefox OS 2.2
=============================

Created by Molnár Barnabás 2015
Email: molnarbarney@gmail.com

1. Install the latest Mozilla Firefox browser
2. Under Developer section, open WebIDE
3. Download the Firefox OS 2.2 simulator
4. Open this project: go to the directory, where you can see "manifest.webapp" file
5. Run the simulator and install the app to it

Running demo in Firefox OS (only for developers)
================================================

1. Open the progressController.js file in the "MyProgress/js/..." directory
2. Edit the 9. line:
3. Change this: "// loadDemoData();" to this: "loadDemoData();"
4. Install the app into the Firefox OS 2.2 Simulator
5. Change this: "loadDemoData();" to this: "// loadDemoData();"
6. Reinstall (but NOT delete the previously installed app) the app into the Firefox OS 2.2 Simulator. It will kill the loadDemoData() function, so You can add workouts too.
7. In the app, go to "Workouts" or "Progress" menus and see the magic :)

Using the app (for users)
=========================

IMPORTANT:
The workouts must be added ascendent by date!
- for example: 10/09/2015, 10/15/2015, 10/23/2015
- not like this: 10/09/2015, 10/05/2015, 10/23/2015