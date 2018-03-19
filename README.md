# EasyMorph-Action
A Qlik Sense extension that runs [EasyMorph Server](http://easymorph.com/server.html) tasks right from Qlik Sense applications. More details on EasyMorph integration with Qlik Sense here: [EasyMorph for Qlik Sense](http://easymorph.com/for/qlik.html)

![EasyMorph-Action extension example](./readme_01.gif)

## Features

* Up to 3 extensions per app sheet
* Task parameters can be assigned using Qlik Sense expressions
* Options for app reload, partial reload
* Real-time task status updates
* Link to auto-generated documentation
* Link to task errors page (in case of failure)
* Custom label (can be localized)

## Installation

Download this repository as a zip archive: https://github.com/easymorph/EasyMorph-Action/archive/master.zip

Qlik Sense Desktop: unzip to a directory under "C:\Users\\%Username%\Documents\Qlik\Sense\Extensions\".

Qlik Sense server: Install through QMC. See instructions [how to import an extension on Qlik Sense server](http://help.qlik.com/en-US/sense/Subsystems/ManagementConsole/Content/import-extensions.htm).

## Configuration

![EasyMorph-Action connection options](./readme_02.png)

#### Connection section

* **Host and port _[Required]_**: The address and port or your EasyMorph Server.
* **Space**: The name of the space of the target task. Required for a non-default space.
* **Password**: A password for a password-protected space.
* **Task ID _[Required]_**: The ID of the target task. It can be obtained from an URL of the task page on EasyMorph Server (example URL, task Id is marked with bold text: http://<i></i>your-em-server.com:6330/space/default/tasks/edit/**a41004e0-2d5b-4c90-9acc-88a8bd9d756d**).
* **Label**: A text label to use instead of the project name of the target task. Shown when the task is idle.

#### Task parameters section

Project parameters to run the target task with. The task will fail in case of incorrectly specified parameter names.

#### App reload section

* **Reload app when task finishes** - When checked, the extension will reload and save current Qlik Sense application after the target task runs to completion. Reloading a published task on a Qlik Sense server may result in "Access denied" error if the current user doesn't have "Update" permission for the current stream (default setting in Qlik Sense). In such case the app will be reloaded but not saved.
* **Partial reload** - Available only when the previous option is checked.

## License

MIT
