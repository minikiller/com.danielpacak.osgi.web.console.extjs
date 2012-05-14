package org.danielsoft.webconsole.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;

@SuppressWarnings("serial")
public class BundlesServlet extends HttpServlet {
	
	private BundleContext bundleContext;

	public BundlesServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		
		Bundle[] bundles = bundleContext.getBundles();
		JsonBundles jsonBundles = new JsonBundles(bundles);
		ObjectMapper om = new ObjectMapper();
		om.writeValue(resp.getWriter(), jsonBundles);
	}
	
	class JsonBundles {
		Bundle[] bundles;
		JsonBundles(Bundle[] bundles) {
			this.bundles = bundles;
		}
		public List<JsonBundle> getBundles() {
			List<JsonBundle> jsonBundles = new ArrayList<JsonBundle>();
			if (bundles != null) {
				for (Bundle bundle : bundles) {
					jsonBundles.add(new JsonBundle(bundle));
				}
			}
			return jsonBundles;
		}
	}
	
	class JsonBundle {
		Bundle bundle;
		JsonBundle(Bundle bundle) {
			this.bundle = bundle;
		}
		public long getId() {
			return bundle.getBundleId();
		}

		public String getName() {
			Dictionary manifestHeaders = bundle.getHeaders();
			return String.format("%s (%s)",
					manifestHeaders.get(Constants.BUNDLE_NAME),
					bundle.getSymbolicName());
		}

		public String getVersion() {
			return bundle.getVersion().toString();
		}
		public String getCategory() {
			Dictionary manifestHeaders = bundle.getHeaders();
			return (String) manifestHeaders.get(Constants.BUNDLE_CATEGORY);
		}

		public String getState() {
			switch (bundle.getState()) {
			case Bundle.UNINSTALLED:
				return "Uninstalled";
			case Bundle.INSTALLED:
				return "Installed";
			case Bundle.RESOLVED:
				return "Resolved";
			case Bundle.STARTING:
				return "Starting";
			case Bundle.STOPPING:
				return "Stopping";
			case Bundle.ACTIVE:
				return "Active";
			default:
				return null;
			}
		}
	}
	

}
