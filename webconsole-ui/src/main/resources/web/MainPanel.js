// Responsible for displaying all tabs
Ext.define('WebConsole.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',

	initComponent : function() {
		Ext.apply(this, {
			items : [ {
				title : 'Bundles',
				iconCls : 'tabs',
				xtype : 'bundlespanel'
			}, {
				title : 'Services',
				iconCls : 'tabs',
				xtype : 'servicespanel'
			}, {
				title : 'System Information',
				iconCls : 'tabs',
				xtype : 'systeminfopanel'
			}, {
				title : 'Extensions',
				iconCls : 'tabs',
				xtype : 'extensionspanel'
			} ]
		});

		this.callParent(arguments);
	}

});