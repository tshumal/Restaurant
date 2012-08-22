package co.edu.uniandes.restaurant.util;

import java.io.InputStream;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.SessionScoped;
import javax.enterprise.inject.Produces;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import co.edu.uniandes.restaurant.model.Reserve;
import co.edu.uniandes.restaurant.model.Store;

/**
 * @author Carlos Andrés
 *
 */
@SessionScoped
public class DataLoader implements Serializable {
	
	private static final long serialVersionUID = 1533357485935161335L;
	
	private static SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yy");
	
	private List<Store> stores;
	
	private List<Reserve> reserves;
	
	public DataLoader(){
		stores = new ArrayList<Store>();
		reserves = new ArrayList<Reserve>();
		readStores();
		readReserves();
	}
	
	@Produces
	public List<Store> getStores() {
		return stores;
	}
	
	@Produces
	public List<Reserve> getReserves() {
		return reserves;
	}
	
	private void readStores(){
		try {
			InputStream stream = DataLoader.class.getResourceAsStream("RestaurantData.xls");
			Workbook w = Workbook.getWorkbook(stream);
			// Obtiene la primera Hoja del Archivo
			Sheet sheet = w.getSheet("Stores");
			//Procesa los datos de los sucursales
			for (int j = 1; j < sheet.getRows(); j++) {
				Store store = new Store();
				Cell cell = sheet.getCell(0, j);
				if (!cell.getContents().equals("")){
					store.setName(cell.getContents());
					cell = sheet.getCell(1, j);
					store.setPhone(cell.getContents());
					cell = sheet.getCell(2, j);
					store.setAddress(cell.getContents());					
					cell = sheet.getCell(3, j);
					String contSuc = cell.getContents().replace(',', '.');
					store.setLatitude(Double.parseDouble(contSuc));					
					cell = sheet.getCell(4, j);
					String contLong = cell.getContents().replace(',', '.');
					store.setLongitude(Double.parseDouble(contLong));
					cell = sheet.getCell(5, j);
					store.setImage(cell.getContents());
					cell = sheet.getCell(6, j);
					store.setId(Integer.parseInt(cell.getContents()));
					stores.add(store);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}	
	
	private void readReserves(){
		try {
			InputStream stream = DataLoader.class.getResourceAsStream("RestaurantData.xls");
			Workbook w = Workbook.getWorkbook(stream);
			// Obtiene la primera Hoja del Archivo
			Sheet sheet = w.getSheet("Reserves");
			//Procesa los datos de los sucursales
			for (int j = 1; j < sheet.getRows(); j++) {
				Reserve reserve = new Reserve();
				Cell cell = sheet.getCell(0, j);
				if (!cell.getContents().equals("")){
					reserve.setId(Integer.parseInt(cell.getContents()));
					cell = sheet.getCell(1, j);
					reserve.setNumPeople(Integer.parseInt(cell.getContents()));
					cell = sheet.getCell(2, j);
					reserve.setDate(formatter.parse(cell.getContents()));					
					cell = sheet.getCell(3, j);
					int idSucursal = Integer.parseInt(cell.getContents());
					reserve.setStore(findStoreById(idSucursal));			
					reserves.add(reserve);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	private Store findStoreById(final int idSucursal){
		Store sto = null;
		for (Store store : getStores()) {
			if (store.getId() == idSucursal)
				sto = store;
		}
		return sto;
	}
}
