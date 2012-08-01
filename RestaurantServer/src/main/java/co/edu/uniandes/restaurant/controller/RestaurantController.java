/**
 * 
 */
package co.edu.uniandes.restaurant.controller;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;

import co.edu.uniandes.restaurant.model.Reserve;
import co.edu.uniandes.restaurant.model.Store;

import com.javadocmd.simplelatlng.LatLng;
import com.javadocmd.simplelatlng.LatLngTool;
import com.javadocmd.simplelatlng.util.LengthUnit;

/**
 * @author Carlos Andrés
 *
 */
@Singleton
public class RestaurantController implements Serializable {

	private static final long serialVersionUID = -2656813892095831271L;

	private static SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yy");
	
	@Inject
	private List<Store> stores;
	
	@Inject
	private List<Reserve> reserves;
	
	public RestaurantController(){
		
	}
	
	public List<Reserve> listReserves() {
		return reserves;
	}
	
	public List<Store> listStores() {
		return stores;
	}
	
	public List<Store> listNearStores(double latitude, double longitude) {
		LatLng person = new LatLng(latitude, longitude);
		LatLng sucursalPoint = null;
		double distanceInKM = -1;
		List<Store> nears = new ArrayList<Store>();
		for (Store store : stores) {
			sucursalPoint = new LatLng(store.getLatitude(), store.getLongitude());
			distanceInKM = LatLngTool.distance(person, sucursalPoint, LengthUnit.KILOMETER);			
			if (distanceInKM < 1.5){
				nears.add(store);
			}
		}
		return nears;
	}
	
	public void addReserve(int numPeople, int idStore, String date) throws Exception {
		Reserve reserve = new Reserve();
		reserve.setId(1 + (int)(Math.random() * ((1000 - 1) + 1)));
		reserve.setNumPeople(numPeople);			
		reserve.setDate(formatter.parse(date));
		reserve.setSucursal(getStorebyId(idStore));
		reserves.add(reserve);	
	}
	
	public void deleteReserve(int idReserve) throws Exception{
		List<Reserve> reservs = new ArrayList<Reserve>();
		reservs.addAll(reserves);
		for (Reserve reserve : reservs) {
			if (reserve.getId() == idReserve)
				reserves.remove(reserve);
		}	
	}
	
	public Store getStorebyId(int idStore){
		Store sto = null;
		for (Store store : stores) {
			if (store.getId() == idStore)
				sto = store;
		}
		return sto;
	}
	
	public Reserve getReservebyId(int idReserve){
		Reserve res = null;
		for (Reserve reserve : reserves) {
			if (reserve.getId() == idReserve)
				res = reserve;
		}
		return res;
	}
}
