## OSGi Web Console

The OSGI Web Console is a tool for inspecting and managing OSGi framework instances using a Web Browser.
It is very similar to the [Apache Felix Web Console][0] but is not exactly the same!

The Web UI is built with [Sencha Ext JS 4.1.x][1] RIA framework and is supposed to be easily
extendible by developing various plug-ins.

Why do we need yet another OSGi Web Console? Although beginning with Release 1.2.8 the [Apache Felix Web Console][0] is using [JQuery][2]
to enhance the user experience and keep Web browser support on the broadest possible basis, for me it is still not quite enough.
I believe that [Sencha Ext JS 4.1.x][1] is the right choice for the time being. Even if I am wrong, in the worst case this application
will be a nice example of using [Sencha Ext JS 4.1.x][1].

![OSGi Web Console Screenshot](https://github.com/danielpacak/osgi-enterprise-webconsole/raw/master/README/osgi-web-console.png)

## Requirements

The OSGi Web Console only has the following dependencies:

 + Running implementation of the OSGi Http Service Specification
 + TBD


[0]: http://felix.apache.org/site/apache-felix-web-console.html
[1]: http://www.sencha.com/products/extjs/
[2]: http://jquery.com/