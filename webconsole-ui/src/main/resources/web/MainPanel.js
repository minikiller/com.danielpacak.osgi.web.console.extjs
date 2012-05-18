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
				title : 'System Information',
				iconCls : 'tabIcon',
				xtype : 'systeminfopanel'
			}, {
				title : 'Groovy Console',
				iconCls : 'tabIcon',
				xtype : 'groovyconsolepanel'
			}, {
				title : 'Extensions',
				iconCls : 'tabIcon',
				xtype : 'extensionspanel'
			} ]
		});

		this.callParent(arguments);
	}

});