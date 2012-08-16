package co.edu.uniandes.restaurant.rest;

import javax.ws.rs.HeaderParam;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

@Path("{path:.*}")
public class CORSFilter {
	
	   @OPTIONS
	   @Path("/")	   
	   public Response OptionsHandler(
			   @HeaderParam("Access-Control-Request-Method") final String requestMethod, 
			   @HeaderParam("Access-Control-Request-Headers") final String requestHeaders)
	   {
	       final ResponseBuilder retValue = Response.ok();
	       if (requestHeaders != null)
	           retValue.header("Access-Control-Allow-Headers", requestHeaders);
	       if (requestMethod != null)
	           retValue.header("Access-Control-Allow-Methods", requestMethod);
	       return retValue.build();
	   }
}

