package ttps.clasesDAO;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import ttps.clases.Alumno;
import ttps.clases.Cartelera;
import ttps.clases.Publicacion;
import ttps.entityManager.EMF;
import ttps.interfacesDAO.CarteleraDAO;

@Repository
public class CarteleraDAOHibernateJPA extends GenericDAOHibernateJPA<Cartelera> implements CarteleraDAO {
	public CarteleraDAOHibernateJPA(){
		super(Cartelera.class);
	}
	
	@Override
	public List<Cartelera> obtenerCarteleras() {
		Query q = this.getEntityManager().createQuery("Select new Cartelera(c.id,c.nombre,c.fechaCreacion,c.publica) from Cartelera c Where c.borrado=0");
		List<Cartelera> resultado = (List<Cartelera>) q.getResultList();
		return resultado;
	}
	
	@Override
	public List<Cartelera> obtenerCartelerasHabilitadas(long idPublicador) {
		Query q = this.getEntityManager().createQuery("Select new Cartelera(c.id,c.nombre,c.fechaCreacion,c.publica) from Cartelera c JOIN c.personasHabilitadas p Where c.borrado=0 and p.id=:id");
		q.setParameter("id", idPublicador);
		List<Cartelera> resultado = (List<Cartelera>) q.getResultList();
		return resultado;
	}
	
	@Override
	public Cartelera obtenerPorId(long id) {
		Query q = this.getEntityManager().createQuery("Select new Cartelera(c.id,c.nombre,c.fechaCreacion,c.publica) from Cartelera c Where c.borrado=0 and c.id=:id");
		q.setParameter("id", id);
		Cartelera resultado = (Cartelera) q.getSingleResult();
		return resultado;
	}
	
	@Override
	public List<Publicacion> obtenerPublicaciones(long id) {
		Query q = this.getEntityManager().createQuery("Select new Publicacion(p.id, p.titulo, p.descripcion, p.fechaCreacion, p.creador, p.tieneArchivo, p.multimedia, p.aceptaComentarios) from Cartelera c JOIN c.publicaciones p Where p.borrado=0 and c.id=:id");		
		q.setParameter("id", id);
		List<Publicacion> resultado = (List<Publicacion>) q.getResultList();
		return resultado;
	}
	
	@Override
	public List<Publicacion> obtenerPublicacionesDeUnPublicador(long id, long idPublicador) {
		Query q = this.getEntityManager().createQuery("Select new Publicacion(p.id, p.titulo, p.descripcion, p.fechaCreacion, p.creador, p.tieneArchivo, p.multimedia, p.aceptaComentarios) from Cartelera c JOIN c.publicaciones p Where p.borrado=0 and c.id=:id and p.creador.id=:idPublicador");		
		q.setParameter("id", id);
		q.setParameter("idPublicador", idPublicador);
		List<Publicacion> resultado = (List<Publicacion>) q.getResultList();
		return resultado;
	}

	@Override
	public List<Alumno> obtenerAlumnosInteresados(long id) {
		Query q = getEntityManager().createQuery("select new Alumno(a.id, a.nombre, a.apellido, a.fechaNacimiento, a.dni, a.email, a.rol, a.usuario, a.password, a.legajo) from Cartelera c JOIN c.alumnosInteresados a Where c.id=:id");
		q.setParameter("id", id);
		List<Alumno> resultado = (List<Alumno>) q.getResultList();
		return resultado;
	}
	
	@Override
	public void eliminarCartelerasDeIntereses(long id) {
		Query q = EMF.getEMF().createEntityManager().createNativeQuery("DELETE FROM intereses WHERE c.id=:id");
		q.setParameter("id", id);
	}	
	
	@Override
	public void remover(long id){
		Cartelera actual = this.obtener(id);
		actual.setBorrado(1);
		this.getEntityManager().merge(actual);
	}
	
	@Override
	public void eliminar(Cartelera entity) {
		EntityManager em = EMF.getEMF().createEntityManager();
		EntityTransaction tx = null;
		tx = em.getTransaction();
		tx.begin();
		/*Cartelera entity = em.find(this.getPersistentClass(), c.getId());
		if (entity != null) {*/
			try {
//				entity.getAlumnosInteresados().clear();
				em.remove(em.merge(entity));
				for (Alumno a : entity.getAlumnosInteresados()) {
					a.getIntereses().remove(entity);
					//entity.getAlumnosInteresados().remove(a);
					//em.merge(a);
				}
				
				/*Iterator<Alumno> iterator = entity.getAlumnosInteresados().iterator();
				while (iterator.hasNext()) {
					iterator.next();
					iterator.remove();
				}*/
				
				//em.merge(entity);
				//em.flush();
				
				//Cartelera entitya = em.find(this.getPersistentClass(), entity.getId());
				
				tx.commit();
			} 
			catch (RuntimeException e) { 
				if ( tx != null && tx.isActive() ) { 
					tx.rollback();
					System.out.println(e.getMessage());
					throw e;
					// escribir en un log o mostrar un mensaje } }
				}
			}
		/*}*/
		em.close();
	}

}
