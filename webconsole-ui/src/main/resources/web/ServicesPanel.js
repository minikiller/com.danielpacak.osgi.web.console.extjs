Ext.define('WebConsole.ServicesPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.servicespanel',

	initComponent : function() {
		Ext.define('WebConsole.data.Service', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'id',
				type : 'long'
			}, {
				name : 'types',
				type : 'string'
			}, {
				name : 'bundle',
				type : 'object'
			}, {
				name : 'properties',
				type : 'object'
			}, {
				name : 'usingBundles',
				type : 'object'
			} ]
		});
		this.serviceStore = Ext.create('Ext.data.Store', {
			model : 'WebConsole.data.Service',
			proxy : {
				type : 'ajax',
				url : 'service/services',
				reader : {
					type : 'json',
					root : 'services'
				}
			},
			sorters : [ {
				property : 'id',
				direction : 'ASC'
			} ],
			autoLoad : true
		});

		this.servicesGrid = Ext.create('Ext.grid.Panel', {
			padding : '5',
			region : 'center',
			store : this.serviceStore,
			columns : [ {
				header : 'Id',
				dataIndex : 'id'
			}, {
				header : 'Type(s)',
				dataIndex : 'types',
				flex : 1
			}, {
				header : 'Bundle',
				width : 300,
				renderer : this._bundleRenderer,
				dataIndex : 'bundle'
			}, {
				xtype : 'actioncolumn',
				icon : 'css/images/service_test.png',
				width : 50,
				align : 'center',
				handler : this.onTestServiceClick
			} ]
		});

		this.servicesGrid.getView().on('render', function(view) {
			view.tip = Ext.create('Ext.tip.ToolTip', {
				target : view.el,
				delegate : view.itemSelector,
				trackMouse : true,
				autoHide : false,
				renderTo : Ext.getBody(),
				listeners : {
					beforeshow : function updateTipBody(tip) {
						var jsonProperties = view.getRecord(tip.triggerElement).get('properties');
						var jsonUsingBundles = view.getRecord(tip.triggerElement).get('usingBundles');
						var text = '<b>Properties:</b> ' + Ext.encode(jsonProperties) + '<br/>'
							+ '<b>Using Bundle(s):</b> ' + Ext.encode(jsonUsingBundles);
						tip.update(text);
					}
				}
			});
		});

		Ext.apply(this, {
			layout : 'border',
			items : this.servicesGrid,
			dockedItems : this.createToolbar()
		});

		this.callParent(arguments);
	},

	_bundleRenderer : function(jsonBundle, metaData) {
		return jsonBundle.symbolicName + ' (' + jsonBundle.id + ')';
	},

	createToolbar : function() {
		this.toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Reload',
				handler : this.onReloadClick,
				scope : this
			} ]
		});

		return this.toolbar;
	},

	onReloadClick : function() {
		Ext.Ajax.request({
			url : 'service/services',
			success : this.onReloadSuccess,
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	},

	onReloadSuccess : function(response) {
		var jsonData = Ext.decode(response.responseText);
		this.serviceStore.load();
	},

	onTestServiceClick : function(grid, rowIndex, colIndex) {
		var store = grid.getStore();
		var rec = store.getAt(rowIndex);
		var serviceId = rec.get('id');

		Ext.Ajax.request({
			url : 'service/services/read',
			params : {
				serviceId : serviceId
			},
			success : function ccc(response) { alert(response.responseText); },
			failure : WebConsole.onAjaxFailure,
			scope : this
		});
	},
	
	onReadServiceSuccess : function(response) {
		alert(response.responseText);
	}

});