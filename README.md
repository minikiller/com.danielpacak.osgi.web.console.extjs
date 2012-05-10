# OSGi Web Console

The OSGI Web Console is a tool for inspecting and managing OSGi framework instances using a Web Browser.
It is very similar to the [Apache Felix Web Console][0] but is not exactly the same!

The Web UI is built with [Sencha Ext JS 4.1.x][1] and is supposed to be easily
extendable by developing various plug-ins.

![OSGi Web Console Screenshot](https://github.com/danielpacak/osgi-enterprise-webconsole/raw/master/README/osgi-web-console.png)

Quick Start
=========== 
1. Clone git repository: git clone https://danielpacak@github.com/danielpacak/osgi-enterprise-webconsole.git
2. Change directory: cd osgi-enterprise-webconsole
3. Build the project: mvn install
4. Run the Web Console on Apache Felix OSGi framework: webconsole-runner/run-on-apache-felix.bat
5. Go to http://localhost:8080/webconsole/index.html

[0]: http://felix.apache.org/
[1]: http://www.sencha.com/products/extjs/