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
			],
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
			}, {
				text : 'Install',
				handler : this.onBundleInstallClick,
				scope : this
			}, {
				text : 'Extensions',
				handler : this.onExtensionsClick,
				scope : this
			}/*, '->', {
				text : 'About',
				handler : this.onAboutClick,
				scope : this
			}*/ ]
		});

		return this.toolbar;
	},

	createBundleTreePanel : function() {
		var bundleTree = Ext.create('widget.bundletreepanel', {
			region : 'west',
			split : true,
			padding : '5 0 5 5',
			width : 350,
			listeners : {
				itemclick : this.onBundleClick,
				itemdblclick : this.onBundleDblClick,
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

	onBundleDblClick : function(view, record, item, index, e, eOpts) {
		var rawId = record.get('id');
    /*if (rawId) {
      var id = parseInt(rawId.substring(2));
      if (rawId.charAt(0) == 'n') {
        this.onNetworkNodeClicked(id);
      } else if (rawId.charAt(0) == 'e') {
        this.onNetworkEdgeClicked(id);
      }
    }*/
  },

  onBundleClick: function(view, record, item, index, e, eOpts) {
    var bundleId = record.get('id');
    if (bundleId != null) {
      this.readBundle(bundleId);
    }
  },

  readBundle: function(bundleId) {
    Ext.Ajax.request({
        url: 'service/bundles/read',
        params: {
          bundleId: bundleId
        },
        success: this.onReadBundleSuccess,
        failure: WebConsole.onAjaxFailure,
        scope: this
      });
  },

  onReadBundleSuccess: function(response) {
    var jsonData = Ext.decode(response.responseText);
    this.bundleInfoPanel.setBundle(jsonData);
  },

  onReloadClick: function() {
    this.bundleTree.update();
  },

  onBundleInstallClick: function() {
    var win = Ext.create('widget.bundleinstallwindow', {
      listeners: {
        scope: this,
        bundleinstalled: this.onBundleInstalled
      }
    });

    win.show();
  },

	onBundleInstalled: function(win) {
		this.bundleTree.update();
	},

	onAboutClick: function() {
		var win = Ext.create('widget.aboutwindow');
		win.show();
	},

	onExtensionsClick : function() {
		var win = Ext.create('widget.extensionwindow');
		win.show();
	},

});