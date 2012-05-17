Ext.define('WebConsole.GroovyConsolePanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.groovyconsolepanel',

	initComponent : function() {
		Ext.apply(this, {
			layout : 'border',
			dockedItems : this._createToolbar
			// items : this.extensionsGrid
		});

		this.callParent(arguments);
	},

	_createToolbar : function() {
		var toolbar = Ext.create('widget.toolbar', {
			items : [ {
				text : 'Run',
				tooltip : 'Run Groovy script',
				icon : 'css/images/service_test.png',
				handler : this.onRunGroovyClick,
				scope : this
			} ]
		});

		return toolbar;
	},

	onRunGroovyClick : function() {
		alert("running groovy script!")
	}

});