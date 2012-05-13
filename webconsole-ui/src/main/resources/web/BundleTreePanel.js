Ext.define('WebConsole.BundleTreePanel', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.bundletreepanel',

	initComponent : function() {
		this.treeStore = Ext.create('Ext.data.TreeStore', {
			proxy : {
				type : 'ajax',
				url : 'service/bundles/tree'
			}
		});
		Ext.apply(this, {
			store : this.treeStore,
			rootVisible : false,
			dockedItems : this.createToolbar()
		});

		this.callParent(arguments);
	},

	createToolbar : function() {
		var toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Reload',
				icon : 'css/images/reload.png',
				handler : this.onReloadClick,
				scope : this
			}, '-', {
				text : 'Install',
				handler : this.onBundleInstallClick,
				scope : this
			} ]
		});

		return toolbar;
	},

	onReloadClick: function() {
		this.treeStore.load();
	},

	onBundleInstallClick: function() {
		var win = Ext.create('widget.bundleinstallwindow', {
			listeners : {
				scope : this,
				bundleinstalled : this.onBundleInstalled
			}
		});

		win.show();
	},

	onBundleInstalled: function(win) {
		this.treeStore.load();
	},

	// TODO REMOVE THIS FUNCTION
	update : function() {
		this.treeStore.load();
	},

	onDestroy : function() {
		this.callParent(arguments);
	}

});
