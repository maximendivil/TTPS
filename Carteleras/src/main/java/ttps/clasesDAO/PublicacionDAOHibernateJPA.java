package ttps.clasesDAO;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import ttps.clases.Cartelera;
import ttps.clases.Comentario;
import ttps.clases.Publicacion;
import ttps.interfacesDAO.PublicacionDAO;

@Repository
public class PublicacionDAOHibernateJPA extends GenericDAOHibernateJPA<Publicacion> implements PublicacionDAO{
	public PublicacionDAOHibernateJPA(){
		super(Publicacion.class);
	}
	
	@Override
	public Publicacion obtenerPublicacion(long id) {
		Query q = this.getEntityManager().createQuery("Select new Publicacion(p.id, p.titulo, p.descripcion, p.fechaCreacion, p.tieneArchivo, p.multimedia, p.aceptaComentarios, u.usuario, c.id, c.nombre) from Publicacion p JOIN p.creador u JOIN p.cartelera c Where p.borrado=0 and p.id=:id");
		q.setParameter("id", id);
		Publicacion resultado = (Publicacion) q.getSingleResult();
		return resultado;
	}
	
	@Override
	public List<Comentario> obtenerComentarios(long id){
		Query q = this.getEntityManager().createQuery("Select new Comentario(c.id, c.texto, c.fechaCreacion, pe.id, pe.nombre, pe.apellido, pe.usuario) from Publicacion p JOIN p.comentarios c JOIN c.creador pe Where p.borrado=0 and p.id=:id");
		q.setParameter("id", id);
		List<Comentario> resultado = (List<Comentario>) q.getResultList();
		return resultado;
	}
	@Override
	public void remover(long id) {
		Publicacion p = (Publicacion) this.obtener(id);
		p.setBorrado(1);
		this.getEntityManager().merge(p);
	}
	
	@Override
	public List<Publicacion> obtenerTodasLasPublicaciones(){
		Query q = this.getEntityManager().createQuery("Select p.descripcion, p.titulo, c.id, c.nombre from Publicacion p JOIN p.cartelera c Where p.borrado=0");
		List<Publicacion> resultado = (List<Publicacion>) q.getResultList();
		return resultado;
	}
}
