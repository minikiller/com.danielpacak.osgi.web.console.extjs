Ext.define('WebConsole.LogViewerPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.logviewerpanel',

	initComponent : function() {
		Ext.define('WebConsole.data.LogEntry', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'time',
				type : 'long'
			}, {
				name : 'message',
				type : 'string'
			}, {
				name : 'level',
				type : 'string'
			}, {
				name : 'exception',
				type : 'object'
			} ]
		});
		this.logStore = Ext.create('Ext.data.Store', {
			model : 'WebConsole.data.LogEntry',
			proxy : {
				type : 'ajax',
				url : 'service/log',
				reader : {
					type : 'json'
				}
			},
			sorters : [ {
				property : 'time',
				direction : 'DESC'
			} ],
			autoLoad : true
		});

		this.logGrid = Ext.create('Ext.grid.Panel', {
			dockedItems : this._createToolbar(),
			padding : '5',
			region : 'center',
			sortableColumns : false,
			store : this.logStore,
			columns : [ {
				header : 'Time',
				dataIndex : 'time'
			}, {
				header : 'Level',
				dataIndex : 'level'
			}, {
				header : 'Message',
				dataIndex : 'message',
				flex : 1
			} ],
			plugins: [ {
				ptype: 'rowexpander',
				rowBodyTpl : [
					'<tpl if="exception != null">',
						'<table style="margin-left: 30px; margin-top: 10px; margin-bottom: 4px;">',
						'<tr><td colspan="2">{exception.message}</td></tr>',
						'<tpl for="exception.stackTrace">',
							'<tr><td>&nbsp;&nbsp;</td><td>at&nbsp;{className}.{methodName}({fileName}:{lineNumber})</td></tr>',
						'</tpl>',
						'</table>',
					'</tpl>'
				]
			} ]
		});

		Ext.apply(this, {
			layout : 'border',
			items : this.logGrid
		});

		this.callParent(arguments);
	},

	_createToolbar : function() {
		this.toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Reload',
				iconCls : 'reloadIcon',
				handler : this.onReloadClick,
				scope : this
			} ]
		});

		return this.toolbar;
	},

	onReloadClick : function() {
		this.logStore.load();
	}

});