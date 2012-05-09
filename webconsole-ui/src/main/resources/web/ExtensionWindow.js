Ext.define('WebConsole.ExtensionWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.extensionwindow',

	initComponent : function() {
		Ext.define('Extension', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'name',
				type : 'string'
			}, {
				name : 'desc',
				type : 'string'
			}, {
				name : 'componentClass',
				type : 'string'
			} ]
		});
		var store = Ext.create('Ext.data.Store', {
			model : 'Extension',
			proxy : {
				type : 'ajax',
				url : 'service/extensions',
				reader : {
					type : 'json'
				}
			},
			autoLoad : true
		});

		this.extensionGrid = Ext.create('Ext.grid.Panel', {
			sortableColumns : false,
			store : store,
			columns : [ {
				header : 'Name',
				dataIndex : 'name'
			}, {
				header : 'Component',
				dataIndex : 'componentClass'
			}, {
				header : 'Description',
				dataIndex : 'desc',
				flex : 1
			}, {
				xtype : 'actioncolumn',
				width : 50,
				items : [ {
					icon : 'delete.gif', // Use a URL in the icon config
					tooltip : 'Sell stock',
					handler : this.onRunExtensionClick
				} ]
			}

			]
		});

		Ext.apply(this, {
			width : 400,
			height : 270,
			modal : true,
			title : 'Extension',
			layout : 'fit',
			items : this.extensionGrid,
			buttons : [ {
				xtype : 'button',
				text : 'Close',
				scope : this,
				handler : this.destroy
			} ]
		});

		this.callParent(arguments);
	},

	onRunExtensionClick : function(grid, rowIndex, colIndex) {
		var store = grid.getStore();
		var rec = store.getAt(rowIndex);
		var componentClass = rec.get('componentClass');
		// alert("Run [" + componentClass + "] extension..");
		var extensionWin = Ext.create(componentClass);
		extensionWin.show();
	}

});
