package org.danielsoft.webconsole.service;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;

// uses reflection api to display all public method of this service
@SuppressWarnings("serial")
public class ServiceReadServlet extends HttpServlet {

	private BundleContext bundleContext;

	public ServiceReadServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		Long serviceId = Long.valueOf(req.getParameter("serviceId"));
		ServiceReference serviceReference = findServiceById(serviceId);
		if (serviceReference != null) {
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");
			List<JsonMethod> declaredMethods = getDeclaredMethods(serviceReference);
			ObjectMapper om = new ObjectMapper();
			om.writeValue(resp.getWriter(), declaredMethods);
		} else {
			resp.sendError(HttpServletResponse.SC_NOT_FOUND);
		}
	}

	ServiceReference findServiceById(Long serviceId) {
		try {
			ServiceReference[] serviceReferences = bundleContext.getServiceReferences(null, null);
			if (serviceReferences != null) {
				for (ServiceReference ref : serviceReferences) {
					Long serviceIdProperty = (Long) ref.getProperty(Constants.SERVICE_ID);
					if (serviceId.equals(serviceIdProperty)) {
						return ref;
					}
				}
			}
		} catch (InvalidSyntaxException e) {
			// IGNORE THIS DUMB OSIG EXCEPTION
		}
		return null;
	}

	List<JsonMethod> getDeclaredMethods(ServiceReference serviceReference) {
		try {
			Object service = bundleContext.getService(serviceReference);
			Class<?> serviceClass = service.getClass();
			Method[] declaredMethods = serviceClass.getDeclaredMethods();
			if (declaredMethods != null) {
				List<JsonMethod> methods = new ArrayList<JsonMethod>(declaredMethods.length);
				for (Method m : declaredMethods) {
					methods.add(new JsonMethod(m));
				}
				return methods;
			} else {
				return Collections.emptyList();
			}
		} finally {
			bundleContext.ungetService(serviceReference);
		}
	}
	
	class JsonMethod {
		Method method;
		JsonMethod(Method method) {
			this.method = method;
		}
		public String getName() {
			return method.getName();
		}
		public List<String> getParameters() {
			Class<?>[] parameterTypes = method.getParameterTypes();
			List<String> params = new ArrayList<String>();
			for (Class<?> type : parameterTypes) {
				params.add(type.getName());
			}
			return params;
		}
	}

}
