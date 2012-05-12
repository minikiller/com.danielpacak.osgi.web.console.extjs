Ext.define('WebConsole.ServicesPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.servicespanel',

	initComponent : function() {
		Ext.define('WebConsole.data.Service', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'id',
				type : 'string'
			}, {
				name : 'types',
				type : 'string'
			} ]
		});
		var store = Ext.create('Ext.data.Store', {
			model : 'WebConsole.data.Service',
			proxy : {
				type : 'ajax',
				url : 'service/services',
				reader : {
					type : 'json',
					root : 'services'
				}
			},
			autoLoad : true
		});

		this.servicesGrid = Ext.create('Ext.grid.Panel', {
			padding : '5',
			region : 'center',
			sortableColumns : false,
			store : store,
			columns : [ {
				header : 'Id',
				dataIndex : 'id'
			}, {
				header : 'Type(s)',
				dataIndex : 'types',
				flex : 1
			}, {
				header : 'Bundle'
			} ]
		});

		Ext.apply(this, {
			layout : 'border',
			items : this.servicesGrid,
			dockedItems : this.createToolbar()
		});

		this.callParent(arguments);
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
		alert(response.responseText);
		//this.systemInfoForm.getForm().setValues(jsonData);
	}

});