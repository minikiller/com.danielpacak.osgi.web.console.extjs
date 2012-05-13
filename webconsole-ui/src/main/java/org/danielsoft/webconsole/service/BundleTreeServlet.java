package org.danielsoft.webconsole.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;

@SuppressWarnings("serial")
public class BundleTreeServlet extends HttpServlet {
	
	private BundleContext bundleContext;
	
	public BundleTreeServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		Bundle[] bundles = bundleContext.getBundles();
		List<JsonTreeNode> treeNodes = getJsonTreeNodes(bundles);
		ObjectMapper om = new ObjectMapper();
		om.writeValue(resp.getWriter(), treeNodes);
	}

	List<JsonTreeNode> getJsonTreeNodes(Bundle[] bundles) {
		List<JsonTreeNode> treeNodes = new ArrayList<JsonTreeNode>(bundles.length);
		for (Bundle b : bundles) {
			treeNodes.add(new JsonTreeNode(b));
		}
		return treeNodes;
	}

	class JsonTreeNode {
		Bundle bundle;
		public JsonTreeNode(Bundle bundle) {
			this.bundle = bundle;
		}
		public long getId() {
			return bundle.getBundleId();
		}
		public String getText() {
			return "" + bundle.getBundleId() + " - " + bundle.getSymbolicName() + " - " + bundle.getVersion();
		}
		public boolean isLeaf() {
			return true;
		}
	}

}
