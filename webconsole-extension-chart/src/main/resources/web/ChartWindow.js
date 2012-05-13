Ext.define('WebConsole.Extension.ChartWindow',{
	extend : 'Ext.window.Window',

	initComponent : function() {
		Ext.apply(this, {
			width : 400,
			height : 300,
			modal : true,
			title : 'Chart Extension',
			layout : 'fit',
			html : '<br/><center><strong>put extjs chart here!</strong></center>',
			buttons : [ {
				xtype : 'button',
				text : 'Close',
				scope : this,
				handler : this.destroy
			} ]
		});

		this.callParent(arguments);
	}

});
