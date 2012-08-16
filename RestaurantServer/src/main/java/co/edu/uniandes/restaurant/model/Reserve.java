/**
 * 
 */
package co.edu.uniandes.restaurant.model;

import java.util.Date;

/**
 * @author Carlos Andrés
 *
 */
public class Reserve {
	
	private int id;
	
	private Store store;
	
	private int numPeople;
	
	private Date date;
	
	public Reserve(){
		
	}	

	public Reserve(int id, Store sucursal, int numPersonas, Date fecha) {
		super();
		this.id = id;
		this.store = sucursal;
		this.numPeople = numPersonas;
		this.date = fecha;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Store getStore() {
		return store;
	}

	public void setSucursal(Store sucursal) {
		this.store = sucursal;
	}

	public int getNumPeople() {
		return numPeople;
	}

	public void setNumPeople(int numPeople) {
		this.numPeople = numPeople;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("id["+id+"]");
		builder.append("store["+store+"]");
		builder.append("numPeople["+numPeople+"]");
		builder.append("date["+date+"]");
		return builder.toString();
	}
}
