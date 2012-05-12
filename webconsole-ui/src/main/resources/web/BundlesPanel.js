Ext.define('WebConsole.BundlesPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bundlespanel',

	initComponent : function() {
		this.bundleInfoPanel = this.createBundleInfoPanel();
		this.bundleTree = this.createBundleTreePanel();

		Ext.apply(this, {
			layout : 'border',
			items : [
				this.bundleTree,
				this.bundleInfoPanel
			]
		});

		this.callParent(arguments);
	},

	createBundleTreePanel : function() {
		var bundleTree = Ext.create('widget.bundletreepanel', {
			region : 'west',
			split : true,
			padding : '5 0 5 5',
			width : 350,
			listeners : {
				itemclick : this.onBundleClick,
				scope : this
			}
		});

		return bundleTree;
	},

	createBundleInfoPanel : function() {
		var bundleInfoPanel = Ext.create('widget.bundleinfopanel', {
			region : 'center',
			padding : '5 5 5 0'
		});
		return bundleInfoPanel;
	},

	onBundleClick : function(view, record, item, index, e, eOpts) {
		var bundleId = record.get('id');
		if (bundleId != null) {
			this.readBundle(bundleId);
		}
	},

	readBundle : function(bundleId) {
		Ext.Ajax.request({
			url : 'service/bundles/read',
			params : {
				bundleId : bundleId
			},
			success : this.onReadBundleSuccess,
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	},

	onReadBundleSuccess : function(response) {
		var jsonData = Ext.decode(response.responseText);
		this.bundleInfoPanel.setBundle(jsonData);
	},

});