package co.edu.uniandes.restaurant.rest;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import co.edu.uniandes.restaurant.controller.RestaurantController;
import co.edu.uniandes.restaurant.model.Reserve;
import co.edu.uniandes.restaurant.model.Store;

@Path("/api")
@RequestScoped
public class RestaurantRESTService {
	
   @Inject
   private RestaurantController controller;
   

   @GET
   @Path("/stores")
   @Produces(MediaType.APPLICATION_JSON)
   public List<Store> listStores() {
      return controller.listStores();
   }
   
   @GET
   @Path("/reserves")
   @Produces(MediaType.APPLICATION_JSON)
   public List<Reserve> listReserves() {
      return controller.listReserves();
   }
   
   @GET
   @Path("/stores/near/{latitude}/{longitude}")
   @Produces(MediaType.APPLICATION_JSON)
   public List<Store> listNearStores(
		   @PathParam("latitude") double latitude,
		   @PathParam("longitude") double longitude) {
      return controller.listNearStores(latitude, longitude);
   }
   
   @POST
   @Path("/reserves")
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Response addReserve(Reserve reserve){
	   try{
		   System.out.println("reserve: " + reserve.toString());
		   controller.addReserve(0, 0, null);
		   return Response.ok().build();
	   }
	   catch (Exception e) {		   
		   return Response.serverError().build();
	   }
   }
   
   @DELETE
   @Path("/reserves")   
   @Produces(MediaType.APPLICATION_JSON)
   public Response deleteReserve(@QueryParam("idReserve") int idReserve){
	   try{
		   controller.deleteReserve(idReserve);
		   return Response.ok().build();
	   }
	   catch (Exception e) {
		   return Response.serverError().build();
	   }
   }
   
   @GET
   @Path("/stores/{idStore}")   
   @Produces(MediaType.APPLICATION_JSON)
   public Store getStorebyId(@PathParam("idStore") int idStore){
	   Store store = controller.getStorebyId(idStore);
	   if (store == null) {
           throw new WebApplicationException(Response.Status.NOT_FOUND);
       }
	   return store;
   }
   
   @GET
   @Path("/reserves/{idReserve}")   
   @Produces(MediaType.APPLICATION_JSON)
   public Reserve getReservebyId(@PathParam("idReserve") int idReserve){
	   Reserve reserve = controller.getReservebyId(idReserve);
	   if (reserve == null) {
           throw new WebApplicationException(Response.Status.NOT_FOUND);
       }
	   return reserve;
   }
}
