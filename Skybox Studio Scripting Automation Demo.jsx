/*
After Effects JSX Scripting Example for Mettle Skybox Studio Converter v1.x
2016-11-23 11.21 AM

by Andrew Hazelden
Email: andrew@andrewhazelden.com
Web: http://www.andrewhazelden.com

To use this example you need to have the Mettle Skybox Studio plugin installed in Adobe Effects.
You also need to have a copy of the Adobe ExtendScript Toolkit.

Script Usage:
Step 1. Copy the example images to the root folder on your hard disk.

Step 2. Copy the JSX script "Skybox Studio Scripting Automation Demo.jsx" to the After Effects Scripts folder (eg: /Applications/Adobe After Effects CC 2017/Scripts)

Step 3. Start After Effects. From the File > Scripts menu select the item "Skybox Studio Scripting Automation Demo". This will run the script.

Step 4. To edit the script and adjust the settings, open this "Skybox Studio Scripting Automation Demo.jsx" file in the Adobe ExtendScript Toolkit program.

Step 4. Edit the "var imgPath" line to choose which of the two example images you want to use.

Step 5. Click the play button in the Adobe ExtendScript Toolkit program to run the script.

*/

#target aftereffects

// Your image filename
var imgPath = "media/playblastvr_roller_coaster_track-cubemap.0001.png";
//var imgPath = "media/playblastvr_roller_coaster_track-latlong.0001.png";

// The final AE layer name
var layerName = "Panorama";

// Create a comp
app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
app.newProject();

// Set the project to 32-bits per channel
app.project.bitsPerChannel = 32;
writeLn("Bit Depth: " + app.project.bitsPerChannel + " bits per channel");
  
var sequenceName = "Roller Coaster";
var sequenceWidth = 3840;
var sequenceHeight = 1920;
var sequencePixelAspect = 1;
var sequenceDuration = 1;
var SequenceFrameRate = 30.0;
var comp = app.project.items.addComp(sequenceName, sequenceWidth, sequenceHeight, sequencePixelAspect, sequenceDuration, SequenceFrameRate);
writeLn("New Comp: " + comp.name);

// Load the imagery
var io = new ImportOptions(File(imgPath));

// Choose if the media should be handled as an image sequence or not
io.sequence = false;
//io.sequence = true;

// Import the media into the current AE project
var img = app.project.importFile(io);
var imgLayer = comp.layers.add(img);

// Rename the AE image layer
imgLayer.name = layerName;

// Add the SkyBox Studio Converter Effect
var fxA = imgLayer.Effects.addProperty("Mettle SkyBox Converter");

// Toggle the filter ON/OFF in the effects control window
fxA.enabled = true;
//fxA.enabled = false;

// --------------------------------------------------------------
// Change the Mettle SkyBox Converter settings:
// --------------------------------------------------------------

// Input image projection
imgLayer.property("Effects").property("Mettle SkyBox Converter").property("Input").setValue(2); 
// 1 = 2D Source
// 2 = Cube-Map
// 3 = Sphere-map
// 4 = Equirectangular

// Output image projection
imgLayer.property("Effects").property("Mettle SkyBox Converter").property("Output").setValue(3);
// 1 = cubemap
// 2 = spheremap
// 3 = equriect
// 4 = fulldome

// Change the image dimension of the output:
//imgLayer.property("Effects").property("Mettle SkyBox Converter").property("Output Frame Width").setValue(1024);

// Change the Fulldome output Field of View
//imgLayer.property("Effects").property("Mettle SkyBox Converter").property("FOV").setValue(180);
imgLayer.property("Effects").property("Mettle SkyBox Converter").property("FOV").setValue(220);

// Rotate the panorama:
//imgLayer.property("Effects").property("Mettle SkyBox Converter").property("Tilt (X axis)").setValue(22.5);
imgLayer.property("Effects").property("Mettle SkyBox Converter").property("Pan (Y axis)").setValue(180.0);
//imgLayer.property("Effects").property("Mettle SkyBox Converter").property("Roll (Z axis)").setValue(45.0);

// Toggle the invert rotation control:
//imgLayer.property("Effects").property("Mettle SkyBox Converter").property("Invert Rotation").setValue(true);
//imgLayer.property("Effects").property("Mettle SkyBox Converter").property("Invert Rotation").setValue(false);
