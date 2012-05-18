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
				name : 'symbolicName',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			}, {
				name : 'description',
				type : 'string'
			}, {
				name : 'version',
				type : 'string'
			}, {
				name : 'category',
				type : 'string'
			}, {
				name : 'location',
				type : 'string'
			}, {
				name : 'lastModified'
			}, {
				name : 'state',
				type : 'string'
			}, {
				name : 'manifestHeaders',
				type : 'object'
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
					icon : 'css/images/bundle_stop.png',
					tooltip : 'Stop',
					handler : this.onStopClick
				}, {
					icon : 'css/images/bundle_refresh.png',
					tooltip : 'Refresh package imports',
					handler : this.onRefreshPackageImportsClick
				}, {
					icon : 'css/images/bundle_update.png',
					tooltip : 'Update',
					handler : this.onUpdateClick
				}, {
					icon : 'css/images/bundle_delete.png',
					tooltip : 'Uninstall',
					handler : this.onUninstallClick
				}]
			} ],
			plugins : [{
	            ptype : 'rowexpander',
	            rowBodyTpl : [
	                '<table style="margin-left: 30px; margin-top: 10px; margin-bottom: 4px;">',
	                	'<tr><td class="x-grid-cell-property">Symbolic Name&nbsp;</td><td>{symbolicName}</td></tr>',
	                	'<tr><td class="x-grid-cell-property">Version&nbsp;</td><td>{version}</td></tr>',
	                	'<tr><td class="x-grid-cell-property">Bundle Location&nbsp;</td><td>{location}</td></tr>',
	                	'<tr><td class="x-grid-cell-property">Last Modified&nbsp;</td><td>{lastModified}</td></tr>',
	                	'<tr><td class="x-grid-cell-property">Description&nbsp;</td><td>{description}</td></tr>',
	                	'<tr><td class="x-grid-cell-property">Exported Packages&nbsp;</td><td>TODO</td></tr>',
	                	'<tr><td class="x-grid-cell-property">Imported Packages&nbsp;</td><td>TODO</td></tr>',
	                	'<tr><td class="x-grid-cell-property">Importing Bundles&nbsp;</td><td>TODO</td></tr>',
		                '<tr>',
		                	'<td class="x-grid-cell-property">Manifest Headers&nbsp;</td>',
		                	'<td>',
		                		'<table>',
		                		'<tpl for="manifestHeaders">',
		                			'<tr><td class="x-grid-cell-property">{key}</td><td>{value}</td></tr>',
		                		'</tpl>',
		                		'</table>',
		                	'</td>',
		                '</tr>',
	                '</table>'
	            ]
	        }]
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