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
			} ]
		});

		this.callParent(arguments);
	}

});