package ttps.clasesDAO;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import ttps.clases.Administrador;
import ttps.clases.Cartelera;
import ttps.clases.Comentario;
import ttps.clases.Persona;
import ttps.clases.Publicacion;
import ttps.entityManager.EMF;
import ttps.interfacesDAO.AdministradorDAO;
import ttps.interfacesDAO.PersonaDAO;

@Repository
public class PersonaDAOHibernateJPA extends GenericDAOHibernateJPA<Persona> implements PersonaDAO{
	public PersonaDAOHibernateJPA(){
		super(Persona.class);
	}
	
	@Override
	public List<Persona> obtenerTodosLosUsuarios() {
		Query q = this.getEntityManager().createQuery("Select new Persona(p.id, p.nombre, p.apellido, p.fechaNacimiento, p.dni, p.email, p.rol, p.usuario, p.password) from Persona p Where p.borrado=0");
		List<Persona> resultado = (List<Persona>) q.getResultList();
		return resultado;
	}
	
	@Override
	public Persona login(String userLogin, String password){
		Persona u = this.obtenerPorUsuario(userLogin);
		System.out.println(u.getUsuario());
		if(u != null){
			if(u.getPassword().equals(password)){
				return u;
			}
		}
		
		throw new IllegalArgumentException("Usuario o password invalido");
	}
	
	@Override
	public Persona obtenerPorUsuario(String usuario){
		Query q = this.getEntityManager().createQuery("select new Persona(p.id,p.nombre,p.apellido,p.fechaNacimiento,p.dni,p.email,p.rol,p.usuario,p.password) from Persona p Where usuario = :usuario");
		q.setParameter("usuario", usuario);
		Persona resultado = (Persona) q.getSingleResult();
		return resultado;
	}
	
	@Override
	public Persona obtenerPorId(long id){
		Query q = this.getEntityManager().createQuery("select new Persona(p.id,p.nombre,p.apellido,p.fechaNacimiento,p.dni,p.email,p.rol,p.usuario,p.password) from Persona p Where id = :id");
		q.setParameter("id", id);
		Persona resultado = (Persona) q.getSingleResult();
		return resultado;
	}
	
	@Override
	public List<Persona> obtenerPorRol(int rol){
		Query q = this.getEntityManager().createQuery("select new Persona(p.id,p.nombre,p.apellido,p.fechaNacimiento,p.dni,p.email,p.rol,p.usuario,p.password) from Persona p Where rol = :rol and borrado=0");
		q.setParameter("rol", rol);
		List<Persona> resultado = (List<Persona>) q.getResultList();
		return resultado;
	}
	
	@Override
	public List<Cartelera> obtenerIntereses(long id){
		Query q = this.getEntityManager().createQuery("select i.id from Alumno a JOIN a.intereses i Where a.id = :id");
		q.setParameter("id", id);
		List<Cartelera> resultado = (List<Cartelera>) q.getResultList();
		return resultado;
	}
	
	@Override
	public void logout(Persona user) {
		
	}
	
	@Override
	public Persona modificar(Persona entity){
		this.getEntityManager().merge(entity);
		return entity;
	}
	
	@Override
	public int buscarRol(String usuario){
		Query q = this.getEntityManager().createQuery("select rol from " + getPersistentClass().getSimpleName() + " Where usuario = :usuario");
		q.setParameter("usuario", usuario);
		int resultado = (int) q.getSingleResult();
		return resultado;
	}
	
	@Override
	public List<Comentario> obtenerComentarios(long id){
		Query q = this.getEntityManager().createQuery("Select new Comentario(c.id, c.texto, c.fechaCreacion, pe.id, pe.nombre, pe.apellido, pe.usuario) from Persona pe JOIN pe.comentarios c JOIN c.publicacion p Where pe.borrado=0 and pe.id=:id");
		q.setParameter("id", id);
		List<Comentario> resultado = (List<Comentario>) q.getResultList();
		return resultado;
	}
}
