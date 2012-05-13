package org.danielsoft.webconsole.service;

import java.io.IOException;
import java.util.Date;
import java.util.Dictionary;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;

@SuppressWarnings("serial")
public class BundleReadServlet extends HttpServlet {

	private BundleContext bundleContext;
	
	public BundleReadServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		Long bundleId = Long.valueOf(req.getParameter("bundleId"));

		Bundle bundle = bundleContext.getBundle(bundleId);
		
		JsonBundle jsonBundle = new JsonBundle(bundle);
		ObjectMapper om = new ObjectMapper();
		om.writeValue(resp.getWriter(), jsonBundle);
	}

	class JsonBundle {
		Bundle bundle;
		JsonBundle(Bundle bundle) {
			this.bundle = bundle;
		}

		public Long getBundleId() {
			return bundle.getBundleId();
		}

		public String getLocation() {
			return bundle.getLocation();
		}

		public String getVersion() {
			return bundle.getVersion().toString();
		}

		public String getDescription() {
			Dictionary manifestHeaders = bundle.getHeaders();
			return (String) manifestHeaders.get("Bundle-Description"); // TODO CONSTANT
		}

		public Date getLastModified() {
			return new Date(bundle.getLastModified());
		}

		public String getState() {
			int state = bundle.getState();
			switch (state) {
			case Bundle.ACTIVE:
				return "ACTIVE";
			default:
				return "UNKNOWN";
			}
		}

		public String getSymbolicName() {
			return bundle.getSymbolicName();
		}
		
		public String getManifestHeaders() {
			Dictionary dict = bundle.getHeaders();
			//List<String> headers = new ArrayList<String>();
			StringBuilder sb = new StringBuilder();
			Enumeration<String> keys = dict.keys();
			while (keys.hasMoreElements()) {
				String key = (String) keys.nextElement();
				String value = String.valueOf(dict.get(key));
				sb.append(String.format("%s: %s\n", key, value));
			}
			return sb.toString();
		}
		
		public String getServices() {
			StringBuilder sb = new StringBuilder();
			ServiceReference[] references = bundle.getServicesInUse();
			if (references != null) {
				for (ServiceReference ref : references) {
					sb.append(ref.toString() + "\n");
				}
			}
			return sb.toString();
		}

	}

}
