/**
 * 
 */
package co.edu.uniandes.restaurant.controller;

import java.io.Serializable;
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
	
	public void addReserve(Reserve reserve) throws Exception {
		if (reserve != null){
			reserve.setId(1 + (int)(Math.random() * ((1000 - 1) + 1)));
			if (reserve.getStore() != null)
				reserve.setStore(getStorebyId(reserve.getStore().getId()));
			reserves.add(reserve);
		}
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
