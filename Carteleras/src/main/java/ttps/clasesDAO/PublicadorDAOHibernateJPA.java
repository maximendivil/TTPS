package ttps.clasesDAO;

import java.util.List;
import java.util.Set;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import ttps.clases.Cartelera;
import ttps.clases.Comentario;
import ttps.clases.Publicacion;
import ttps.clases.Publicador;
import ttps.entityManager.EMF;
import ttps.interfacesDAO.PublicadorDAO;

@Repository
public class PublicadorDAOHibernateJPA extends GenericDAOHibernateJPA<Publicador> implements PublicadorDAO {
	
	public PublicadorDAOHibernateJPA() {
		super(Publicador.class);
	}
	
	@Override
	public List<Publicacion> obtenerPublicaciones(long id) {
		Query q = EMF.getEMF().createEntityManager().createQuery("SELECT c FROM Publicador p JOIN p.cartelerasHabilitadas c WHERE p.id=:id");
		q.setParameter("id", id);
		List<Publicacion> resultado = (List<Publicacion>) q.getResultList();
		return resultado;
	}

	@Override
	public List<Cartelera> obtenerCartelerasHabilitadas(long id) {
		Query q = this.getEntityManager().createQuery("select c.id from Publicador p JOIN p.cartelerasHabilitadas c Where p.id = :id");
		q.setParameter("id", id);
		List<Cartelera> resultado = (List<Cartelera>) q.getResultList();
		return resultado;
	}
	
	@Override
	public List<Publicador> obtenerPublicadoresHabilitados(long idCartelera) {
		Query q = this.getEntityManager().createQuery("Select new Publicador(p.id, p.nombre, p.apellido, p.fechaNacimiento, p.dni, p.email, p.rol, p.usuario, p.password) from Publicador p JOIN p.cartelerasHabilitadas c Where p.borrado=0 and c.id=:id");
		q.setParameter("id", idCartelera);
		List<Publicador> resultado = (List<Publicador>) q.getResultList();
		return resultado;
	}
	
	@Override
	public List<Publicador> obtenerPublicadoresSinPermiso(Cartelera cartelera) {
		Query q = this.getEntityManager().createQuery("Select new Publicador(p.id, p.nombre, p.apellido, p.fechaNacimiento, p.dni, p.email, p.rol, p.usuario, p.password) from Publicador p Where p.borrado=0 and p.rol != 1 and p.id not in (SELECT p.id FROM Publicador p JOIN p.cartelerasHabilitadas c WHERE c.id = :id)");
		q.setParameter("id", cartelera.getId());
		//q.setParameter("cartelera", cartelera);
		List<Publicador> resultado = (List<Publicador>) q.getResultList();
		return resultado;
	}
}
