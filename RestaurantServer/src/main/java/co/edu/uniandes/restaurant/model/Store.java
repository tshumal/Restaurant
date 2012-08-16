/**
 * 
 */
package co.edu.uniandes.restaurant.model;


/**
 * @author Carlos Andrés
 *
 */
public class Store {
	
	private int id;
	
	private String name;
	
	private String phone;
	
	private String address;
	
	private double latitude;
	
	private double longitude;
	
	private String image;
	
	public Store(){
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("id["+id+"]");
		builder.append("name["+name+"]");
		builder.append("phone["+phone+"]");
		builder.append("address["+address+"]");
		builder.append("latitude["+latitude+"]");
		builder.append("longitude["+longitude+"]");
		builder.append("image["+image+"]");
		return builder.toString();
	}
}
