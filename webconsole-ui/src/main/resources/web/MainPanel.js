// Responsible for displaying all tabs
Ext.define('WebConsole.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',

	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				title : 'Bundles',
				iconCls : 'tabIcon',
				xtype : 'bundlespanel'
			}, {
				title : 'Services',
				iconCls : 'tabIcon',
				xtype : 'servicespanel'
			}, {
				title : 'Bundles Dependencies',
				iconCls : 'tabIcon',
				xtype : 'bundlesdependenciespanel'
			}, {
				title : 'System Information',
				iconCls : 'tabIcon',
				xtype : 'systeminfopanel'
			}, {
				title : 'Groovy Console',
				iconCls : 'tabIcon',
				xtype : 'groovyconsolepanel'
			}, {
				title : 'Log Viewer',
				iconCls : 'tabIcon',
				xtype : 'logviewerpanel'
			}, {
				title : 'Extensions',
				iconCls : 'tabIcon',
				xtype : 'extensionspanel'
			} ]
		});

		this.callParent(arguments);
	}

});