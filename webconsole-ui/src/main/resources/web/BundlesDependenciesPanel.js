Ext.define('WebConsole.BundlesDependenciesPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bundlesdependenciespanel',

	initComponent : function() {

		Ext.apply(this, {
			layout : 'border'
		});

		this.callParent(arguments);
	},

	onReloadClick : function() {
		Ext.Ajax.request({
			url : 'service/system',
			success : this.onReloadSuccess,
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	},

});