package ttps.clases;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Publicacion implements java.io.Serializable{
	@Id @GeneratedValue
	private long id;
	private int borrado;
	private int tieneArchivo;
	private String titulo;
	private String descripcion;
	private String multimedia;
	private Date fechaCreacion;
	@OneToMany(fetch = FetchType.EAGER, mappedBy="publicacion",cascade={CascadeType.REMOVE})
	private Set<Comentario> comentarios;
	@ManyToOne(optional=false)
	@JoinColumn(name="CARTELERA_ID")
	private Cartelera cartelera;
	@ManyToOne(optional=false)
	@JoinColumn(name="PERSONA_ID")
	private Publicador creador;
	//1 -> Acepta 0 -> No
	private int aceptaComentarios;
	
	public Publicacion(){
		
	}
	
	public Publicacion(long id){
		this.id = id;
		this.comentarios = null;
	}
	
	public Publicacion(String titulo, String descripcion, String multimedia, Date fechaCreacion, Publicador creador){
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.multimedia = multimedia;
		this.fechaCreacion = fechaCreacion;
		this.creador = creador;
		this.borrado = 0;
		this.comentarios = new HashSet<Comentario>();
	}
	
	public Publicacion(long id, String titulo, String descripcion, Date fechaCreacion, Publicador creador, int tieneArchivo, String multimedia){
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.fechaCreacion = fechaCreacion;
		this.multimedia = multimedia;
		this.tieneArchivo = tieneArchivo;
		this.creador = new Publicador(creador.getId(), creador.getNombre(), creador.getApellido(), creador.getFechaNacimiento(), creador.getDni(), creador.getEmail(), creador.getRol(), creador.getUsuario(), creador.getPassword());
	}
	
	public Publicacion(long id, String titulo, String descripcion, Date fechaCreacion, Publicador creador, int tieneArchivo, String multimedia, int aceptaComentarios){
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.fechaCreacion = fechaCreacion;
		this.multimedia = multimedia;
		this.aceptaComentarios = aceptaComentarios;
		this.tieneArchivo = tieneArchivo;
		this.creador = new Publicador(creador.getId(), creador.getNombre(), creador.getApellido(), creador.getFechaNacimiento(), creador.getDni(), creador.getEmail(), creador.getRol(), creador.getUsuario(), creador.getPassword());
	}
	
	public Publicacion(long id, String titulo, String descripcion, Date fechaCreacion){
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.fechaCreacion = fechaCreacion;
	}
	
	public Publicacion(long id, String titulo, String descripcion, Date fechaCreacion, Publicador creador){
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.fechaCreacion = fechaCreacion;
		this.creador = new Publicador(creador.getId(), creador.getNombre(), creador.getApellido(), creador.getFechaNacimiento(), creador.getDni(), creador.getEmail(), creador.getRol(), creador.getUsuario(), creador.getPassword());
	}
	
	public Publicacion(long id, String titulo, String descripcion, Date fechaCreacion, int tieneArchivo, String multimedia, String usuario, long idCartelera, String cartelera){
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.fechaCreacion = fechaCreacion;
		this.tieneArchivo = tieneArchivo;
		this.multimedia = multimedia;
		this.creador = new Publicador(usuario);
		this.cartelera = new Cartelera(idCartelera, cartelera);
		this.comentarios = null;
	}
	
	public Publicacion(long id, String titulo, String descripcion, Date fechaCreacion, int tieneArchivo, String multimedia, Publicador creador, long idCartelera, String cartelera){
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.fechaCreacion = fechaCreacion;
		this.tieneArchivo = tieneArchivo;
		this.multimedia = multimedia;
		this.creador = new Publicador(creador.getId(), creador.getNombre(), creador.getApellido(), creador.getFechaNacimiento(), creador.getDni(), creador.getEmail(), creador.getRol(), creador.getUsuario(), creador.getPassword());
		this.cartelera = new Cartelera(idCartelera, cartelera);
		this.comentarios = null;
	}
	
	public Publicacion(long id, String titulo, String descripcion, Date fechaCreacion, int tieneArchivo, String multimedia, int aceptaComentarios, Publicador creador, long idCartelera, String cartelera){
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.fechaCreacion = fechaCreacion;
		this.tieneArchivo = tieneArchivo;
		this.multimedia = multimedia;
		this.aceptaComentarios = aceptaComentarios;
		this.creador = new Publicador(creador.getId(), creador.getNombre(), creador.getApellido(), creador.getFechaNacimiento(), creador.getDni(), creador.getEmail(), creador.getRol(), creador.getUsuario(), creador.getPassword());
		this.cartelera = new Cartelera(idCartelera, cartelera);
		this.comentarios = null;
	}
	
	public Publicacion(long id, String titulo, String descripcion, Date fechaCreacion, String usuario, long idCartelera, String cartelera){
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.fechaCreacion = fechaCreacion;
		this.creador = new Publicador(usuario);
		this.cartelera = new Cartelera(idCartelera, cartelera);
		this.comentarios = null;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getMultimedia() {
		return multimedia;
	}

	public void setMultimedia(String multimedia) {
		this.multimedia = multimedia;
	}

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Set<Comentario> getComentarios() {
		return comentarios;
	}

	public void setComentarios(Set<Comentario> comentarios) {
		this.comentarios = comentarios;
	}

	public Publicador getCreador() {
		return creador;
	}

	public void setCreador(Publicador creador) {
		this.creador = creador;
	}

	public Cartelera getCartelera() {
		return cartelera;
	}

	public void setCartelera(Cartelera cartelera) {
		this.cartelera = cartelera;
	}
	
	public int getBorrado() {
		return borrado;
	}

	public void setBorrado(int borrado) {
		this.borrado = borrado;
	}

	public int getAceptaComentarios() {
		return aceptaComentarios;
	}

	public void setAceptaComentarios(int aceptaComentarios) {
		this.aceptaComentarios = aceptaComentarios;
	}

	public int getTieneArchivo() {
		return tieneArchivo;
	}

	public void setTieneArchivo(int tieneArchivo) {
		this.tieneArchivo = tieneArchivo;
	}
} 
