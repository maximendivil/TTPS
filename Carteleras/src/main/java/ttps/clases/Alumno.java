package ttps.clases;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@DiscriminatorValue("AL")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Alumno extends Persona implements java.io.Serializable{
	//Variables de instancia
	private String legajo;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="intereses",
		joinColumns=@JoinColumn(name="PERSONA_ID",referencedColumnName="id"),
		inverseJoinColumns=@JoinColumn(name="CARTELERA_ID",referencedColumnName="id")
		)
	private Set<Cartelera> intereses;
	
	//Constructores
	public Alumno(){
		
	}
	
	public Alumno(long id, String nombre, String apellido, Date fechaNacimiento, long dni, String email, int rol, String usuario, String contraseņa, String legajo){
		super(id, nombre, apellido, fechaNacimiento, dni, email, rol, usuario, contraseņa);
		this.legajo = legajo;
		this.intereses = new HashSet<Cartelera>();
	}
	
	public Alumno(String nombre, String apellido, Date fechaNacimiento, long dni, String email, int rol, String usuario, String contraseņa, String legajo){
		super(nombre, apellido, fechaNacimiento, dni, email, rol, usuario, contraseņa);
		this.legajo = legajo;
		this.intereses = new HashSet<Cartelera>();
	}
	
	//Getters y setters
	public String getLegajo() {
		return legajo;
	}

	public void setLegajo(String legajo) {
		this.legajo = legajo;
	}

	public Set<Cartelera> getIntereses() {
		return intereses;
	}

	public void setIntereses(Set<Cartelera> intereses) {
		this.intereses = intereses;
	}
	
	public void agregarInteres(Cartelera c){
		this.intereses.add(c);
		c.getAlumnosInteresados().add(this);
	}
	
	public void quitarInteres(Cartelera c){
		this.intereses.remove(c);
		c.getAlumnosInteresados().remove(this);
	}
}
