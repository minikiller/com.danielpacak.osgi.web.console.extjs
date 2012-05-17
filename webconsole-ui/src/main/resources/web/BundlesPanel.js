Ext.define('WebConsole.BundlesPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bundlespanel',

	initComponent : function() {
		Ext.define('WebConsole.data.Bundle', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'id',
				type : 'long'
			}, {
				name : 'name',
				type : 'string'
			}, {
				name : 'version',
				type : 'string'
			}, {
				name : 'category',
				type : 'string'
			}, {
				name : 'state',
				type : 'string'
			} ]
		});
		this.bundlesStore = Ext.create('Ext.data.Store', {
			model : 'WebConsole.data.Bundle',
			proxy : {
				type : 'ajax',
				url : 'service/bundles',
				reader : {
					type : 'json',
					root : 'bundles'
				}
			},
			sorters : [ {
				property : 'id',
				direction : 'ASC'
			} ],
			autoLoad : true
		});

		this.bundlesGrid = Ext.create('Ext.grid.Panel', {
			dockedItems : this._createToolbar(),
			padding : '5',
			region : 'center',
			store : this.bundlesStore,
			columns : [ {
				header : 'Id',
				dataIndex : 'id'
			}, {
				header : 'Name',
				dataIndex : 'name',
				flex : 1
			}, {
				header : 'Version',
				dataIndex : 'version'
			}, {
				header : 'Category',
				dataIndex : 'category',
				width : 200
			}, {
				header : 'State',
				dataIndex : 'state'
			}, {
				xtype : 'actioncolumn',
				width : 100,
				align : 'center',
				items : [{
					icon : 'css/images/service_test.png',
					tooltip : 'Stop',
					handler : this.onStopClick,
				}, {
					icon : 'css/images/service_test.png',
					tooltip : 'Refresh package imports',
					handler : this.onRefreshPackageImportsClick
				}, {
					icon : 'css/images/service_test.png',
					tooltip : 'Update',
					handler : this.onUpdateClick
				}, {
					icon : 'css/images/service_test.png',
					tooltip : 'Uninstall',
					handler : this.onUninstallClick
				}]
			} ]
		});


		Ext.apply(this, {
			layout : 'border',
			items : [
				this.bundlesGrid
			]
		});

		this.callParent(arguments);
	},
	
	_createToolbar : function() {
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
		this.bundlesStore.load();
	},
	
	onStopClick : function() {
		alert('stopping bundle!');
	},
	
	onUninstallClick : function() {
		alert('uninstall...');
	},
	
	onUpdateClick : function() {
		alert('Updating...');
	},
	
	onRefreshPackageImportsClick : function() {
		alert('on refresh pkg imports..');
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
	
	onBundleInstallClick : function() {
		var win = Ext.create('widget.bundleinstallwindow', {
			listeners : {
				scope : this,
				bundleinstalled : this.onBundleInstalled
			}
		});

		win.show();
	},

	onBundleInstalled : function(win) {
		this.bundlesStore.load();
	}

});