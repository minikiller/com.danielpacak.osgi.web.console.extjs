package org.danielsoft.webconsole.service;

import groovy.lang.Binding;
import groovy.lang.GroovyShell;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.framework.BundleContext;

@SuppressWarnings("serial")
public class GroovyServlet extends HttpServlet {

	private BundleContext bundleContext;

	public GroovyServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		
		Object result = mmm(req.getParameter("script"));
		
		ObjectMapper om = new ObjectMapper();
		om.writeValue(resp.getWriter(), result);
	}
	
	Object mmm(String script) {
		Binding binding = new Binding();
		binding.setVariable("bundleContext", this.bundleContext);
		
		GroovyShell shell = new GroovyShell(binding);
		return shell.evaluate(script);
	}

}
