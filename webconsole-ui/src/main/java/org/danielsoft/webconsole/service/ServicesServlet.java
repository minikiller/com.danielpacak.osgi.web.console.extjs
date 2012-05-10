package org.danielsoft.webconsole.service;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;

@SuppressWarnings("serial")
public class ServicesServlet extends HttpServlet {

	private BundleContext bundleContext;

	public ServicesServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException ,IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		
		try {
			ServiceReference[] serviceReferences = bundleContext.getServiceReferences(null, null);
			JsonServices jsonServices = new JsonServices(serviceReferences);
			ObjectMapper om = new ObjectMapper();
			om.writeValue(resp.getWriter(), jsonServices);
		} catch (InvalidSyntaxException e) {
			e.printStackTrace();
			resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	};
	
	class JsonServices implements Serializable {
		private List<JsonService> services;
		JsonServices(ServiceReference[] serviceReferences) {
			if (serviceReferences != null) {
				services = new ArrayList<JsonService>(serviceReferences.length);
				for (ServiceReference ref : serviceReferences) {
					services.add(new JsonService(ref));
				}
			}
		}
		public List<JsonService> getServices() {
			return services;
		}
	}

	class JsonService implements Serializable {
		ServiceReference serviceReference;
		
		public JsonService(ServiceReference serviceReference) {
			this.serviceReference = serviceReference;
		}

		public String getId() {
			return String.valueOf(serviceReference.getProperty(Constants.SERVICE_ID));
		}

		public String getTypes() {
			return getPropertyAsString(serviceReference.getProperty(Constants.OBJECTCLASS));
		}

		public String getPid() {
			return String.valueOf(serviceReference.getProperty(Constants.SERVICE_PID));
		}

		public List<JsonBundle> getUsingBundles() {
			Bundle[] bundles = serviceReference.getUsingBundles();
			if (bundles != null) {
				List<JsonBundle> jsonBundles = new ArrayList<JsonBundle>();
				for (Bundle bundle : bundles) {
					jsonBundles.add(new JsonBundle(bundle));
				}
				return jsonBundles;
			} else {
				return Collections.emptyList();
			}
		}

	}

	class JsonBundle implements Serializable {
		Bundle bundle;
		public JsonBundle(Bundle bundle) {
			this.bundle = bundle;
		}

		public long getId() {
			return bundle.getBundleId();
		}

		public String getSymbolicName() {
			return bundle.getSymbolicName();
		}
	}

	String getPropertyAsString(Object value) {
		if (value == null) {
			return "N/A";
		} else if (value.getClass().isArray()) {
			return Arrays.deepToString( (Object[]) value);
		} else {
			return String.valueOf(value);
		}
	}
	

}
