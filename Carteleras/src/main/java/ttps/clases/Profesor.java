package ttps.clases;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@DiscriminatorValue("PR")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Profesor extends Publicador implements java.io.Serializable{
		
	public Profesor(){
		
	}
	public Profesor(long id, String nombre, String apellido, Date fechaNacimiento, long dni, String email, int rol, String usuario, String contraseņa){
		super(id, nombre,apellido,fechaNacimiento,dni,email,rol,usuario,contraseņa);
	}
	public Profesor(String nombre, String apellido, Date fechaNacimiento, long dni, String email, int rol, String usuario, String contraseņa){
		super(nombre,apellido,fechaNacimiento,dni,email,rol,usuario,contraseņa);
	}
}
